package leak

import (
	"context"
	"time"
)

// StartLeaky starts N goroutines that try to send ticks into an unbuffered channel.
// When ctx is canceled, the receiver may stop reading, but senders can remain blocked forever.
func StartLeaky(ctx context.Context, n int) <-chan int {
	out := make(chan int) // unbuffered (the pitfall)

	for i := 0; i < n; i++ {
		go func(id int) {
			t := time.NewTicker(10 * time.Millisecond)
			defer t.Stop()

			for {
				select {
				case <-t.C:
					// PITFALL: if nobody is receiving, this blocks forever.
					out <- id
				case <-ctx.Done():
					// Looks correct, but the goroutine can be stuck on out <- id
					// and never reach this select again.
					return
				}
			}
		}(i)
	}

	return out
}

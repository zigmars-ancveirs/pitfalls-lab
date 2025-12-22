package fix

import (
	"context"
	"sync"
	"time"
)

// StartFixed starts N producers that can always exit on ctx cancel.
// - Sends are guarded by select on ctx.Done()
// - Channel is closed after all producers exit
func StartFixed(ctx context.Context, n int) <-chan int {
	out := make(chan int, n) // small buffer helps, but shutdown path is the real fix

	var wg sync.WaitGroup
	wg.Add(n)

	for i := 0; i < n; i++ {
		go func(id int) {
			defer wg.Done()

			t := time.NewTicker(10 * time.Millisecond)
			defer t.Stop()

			for {
				select {
				case <-t.C:
					select {
					case out <- id:
					case <-ctx.Done():
						return
					}
				case <-ctx.Done():
					return
				}
			}
		}(i)
	}

	go func() {
		wg.Wait()
		close(out)
	}()

	return out
}

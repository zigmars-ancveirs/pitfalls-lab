package leak

import (
	"context"
	"runtime"
	"testing"
	"time"
)

// This test demonstrates the pitfall by asserting that goroutine count grows
// after cancel + receiver stops reading.
func TestGoroutineLeakDemonstration(t *testing.T) {
	before := runtime.NumGoroutine()

	ctx, cancel := context.WithCancel(context.Background())
	ch := StartLeaky(ctx, 50)

	// Read a tiny bit, then stop reading and cancel.
	for i := 0; i < 5; i++ {
		<-ch
	}
	cancel()

	// Give time for leaks to manifest (blocked senders).
	time.Sleep(100 * time.Millisecond)

	after := runtime.NumGoroutine()
	if after <= before+5 {
		t.Fatalf("expected goroutine leak; before=%d after=%d", before, after)
	}
}

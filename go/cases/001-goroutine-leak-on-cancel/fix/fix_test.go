package fix

import (
	"context"
	"runtime"
	"testing"
	"time"
)

func TestNoGoroutineLeakAfterCancel(t *testing.T) {
	before := runtime.NumGoroutine()

	ctx, cancel := context.WithCancel(context.Background())
	ch := StartFixed(ctx, 50)

	// Consume a bit.
	for i := 0; i < 5; i++ {
		<-ch
	}

	cancel()
	time.Sleep(150 * time.Millisecond)

	after := runtime.NumGoroutine()

	// Allow a small slack for unrelated goroutines in the runtime/test harness.
	if after > before+5 {
		t.Fatalf("goroutine count drifted; before=%d after=%d", before, after)
	}
}

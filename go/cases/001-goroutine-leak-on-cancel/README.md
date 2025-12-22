# 001 — Goroutine leak on cancel (blocked send)

## Pitfall
Spawning goroutines that send to an unbuffered channel while the receiver can return early (e.g., due to context cancel).
When the receiver stops reading, senders block forever → goroutine leak.

## Symptoms
- Memory / goroutine count slowly increases under load
- “Stuck” goroutines in stack traces, often blocked on `chan send`
- Tests become flaky or CI slows down

## Root cause
Unbuffered (or under-buffered) channels + no `select` on `ctx.Done()` around sends.
If the consumer exits, producers are left blocked.

## Fix (pattern)
- Always allow producers to stop: `select { case ch <- v: case <-ctx.Done(): return }`
- Close the channel when all producers finish (`WaitGroup` + closer goroutine)
- Prefer structured concurrency (`errgroup.WithContext`) for real systems

## Prevention
- Add a unit test that checks goroutine count doesn’t drift after cancel
- Code review checklist: “Any goroutine has a shutdown path?”
- Use `go test -race` and consider `pprof` in load tests

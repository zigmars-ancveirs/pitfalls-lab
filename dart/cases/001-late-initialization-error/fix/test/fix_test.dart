import 'package:test/test.dart';
import 'package:late_init_fix/good.dart';

void main() {
  test("Fix A: constructor invariant is safe", () {
    final s = SessionRequired(token: "t1");
    expect(s.authHeader(), "Bearer t1");
  });

  test("Fix B: lazy init runs once and is safe", () {
    var calls = 0;
    final s = SessionLazy(() {
      calls++;
      return "t2";
    });

    expect(s.authHeader(), "Bearer t2");
    expect(s.authHeader(), "Bearer t2");
    expect(calls, 1);
  });

  test("Fix B: lazy init enforces invariant", () {
    final s = SessionLazy(() => "");
    expect(() => s.authHeader(), throwsA(isA<StateError>()));
  });
}

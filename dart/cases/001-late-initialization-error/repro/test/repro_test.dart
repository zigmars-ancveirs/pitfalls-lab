import 'package:test/test.dart';
import 'package:late_init_repro/bad.dart';

void main() {
  test("repro: late access throws LateInitializationError", () {
    final s = Session();
    expect(() => s.authHeader(), throwsA(isA<LateInitializationError>()));
  });
}

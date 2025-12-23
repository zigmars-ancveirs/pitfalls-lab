import 'package:test/test.dart';
import 'package:dynamic_json_repro/bad.dart';

void main() {
  test("repro: invalid types crash at runtime", () {
    final bad = '{"email": 123, "isAdmin": "yes"}';
    expect(() => parseUserUnsafe(bad), throwsA(isA<TypeError>()));
  });
}

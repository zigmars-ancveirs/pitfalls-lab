import 'package:test/test.dart';
import 'package:dynamic_json_fix/good.dart';

void main() {
  test("fix: invalid payload is rejected with clear error", () {
    final bad = '{"email": 123, "isAdmin": "yes"}';
    expect(() => parseUserSafe(bad), throwsA(isA<FormatException>()));
  });

  test("fix: valid payload parses", () {
    final ok = '{"email":"a@b.com","isAdmin":false}';
    final u = parseUserSafe(ok);
    expect(u.email, "a@b.com");
    expect(u.isAdmin, false);
  });
}

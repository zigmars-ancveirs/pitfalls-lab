import 'dart:convert';

class User {
  final String email;
  final bool isAdmin;
  User(this.email, this.isAdmin);
}

User parseUserSafe(String json) {
  final obj = jsonDecode(json);

  if (obj is! Map) {
    throw FormatException("Expected object");
  }

  final email = obj["email"];
  final isAdmin = obj["isAdmin"];

  if (email is! String) throw FormatException("email must be a string");
  if (isAdmin is! bool) throw FormatException("isAdmin must be a bool");

  return User(email, isAdmin);
}

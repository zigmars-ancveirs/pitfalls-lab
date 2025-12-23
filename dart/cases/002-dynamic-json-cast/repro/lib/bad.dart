import 'dart:convert';

class User {
  final String email;
  final bool isAdmin;
  User(this.email, this.isAdmin);
}

User parseUserUnsafe(String json) {
  final m = jsonDecode(json) as Map<String, dynamic>; // PITFALL: dynamic map
  return User(m["email"] as String, m["isAdmin"] as bool);
}

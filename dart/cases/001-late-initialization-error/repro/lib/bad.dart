class Session {
  late String token; // PITFALL: might never be set

  String authHeader() {
    return "Bearer $token"; // throws if token not set
  }
}

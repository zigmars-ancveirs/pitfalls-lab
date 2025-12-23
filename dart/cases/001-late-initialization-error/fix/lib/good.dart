/// Fix A: explicit invariant - required at construction
class SessionRequired {
  final String token;
  SessionRequired({required this.token});

  String authHeader() => "Bearer $token";
}

/// Fix B: safe lazy init (encapsulated)
class SessionLazy {
  SessionLazy(this._loadToken);

  final String Function() _loadToken;

  late final String _token = _init();

  String _init() {
    final t = _loadToken();
    if (t.isEmpty) {
      throw StateError("token must not be empty");
    }
    return t;
  }

  String authHeader() => "Bearer $_token";
}

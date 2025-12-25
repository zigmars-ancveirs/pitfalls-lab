<?php
declare(strict_types=1);

final class Db {
    public PDO $pdo;
    public int $queries = 0;

    public function __construct() {
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function exec(string $sql): void {
        $this->queries++;
        $this->pdo->exec($sql);
    }

    public function query(string $sql, array $params = []): array {
        $this->queries++;
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

$db = new Db();

$db->exec("CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT NOT NULL)");
$db->exec("CREATE TABLE posts (id INTEGER PRIMARY KEY, author_id INTEGER NOT NULL, title TEXT NOT NULL)");
$db->exec("CREATE INDEX posts_author_id_idx ON posts(author_id)");

for ($i = 1; $i <= 100; $i++) {
    $db->exec("INSERT INTO authors (id, name) VALUES ($i, 'author_$i')");
}
for ($a = 1; $a <= 100; $a++) {
    for ($p = 1; $p <= 10; $p++) {
        $title = "post_{$a}_{$p}";
        $db->exec("INSERT INTO posts (author_id, title) VALUES ($a, '$title')");
    }
}

$db->queries = 0;

// FIX: one query with JOIN
$rows = $db->query("
  SELECT a.id AS author_id, a.name AS author_name, p.title AS post_title
  FROM authors a
  LEFT JOIN posts p ON p.author_id = a.id
  ORDER BY a.id
");

$grouped = [];
foreach ($rows as $r) {
    $id = (int)$r['author_id'];
    if (!isset($grouped[$id])) {
        $grouped[$id] = ['author' => $r['author_name'], 'posts' => []];
    }
    if ($r['post_title'] !== null) {
        $grouped[$id]['posts'][] = $r['post_title'];
    }
}

echo "Authors: " . count($grouped) . PHP_EOL;
echo "Total queries executed (fixed): {$db->queries}" . PHP_EOL;

assert($db->queries <= 2);
echo "Fix OK (bulk fetch, no N+1)." . PHP_EOL;

<?php
// Configuração do banco de dados MySQL com PDO
class Database {
    private static $host = 'localhost';
    private static $dbName = 'realimenta';
    private static $user = 'root';
    private static $password = 'root';
    private static $conn = null;

    public static function getConnection() {
        if (self::$conn === null) {
            try {
                self::$conn = new PDO(
                    "mysql:host=" . self::$host . ";dbname=" . self::$dbName,
                    self::$user,
                    self::$password
                );
                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die("Erro de conexão: " . $e->getMessage());
            }
        }
        return self::$conn;
    }
}

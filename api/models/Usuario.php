<?php
class Usuario {
    private $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public static function authenticate($emailLogin, $senhaLogin) {
        $db = Database::getConnection();

        $query = "SELECT * FROM entidades WHERE emailLogin = :emailLogin";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':emailLogin', $emailLogin);
        $stmt->execute();

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($usuario && password_verify($senhaLogin, $usuario['senhaLogin'])) {
            // Geração do token JWT (se necessário)
            return ['token' => JWTUtils::generateToken($usuario)];
        }

        return null;
    }
}

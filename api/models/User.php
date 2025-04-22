<?php
class User {
    public static function create($data) {
        $conn = Database::getConnection();
        $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (:email, :password)");
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':password', password_hash($data['password'], PASSWORD_DEFAULT));
        $stmt->execute();
        return ['id' => $conn->lastInsertId(), 'email' => $data['email']];
    }

    public static function authenticate($email, $senha) {
        $conn = Database::getConnection();
        $stmt = $conn->prepare("SELECT * FROM entidades WHERE emailLogin = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
		
		var_dump($user);
		exit();

        if ($user && password_verify($senha, $user['senhaLogin'])) {
            return $user;
        }
        return null;
    }
}

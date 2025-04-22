<?php
class UserController {
    public static function register($data) {
        return User::create($data);
    }

    public static function login($data) {
        // Captura o email e senha do array de dados
	
        $email = $data['email'] ?? '';
        $senha = $data['senha'] ?? '';
		
		var_dump($data);
		exit();

        if (empty($email) || empty($senha)) {
            return json_encode(['error' => 'Email e senha são obrigatórios']);
        }

        // Autentica o usuário com as credenciais
        $user = User::authenticate($email, $senha);

        if ($user) {
            // Gerar o token JWT
            $token = JWTUtils::generateToken($user);            
            return json_encode(['message' => 'Login bem-sucedido', 'token' => $token]);
        }

        return json_encode(['error' => 'Credenciais inválidas']);
    }
}

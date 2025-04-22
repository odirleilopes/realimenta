<?php
class AuthMiddleware {
    public static function authenticate() {
        $headers = apache_request_headers();
		//$headers = getallheaders();				
        if (isset($headers['Authorization'])) {
            $token = str_replace('Bearer ', '', $headers['Authorization']);
            $decoded = JWTUtils::validateToken($token);
            if ($decoded === null) {
                http_response_code(401);
                echo json_encode(['error' => 'Token inválido ou expirado']);
                exit;
            }
            // Caso o token seja válido, adicione os dados do usuário ao ambiente global
            $_SESSION['user'] = $decoded;
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Token não fornecido']);
            exit;
        }
    }
}

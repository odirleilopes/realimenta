<?php
class JWTUtils {
    private static $key = '2c8e97d5ae9e5daf18f572bfb7dadddf';	

    public static function generateToken($user) {
        $header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
        $payload = json_encode([
            //para segurança habilitar e colocar a url correta
			//'iss' => 'http://apirealimenta.localhost',				
            'sub' => $user['id'],
            'email' => $user['email'],
            'iat' => time(),
            'exp' => time() + 3600 //Expira em 1 Hora
        ]);
        
        $base64Header = self::base64UrlEncode($header);
        $base64Payload = self::base64UrlEncode($payload);
        $signature = self::base64UrlEncode(hash_hmac('sha256', $base64Header . '.' . $base64Payload, self::$key, true));

        return $base64Header . '.' . $base64Payload . '.' . $signature;
    }

    public static function validateToken($token) {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        list($base64Header, $base64Payload, $signature) = $parts;

        $validSignature = self::base64UrlEncode(hash_hmac('sha256', $base64Header . '.' . $base64Payload, self::$key, true));

        if ($signature !== $validSignature) {
            return null;
        }

        $payload = json_decode(self::base64UrlDecode($base64Payload), true);

        // Verifica se o token expirou
        if ($payload['exp'] < time()) {
            return null;
        }

        return $payload;
    }

    private static function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64UrlDecode($data) {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}



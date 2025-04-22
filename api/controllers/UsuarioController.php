<?php
require_once '../models/Usuario.php';

class UsuarioController {

    // Fazer login entidade
    public static function login($dados) {
        if (!isset($dados['email'], $dados['senha'],$dados['tipo'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Campos obrigatórios faltando']);
            exit;
        }

        $usuario = Usuario::authenticate($dados['email'], $dados['senha']);
        
        if ($usuario) {
            echo json_encode($usuario);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Email ou senha inválidos']);
        }
    }
}

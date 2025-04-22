<?php
header('Content-Type: application/json');

require __DIR__ . '/../controllers/UserController.php';
require __DIR__ . '/../controllers/EntidadeController.php';
require __DIR__ . '/../middlewares/AuthMiddleware.php';

$rotas = [
    'cadastro'      => ['POST', 'UserController::register'],
    'login'         => ['POST', 'UserController::login'],
    'entidade'      => ['GET', 'EntidadeController::listAll', true],
    'entidade/criar' => ['POST', 'EntidadeController::create', true],
    'entidade/{id}'  => ['GET', 'EntidadeController::getById', true],
    'entidade/editar/{id}' => ['PUT', 'EntidadeController::update', true],
    'entidade/deletar/{id}' => ['DELETE', 'EntidadeController::delete', true],
];

// Pega a URL solicitada
$uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$metodo = $_SERVER['REQUEST_METHOD'];

foreach ($rotas as $rota => $metodoConfig) {
    $rotaPattern = preg_replace('/{[^}]+}/', '([^/]+)', $rota);
    if (preg_match('#^' . $rotaPattern . '$#', $uri, $matches)) {
        array_shift($matches);

        if ($metodo === $metodoConfig[0]) {
            // Verifica se a rota exige autenticação
            if (isset($metodoConfig[2]) && $metodoConfig[2] === true) {
                AuthMiddleware::authenticate();
            }

            // Chama o método correto no controlador
            list($controller, $action) = explode('::', $metodoConfig[1]);

            // Captura os dados enviados pela requisição (se houver)
            $dados = json_decode(file_get_contents("php://input"), true);
			var_dump($dados); 
			exit();
            // Se houver parâmetros na URL, adicione-os ao array de dados
            $params = array_merge($matches, $dados ?? []);
			
            // Chama a ação do controlador
            echo call_user_func_array([new $controller(), $action], $params);
            exit;
        } else {
            http_response_code(405);
            echo json_encode(['error' => "Método $metodo não permitido para esta rota"]);
            exit;
        }
    }
}

http_response_code(404);
echo json_encode(['error' => 'Rota não encontrada']);
exit;

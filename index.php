<?php
// Obtém a página da URL
$pagina = isset($_GET['pagina']) ? $_GET['pagina'] : 'home';

// Lista de páginas permitidas
$paginasPermitidas = ['home', 'sobre', 'entidades', 'doacoes', 'cadastro','login','esqueci-senha', 'dashboard'];

// Verifica se a página solicitada existe
if (in_array($pagina, $paginasPermitidas)) {
    include "paginas/$pagina.php"; 
} else {
    include "paginas/404.php"; 
}
?>

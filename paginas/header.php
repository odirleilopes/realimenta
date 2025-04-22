<?php
$paginaAtual = isset($_GET['pagina']) ? $_GET['pagina'] : 'home';

?>

      <header class="section rd-navbar-wrap" data-preset='{"title":"Navbar App","category":"header","reload":true,"id":"navbar-app"}'>
        <nav class="rd-navbar navbar-app">
          <div class="navbar-container">
            <div class="navbar-cell">
              <div class="navbar-panel">
                <button class="navbar-switch int-hamburger novi-icon" data-multi-switch='{"targets":".rd-navbar","scope":".rd-navbar","isolate":"[data-multi-switch]"}'></button>
                <div class="navbar-logo"><a class="navbar-logo-link" href="./"><img class="navbar-logo-default" src="images/logo-default-344x88.png" alt="Helper" width="172" height="44"/><img class="navbar-logo-inverse" src="images/logo-inverse-344x88.png" alt="ReAlimenta" width="172" height="44"/></a></div>
              </div>
            </div>
            <div class="navbar-cell navbar-sidebar">
              <ul class="navbar-navigation rd-navbar-nav">
                <li class="navbar-navigation-root-item <?= ($paginaAtual == 'home') ? 'active' : ''; ?>"><a class="navbar-navigation-root-link" href="./">Home</a>
                </li>
                <li class="navbar-navigation-root-item <?= ($paginaAtual == 'sobre') ? 'active' : ''; ?>"><a class="navbar-navigation-root-link" href="sobre">Sobre</a>
                </li>
                <li class="navbar-navigation-root-item <?= ($paginaAtual == 'entidade') ? 'active' : ''; ?>"><a class="navbar-navigation-root-link" href="entidades">Entidades</a>
                </li>
                <li class="navbar-navigation-root-item <?= ($paginaAtual == 'doacao') ? 'active' : ''; ?>"><a class="navbar-navigation-root-link" href="doacoes">Doações</a>
                </li>
			
               </ul>
            </div>
            <div class="navbar-cell navbar-spacer"></div>
            <div class="navbar-cell">
              <div class="navbar-subpanel">
                <div class="navbar-subpanel-item">
                  <button class="navbar-button navbar-info-button mdi-dots-vertical novi-icon" data-multi-switch='{"targets":".rd-navbar","scope":".rd-navbar","class":"navbar-info-active","isolate":"[data-multi-switch]"}'></button>
                  <div class="navbar-info"><a class="btn btn-primary navbar-action-button" href="login">Login</a> &nbsp;<a class="btn btn-info navbar-action-button" href="cadastro">Cadastra-se</a></div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
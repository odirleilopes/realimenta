
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Doação</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta property="og:title" content="ReAlimenta - Salvando Vidas">
    <meta property="og:description" content="Realimenta, Vidas, SemFome, DoeVida, DoeAlimento">
    <meta property="og:image" content="http://realimenta.com/images/radar.gif">
    <meta property="og:url" content="http://realimenta.net">
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="components/base/base.css">
    <script src="components/base/core.min.js"></script>
    <script src="components/base/script.js"></script>
  </head>
  <body>
    <div class="page">
      <!--RD Navbar-->
	  <?php include 'header.php'; ?>      
      <!-- Breadcrumb default-->
      <section class="section section-lg bg-transparent pt-5 novi-background" data-preset='{"title":"Breadcrumb","category":"breadcrumb","reload":false,"id":"breadcrumb-5"}'>
        <div class="container">
                <!-- Breadcrumb-->
                <ul class="breadcrumb">
                  <li class="breadcrumb-item"><a class="breadcrumb-link" href="./">Home</a></li>
                  <li class="breadcrumb-item"><a class="breadcrumb-link" href="#">Doação</a></li>
                </ul>
          <h2>Doações</h2>
        </div>
      </section>
      <!-- Donate-->
      <section class="section section-md bg-transparent novi-background">
        <div class="container">
          <div class="row row-40">
            <div class="col-sm-10 col-md-6">
              <h3 class="heading-sm">Contatos</h3>
              <div class="offset-md">
                <div class="d-inline-flex align-items-center"><span class="icon icon-xs int-phone novi-icon mr-2"></span>
                  <div class="h4 heading-sm"><a href="tel:#">+55 61 98555 5684</a></div>
                </div>
              </div>
              <div class="offset-xs">
                <div class="h4 heading-sm">Procure uma rede ReAlimenta para doar</div>
              </div>
              <ul class="list list-xs small">
                <li class="list-item">Rede ReAlimenta Atacadista Coleta</li>
                <li class="list-item">Rede ReAlimenta Shopping Doações</li>
                <li class="list-item">Rede ReAlimenta Igrejas</li>
              </ul>
              <ul class="list list-md">
                <li class="list-item"><a class="link link-primary font-weight-normal" href="mailto:#">info@realimenta.org</a></li>
              </ul>
            </div>
            <div class="col-md-6">
              <div class="row row-30 align-items-center">
                <div class="col-lg-6">
                  <h3 class="heading-sm">Doação por Pix</h3>
                </div>
                <div class="col-md-12">
  				  <h4> PIX: (61) 98555-5684</h4>
	              <img data-animate='{"class":"fadeIn"}' src="images/image-01-qr-code.png" alt="" width="320" height="320"/>
                  <div class="form-output snackbar snackbar-secondary" id="form-output-global"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Footer app-->
  	  <?php include 'footer.php'; ?>
    </div>
    <div class="page-loader context-dark">
      <div class="page-loader-container"><img class="page-loader-logo" src="images/logo-default-344x88.png" alt="Helper" width="172" height="44"/>
        <svg class="page-loader-progress" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100" style="visibility: hidden;">
          <circle class="page-loader-circle clipped" cx="50" cy="50" r="48"></circle>
        </svg>
      </div>
    </div>
  </body>
</html>
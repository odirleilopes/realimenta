'use strict';

// Global components list
let components = window.components = {};

components.loaderCircle = {
	selector: '.page-loader-progress',
	script: './components/progress-circle/progress-circle.min.js',
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			node.style.visibility = 'visible';

			let
				instance = new ProgressCircle({
					node: node
				}),
				intervalId = setInterval( function () {
					if ( instance.params.angle < 355 ) {
						let increment = ( 360 - instance.params.angle ) * 0.07;
						instance.render( instance.params.angle + increment );
					} else {
						clearInterval( intervalId );
						instance.render( 355 );
					}
				}, 20 );

			window.addEventListener( 'components:ready', function () {
				clearInterval( intervalId );
				instance.render( 360 );
			});
		});
	}
};

components.pageReveal = {
	selector: '.page',
	init: function () {
		window.addEventListener( 'components:ready', function () {
			window.dispatchEvent( new Event( 'resize' ) );
			document.documentElement.classList.add( 'components-ready' );

			setTimeout( function () {
				document.documentElement.classList.add( 'page-loaded' );
			}, 500 );
		}, { once: true } );
	}
};

components.fontAwesome = {
	selector: '[class*="fa-"]',
	styles: './components/font-awesome/font-awesome.css'
};

components.mdi = {
	selector: '[class*="mdi-"]',
	styles: './components/mdi/mdi.css'
};

components.thin = {
	selector: '[class*="thin-"]',
	styles: './components/thin/thin.css'
};

components.grid = {
	selector: '.container, .container-fluid, .row, [class*="col-"]',
	styles: './components/grid/grid.css'
};

components.section = {
	selector: 'section',
	styles: './components/section/section.css'
};

components.serviceSection = {
	selector: '.service-section',
	styles: './components/service-section/service-section.css'
};

components.footer = {
	selector: 'footer',
	styles: './components/footer/footer.css'
};

components.button = {
	selector: '.btn',
	styles: './components/button/button.css'
};

components.link = {
	selector: '.link',
	styles: './components/link/link.css'
};

components.input = {
	selector: '.form-group, .input-group, .form-check, .custom-control, .form-control',
	styles: './components/input/input.css'
};

components.checkboxColor = {
	selector: '.checkbox-color',
	styles: './components/checkbox-color/checkbox-color.css'
};

components.checkboxTag = {
	selector: '.checkbox-tag',
	styles: './components/checkbox-tag/checkbox-tag.css'
};

components.figure = {
	selector: '.figure',
	styles: './components/figure/figure.css'
};

components.imageMask = {
	selector: '.image-mask',
	styles: './components/image-mask/image-mask.css'
};

components.code = {
	selector: 'code',
	styles: [
		'./components/code/code.css',
		'https://fonts.googleapis.com/css?family=IBM+Plex+Mono:500&display=swap'
	]
};

components.fontHeeboRubik = {
	selector: 'html',
	styles: 'https://fonts.googleapis.com/css2?family=Heebo:wght@100;300;400;500;700&family=Rubik:wght@400;500;700&display=swap'
};

components.intenseIcons = {
	selector: '[class*="int-"]',
	styles: './components/intense-icons/intense-icons.css'
};

components.intenseThin = {
	selector: '[class*="ith-"]',
	styles: './components/intense-thin/intense-thin.css'
};

components.currentDevice = {
	selector: 'html',
	script: './components/current-device/current-device.min.js'
};

components.rdNavbar = {
	selector: '.rd-navbar',
	styles: [
		'./components/rd-navbar/rd-navbar.css'
	],
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/util/util.min.js',
		'./components/current-device/current-device.min.js',
		'./components/rd-navbar/rd-navbar.min.js'
	],
	dependencies: 'currentDevice',
	init: function ( nodes ) {
		let promises = [];

		nodes.forEach( function ( node ) {
			promises.push( new Promise ( function ( resolve ) {
				let
					backButtons = node.querySelectorAll( '.navbar-navigation-back-btn' ),
					params = parseJSON( node.getAttribute( 'data-rd-navbar' ) ),
					defaults = {
						stickUpClone: false,
						anchorNav: false,
						autoHeight: false,
						stickUpOffset: '1px',
						responsive: {
							0: {
								layout: 'rd-navbar-fixed',
								deviceLayout: 'rd-navbar-fixed',
								focusOnHover: false,
								stickUp: false
							},
							992: {
								layout: 'rd-navbar-fixed',
								deviceLayout: 'rd-navbar-fixed',
								focusOnHover: false,
								stickUp: false
							},
							1200: {
								layout: 'rd-navbar-fullwidth',
								deviceLayout: 'rd-navbar-fullwidth',
								stickUp: true,
								stickUpOffset: '1px',
								autoHeight: true
							}
						},
						callbacks: {
							onStuck: function () {
								document.documentElement.classList.add( 'rd-navbar-stuck' );
							},
							onUnstuck: function () {
								document.documentElement.classList.remove( 'rd-navbar-stuck' );
							},
							onDropdownToggle: function () {
								if ( this.classList.contains( 'opened' ) ) {
									this.parentElement.classList.add( 'overlaid' );
								} else {
									this.parentElement.classList.remove( 'overlaid' );
								}
							},
							onDropdownClose: function () {
								this.parentElement.classList.remove( 'overlaid' );
							},
							onDomAppend: function () {
								resolve()
							}
						}
					},
					xMode = {
						stickUpClone: false,
						anchorNav: false,
						responsive: {
							0: {
								stickUp: false,
								stickUpClone: false
							},
							992: {
								stickUp: false,
								stickUpClone: false
							},
							1200: {
								stickUp: false,
								stickUpClone: false
							}
						},
						callbacks: {
							onDropdownOver: function () { return false; }
						}
					},
					navbar = node.RDNavbar = new RDNavbar( node, Util.merge( window.xMode ? [ defaults, params, xMode ] : [ defaults, params ] ) );

				if ( backButtons.length ) {
					backButtons.forEach( function ( btn ) {
						btn.addEventListener( 'click', function () {
							let
								submenu = this.closest( '.rd-navbar-submenu' ),
								parentmenu = submenu.parentElement;
	
							navbar.dropdownToggle.call( submenu, navbar );
						});
					});
				}
			}) );
		});

		return Promise.all( promises );
	}
};

components.regula = {
	selector: '[data-constraints]',
	styles: './components/regula/regula.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/regula/regula.min.js'
	],
	init: function ( nodes ) {
		let elements = $( nodes );

		// Custom validator - phone number
		regula.custom({
			name: 'PhoneNumber',
			defaultMessage: 'Invalid phone number format',
			validator: function() {
				if ( this.value === '' ) return true;
				else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( this.value );
			}
		});

		for (let i = 0; i < elements.length; i++) {
			let o = $(elements[i]), v;
			o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
			v = o.parent().find(".form-validation");
			if (v.is(":last-child")) o.addClass("form-control-last-child");
		}

		elements.on('input change propertychange blur', function (e) {
			let $this = $(this), results;

			if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
			if ($this.parents('.rd-mailform').hasClass('success')) return;

			if (( results = $this.regula('validate') ).length) {
				for (let i = 0; i < results.length; i++) {
					$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
				}
			} else {
				$this.siblings(".form-validation").text("").parent().removeClass("has-error")
			}
		}).regula('bind');

		let regularConstraintsMessages = [
			{
				type: regula.Constraint.Required,
				newMessage: "The text field is required."
			},
			{
				type: regula.Constraint.Email,
				newMessage: "The email is not a valid email."
			},
			{
				type: regula.Constraint.Numeric,
				newMessage: "Only numbers are required"
			},
			{
				type: regula.Constraint.Selected,
				newMessage: "Please choose an option."
			}
		];


		for (let i = 0; i < regularConstraintsMessages.length; i++) {
			let regularConstraint = regularConstraintsMessages[i];

			regula.override({
				constraintType: regularConstraint.type,
				defaultMessage: regularConstraint.newMessage
			});
		}
	}
};

components.rdMailform = {
	selector: '.rd-mailform',
	styles: [
		'./components/rd-mailform/rd-mailform.css',
		'./components/intense-icons/intense-icons.css',
		'./components/font-awesome/font-awesome.css',
		'./components/mdi/mdi.css'
	],
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/rd-mailform/rd-mailform.min.js',
	],
	init: function ( nodes ) {
		let i, j, k,
			$captchas = $( nodes ).find( '.recaptcha' ),
			msg = {
				'MF000': 'Enviado com sucesso!',
				'MF001': 'Destinatários não definidos!',
				'MF002': 'O formulário não funcionará localmente!',
				'MF003': 'Por favor, defina o campo de e-mail no seu formulário!',
				'MF004': 'Por favor, defina o tipo do seu formulário!',
				'MF254': 'Algo deu errado com o PHPMailer!',
				'MF255': 'Ops! Algo deu errado.'
			};

		if ( $captchas.length ) {
			$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
		}

		/**
		 * @desc Check if all elements pass validation
		 * @param {object} elements - object of items for validation
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function isValidated(elements, captcha) {
			let results, errors = 0;

			if (elements.length) {
				for (let j = 0; j < elements.length; j++) {

					let $input = $(elements[j]);
					if ((results = $input.regula('validate')).length) {
						for (k = 0; k < results.length; k++) {
							errors++;
							$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
						}
					} else {
						$input.siblings(".form-validation").text("").parent().removeClass("has-error")
					}
				}

				if (captcha) {
					if (captcha.length) {
						return validateReCaptcha(captcha) && errors === 0
					}
				}

				return errors === 0;
			}
			return true;
		}

		/**
		 * @desc Validate google reCaptcha
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function validateReCaptcha(captcha) {
			let captchaToken = captcha.find('.g-recaptcha-response').val();

			if (captchaToken.length === 0) {
				captcha
				.siblings('.form-validation')
				.html('Por favor, prove que você não é um robô.')
				.addClass('active');
				captcha
				.closest('.form-wrap')
				.addClass('has-error');

				captcha.on('propertychange', function () {
					let $this = $(this),
						captchaToken = $this.find('.g-recaptcha-response').val();

					if (captchaToken.length > 0) {
						$this
						.closest('.form-wrap')
						.removeClass('has-error');
						$this
						.siblings('.form-validation')
						.removeClass('active')
						.html('');
						$this.off('propertychange');
					}
				});

				return false;
			}

			return true;
		}

		/**
		 * @desc Initialize Google reCaptcha
		 */
		window.onloadCaptchaCallback = function () {
			for (let i = 0; i < $captchas.length; i++) {
				let
					$captcha = $($captchas[i]),
					resizeHandler = (function() {
						let
							frame = this.querySelector( 'iframe' ),
							inner = this.firstElementChild,
							inner2 = inner.firstElementChild,
							containerRect = null,
							frameRect = null,
							scale = null;

						inner2.style.transform = '';
						inner.style.height = 'auto';
						inner.style.width = 'auto';

						containerRect = this.getBoundingClientRect();
						frameRect = frame.getBoundingClientRect();
						scale = containerRect.width/frameRect.width;

						if ( scale < 1 ) {
							inner2.style.transform = 'scale('+ scale +')';
							inner.style.height = ( frameRect.height * scale ) + 'px';
							inner.style.width = ( frameRect.width * scale ) + 'px';
						}
					}).bind( $captchas[i] );

				grecaptcha.render(
					$captcha.attr('id'),
					{
						sitekey: $captcha.attr('data-sitekey'),
						size: $captcha.attr('data-size') ? $captcha.attr('data-size') : 'normal',
						theme: $captcha.attr('data-theme') ? $captcha.attr('data-theme') : 'light',
						callback: function () {
							$('.recaptcha').trigger('propertychange');
						}
					}
				);

				$captcha.after("<span class='form-validation'></span>");

				if ( $captchas[i].hasAttribute( 'data-auto-size' ) ) {
					resizeHandler();
					window.addEventListener( 'resize', resizeHandler );
				}
			}
		};

		for ( i = 0; i < nodes.length; i++ ) {
			let
				$form = $(nodes[i]),
				formHasCaptcha = false;

			$form.attr('novalidate', 'novalidate').ajaxForm({
				data: {
					"form-type": $form.attr("data-form-type") || "contact",
					"counter": i
				},
				beforeSubmit: function (arr, $form, options) {
					if ( window.xMode ) return;

					let
						form = $(nodes[this.extraData.counter]),
						inputs = form.find("[data-constraints]"),
						output = $("#" + form.attr("data-form-output")),
						captcha = form.find('.recaptcha'),
						captchaFlag = true;

					output.removeClass("active error success");

					if (isValidated(inputs, captcha)) {

						// veify reCaptcha
						if (captcha.length) {
							let captchaToken = captcha.find('.g-recaptcha-response').val(),
							captchaMsg = {
								'CPT001': 'Por favor, configure sua "chave do site" e "chave secreta" do reCaptcha',
								'CPT002': 'Algo deu errado com o Google reCaptcha'
							};

							formHasCaptcha = true;

							$.ajax({
								method: "POST",
								url: "components/rd-mailform/reCaptcha.php",
								data: {'g-recaptcha-response': captchaToken},
								async: false
							})
							.done(function (responceCode) {
								if (responceCode !== 'CPT000') {
									if (output.hasClass("snackbar")) {
										output.html('<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon int-check"></span>'+ captchaMsg[responceCode] +'</div></div>');

										setTimeout(function () {
											output.removeClass("active");
										}, 3500);

										captchaFlag = false;
									} else {
										output.html(captchaMsg[responceCode]);
									}

									output.addClass("active");
								}
							});
						}

						if (!captchaFlag) {
							return false;
						}

						form.addClass('form-in-process');

						if (output.hasClass("snackbar")) {
							output.html('<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon fa-circle-o-notch fa-spin"></span>Sending</div></div>');
							output.addClass("active");
						}
					} else {
						return false;
					}
				},
				error: function (result) {
					if ( window.xMode ) return;

					let
						output = $("#" + $(nodes[this.extraData.counter]).attr("data-form-output")),
						form = $(nodes[this.extraData.counter]);

					output.text(msg[result]);
					form.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}
				},
				success: function (result) {
					if ( window.xMode ) return;

					let
						form = $(nodes[this.extraData.counter]),
						output = $("#" + form.attr("data-form-output")),
						select = form.find('select');

					form
					.addClass('success')
					.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}

					result = result.length === 5 ? result : 'MF255';
					output.text(msg[result]);

					if (result === "MF000") {
						if (output.hasClass("snackbar")) {
							output.html('<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon int-check"></span>'+ msg[result] +'</div></div>');
						} else {
							output.addClass("active success");
						}
					} else {
						if (output.hasClass("snackbar")) {
							output.html('<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon int-warning"></span>'+ msg[result] +'</div></div>');
						} else {
							output.addClass("active error");
						}
					}

					form.clearForm();

					if (select.length) {
						select.select2("val", "");
					}

					form.find('input, textarea').trigger('blur');

					setTimeout(function () {
						output.removeClass("active error success");
						form.removeClass('success');
					}, 3500);
				}
			});
		}
	}
};

components.campaignMonitor = {
	selector: '.campaign-mailform',
	styles: './components/rd-mailform/rd-mailform.css',
	script: './components/jquery/jquery-3.4.1.min.js',
	init: function ( nodes ) {
		/**
		 * @desc Check if all elements pass validation
		 * @param {object} elements - object of items for validation
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function isValidated(elements, captcha) {
			let results, errors = 0;

			if (elements.length) {
				for (let j = 0; j < elements.length; j++) {

					let $input = $(elements[j]);
					if ((results = $input.regula('validate')).length) {
						for (let k = 0; k < results.length; k++) {
							errors++;
							$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
						}
					} else {
						$input.siblings(".form-validation").text("").parent().removeClass("has-error")
					}
				}

				if (captcha) {
					if (captcha.length) {
						return validateReCaptcha(captcha) && errors === 0
					}
				}

				return errors === 0;
			}
			return true;
		}

		let $nodes = $(nodes);

		for ( let i = 0; i < $nodes.length; i++ ) {
			let $campaignItem = $($nodes[i]);

			$campaignItem.on('submit', $.proxy(function (e) {
				e.preventDefault();

				let data = {},
					url = this.attr('action'),
					dataArray = this.serializeArray(),
					$output = $("#" + $nodes.attr("data-form-output")),
					$this = $(this);

				for ( let i = 0; i < dataArray.length; i++) {
					data[dataArray[i].name] = dataArray[i].value;
				}

				$.ajax({
					data: data,
					url: url,
					dataType: 'jsonp',
					error: function (resp, text) {
						$output.html('Server error: ' + text);

						setTimeout(function () {
							$output.removeClass("active");
						}, 4000);
					},
					success: function (resp) {
						$output.html(resp.Message).addClass('active');

						setTimeout(function () {
							$output.removeClass("active");
						}, 6000);
					},
					beforeSend: function (data) {
						// Stop request if inputs are invalid
						if ( window.xMode || !isValidated( $this.find( '[data-constraints]' ) ) )
							return false;

						$output.html('Submitting...').addClass('active');
					}
				});

				// Clear inputs after submit
				let inputs = $this[0].getElementsByTagName('input');
				for (let i = 0; i < inputs.length; i++) {
					inputs[i].value = '';
					let label = document.querySelector( '[for="'+ inputs[i].getAttribute( 'id' ) +'"]' );
					if( label ) label.classList.remove( 'focus', 'not-empty' );
				}

				return false;
			}, $campaignItem));
		}
	}
};

components.mailchimp = {
	selector: '.mailchimp-mailform',
	styles: './components/rd-mailform/rd-mailform.css',
	script: './components/jquery/jquery-3.4.1.min.js',
	init: function ( nodes ) {
		let $nodes = $( nodes );

		for ( let i = 0; i < $nodes.length; i++ ) {
			let
				$mailchimpItem = $($nodes[i]),
				$email = $mailchimpItem.find('input[type="email"]');

			// Required by MailChimp
			$mailchimpItem.attr('novalidate', 'true');
			$email.attr('name', 'EMAIL');

			$mailchimpItem.on('submit', $.proxy( function ( $email, event ) {
				event.preventDefault();

				let
					$this = this,
					data = {},
					url = $this.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
					dataArray = $this.serializeArray(),
					$output = $("#" + $this.attr("data-form-output"));

				for ( let i = 0; i < dataArray.length; i++ ) {
					data[dataArray[i].name] = dataArray[i].value;
				}

				$.ajax({
					data: data,
					url: url,
					dataType: 'jsonp',
					error: function (resp, text) {
						$output.html('Server error: ' + text);

						setTimeout(function () {
							$output.removeClass("active");
						}, 4000);
					},
					success: function (resp) {
						$output.html(resp.msg).addClass('active');
						$email[0].value = '';
						var $label = $('[for="'+ $email.attr( 'id' ) +'"]');
						if ( $label.length ) $label.removeClass( 'focus not-empty' );

						setTimeout(function () {
							$output.removeClass("active");
						}, 6000);
					},
					beforeSend: function (data) {
						var isValidated = (function () {
							var results, errors = 0;
							var elements = $this.find('[data-constraints]');
							var captcha = null;
							if (elements.length) {
								for (var j = 0; j < elements.length; j++) {

									var $input = $(elements[j]);
									if ((results = $input.regula('validate')).length) {
										for (var k = 0; k < results.length; k++) {
											errors++;
											$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
										}
									} else {
										$input.siblings(".form-validation").text("").parent().removeClass("has-error")
									}
								}

								if (captcha) {
									if (captcha.length) {
										return validateReCaptcha(captcha) && errors === 0
									}
								}

								return errors === 0;
							}
							return true;
						})();

						// Stop request if builder or inputs are invalid
						if ( window.xMode || !isValidated ) return false;

						$output.html('Submitting...').addClass('active');
					}
				});

				return false;
			}, $mailchimpItem, $email ));
		}
	}
};

components.multiswitch = {
	selector: '[data-multi-switch]',
	styles: './components/multiswitch/multiswitch.css',
	script: [
		'./components/current-device/current-device.min.js',
		'./components/multiswitch/multiswitch.js'
	],
	dependencies: 'rdNavbar',
	init: function ( nodes ) {
		let click = device.ios() ? 'touchstart' : 'click';

		nodes.forEach( function ( node ) {
			if ( node.tagName === 'A' ) {
				node.addEventListener( click, function ( event ) {
					event.preventDefault();
				});
			}

			MultiSwitch( Object.assign( {
				node: node,
				event: click,
			}, parseJSON( node.getAttribute( 'data-multi-switch' ) ) ) );
		});
	}
};

components.multiswitchTargetSlide = {
	selector: '[data-multi-switch-target-slide]',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/multiswitch/multiswitch.js'
	],
	dependencies: 'multiswitch',
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			let params = parseJSON( node.getAttribute( 'data-multi-switch-target-slide' ) );

			if ( !node.multiSwitchTarget.groups.active.state ) node.style.display = 'none';

			node.addEventListener( 'switch:active', function () {
				let $this = $( this );

				if ( this.multiSwitchTarget.groups.active.state ) {
					$this.stop().slideDown( params );
				} else {
					$this.stop().slideUp( params );
				}
			});
		});
	}
};

components.owl = {
	selector: '.owl-carousel',
	styles: './components/owl-carousel/owl.carousel.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/owl-carousel/owl.carousel.min.js',
		'./components/util/util.min.js'
	],
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			let
				params = parseJSON( node.getAttribute( 'data-owl' ) ),
				defaults = {
					items: 1,
					margin: 40,
					loop: true,
					mouseDrag: true,
					stagePadding: 0,
					nav: false,
					navText: [],
					dots: false,
					autoplay: true,
					autoplayHoverPause: true
				},
				xMode = {
					autoplay: false,
					loop: false,
					mouseDrag: false
				},
				generated = {
					autoplay: node.getAttribute( 'data-autoplay' ) !== 'false',
					loop: node.getAttribute( 'data-loop' ) !== 'false',
					mouseDrag: node.getAttribute( 'data-mouse-drag' ) !== 'false',
					responsive: {}
				},
				aliaces = [ '-', '-xs-', '-sm-', '-md-', '-lg-', '-xl-', '-xxl-' ],
				values =  [ 0, 480, 576, 768, 992, 1200, 1600 ],
				responsive = generated.responsive;

			for ( let j = 0; j < values.length; j++ ) {
				responsive[ values[ j ] ] = {};

				for ( let k = j; k >= -1; k-- ) {
					if ( !responsive[ values[ j ] ][ 'items' ] && node.getAttribute( 'data' + aliaces[ k ] + 'items' ) ) {
						responsive[ values[ j ] ][ 'items' ] = k < 0 ? 1 : parseInt( node.getAttribute( 'data' + aliaces[ k ] + 'items' ), 10 );
					}
					if ( !responsive[ values[ j ] ][ 'stagePadding' ] && responsive[ values[ j ] ][ 'stagePadding' ] !== 0 && node.getAttribute( 'data' + aliaces[ k ] + 'stage-padding' ) ) {
						responsive[ values[ j ] ][ 'stagePadding' ] = k < 0 ? 0 : parseInt( node.getAttribute( 'data' + aliaces[ k ] + 'stage-padding' ), 10 );
					}
					if ( !responsive[ values[ j ] ][ 'margin' ] && responsive[ values[ j ] ][ 'margin' ] !== 0 && node.getAttribute( 'data' + aliaces[ k ] + 'margin' ) ) {
						responsive[ values[ j ] ][ 'margin' ] = k < 0 ? 30 : parseInt( node.getAttribute( 'data' + aliaces[ k ] + 'margin' ), 10 );
					}
				}
			}

			node.owl = $( node );
			$( node ).owlCarousel( Util.merge( window.xMode ? [ defaults, params, generated, xMode ] : [ defaults, params, generated ] ) );
		});
	}
};

components.counter = {
	selector: '[data-counter]',
	styles: './components/counter/counter.css',
	script: [
		'./components/util/util.min.js',
		'./components/counter/counter.min.js',
	],
	init: function ( nodes ) {
		let observer = new IntersectionObserver( function ( entries ) {
			let observer = this;

			entries.forEach( function ( entry ) {
				let node = entry.target;

				if ( entry.isIntersecting ) {
					node.counter.run();
					observer.unobserve( node );
				}
			});
		}, {
			rootMargin: '0px',
			threshold: 1.0
		});

		nodes.forEach( function ( node ) {
			let counter = aCounter( Object.assign( {
				node: node,
				duration: 1000
			}, parseJSON( node.getAttribute( 'data-counter' ) ) ) );

			if ( window.xMode ) {
				counter.run();
			} else {
				observer.observe( node );
			}
		})
	}
};

components.animate = {
	selector: '[data-animate]',
	styles: './components/animate/animate.css',
	script: './components/current-device/current-device.min.js',
	init: function ( nodes ) {
		if ( window.xMode || device.macos() ) {
			nodes.forEach( function ( node ) {
				let params = parseJSON( node.getAttribute( 'data-animate' ) );
				node.classList.add( 'animated', params.class );
			});
		} else {
			let observer = new IntersectionObserver( function ( entries ) {
				let observer = this;

				entries.forEach( function ( entry ) {
					let
						node = entry.target,
						params = parseJSON( node.getAttribute( 'data-animate' ) );

					if ( params.delay ) node.style.animationDelay = params.delay;
					if ( params.duration ) node.style.animationDuration = params.duration;

					if ( entry.isIntersecting ) {
						node.classList.add( 'animated', params.class );
						observer.unobserve( node );
					}
				});
			}, {
				threshold: .5
			});

			nodes.forEach( function ( node ) {
				observer.observe( node );
			});
		}
	}
};

components.progressLinear = {
	selector: '.progress-linear',
	styles: './components/progress-linear/progress-linear.css',
	script: [
		'./components/util/util.min.js',
		'./components/counter/counter.min.js'
	],
	init: function ( nodes ) {
	let observer = new IntersectionObserver( function ( entries ) {
		let observer = this;

		entries.forEach( function ( entry ) {
			let node = entry.target;

			if ( entry.isIntersecting ) {
				node.counter.run();
				observer.unobserve( node );
			}
		});
	}, {
		rootMargin: '0px',
		threshold: 1.0
	});

	nodes.forEach( function ( node ) {
		let
			bar = node.querySelector( '.progress-linear-bar' ),
			counter = node.counter = aCounter({
				node: node.querySelector( '.progress-linear-counter' ),
				duration: 500,
				onStart: function ( value ) {
					bar.style.width = this.params.to +'%';
				}
			});

		if ( window.xMode ) {
			counter.run();
		} else {
			observer.observe( node );
		}
	});
	}
};

components.rdSearch = {
	selector: '[data-rd-search]',
	styles: './components/rd-search/rd-search.css',
	script: './components/rd-search/rd-search.js',
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			new RDSearch( Object.assign( {
				form: node,
				handler: 'components/rd-search/rd-search.php',
				output: '.rd-search-results'
			}, parseJSON( node.getAttribute( 'data-rd-search' ) ) ) );
		});
	}
};

components.rdRange = {
	selector: '.rd-range',
	styles: './components/rd-range/rd-range.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/rd-range/rd-range.min.js'
	],
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			$( node ).RDRange({});
		});
	}
};

components.maskedinput = {
	selector: '[data-masked]',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/maskedinput/jquery.maskedinput.min.js'
	],
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			$( node ).mask( node.getAttribute( 'data-masked' ) );
		});
	}
};

components.spinner = {
	selector: '[data-spinner]',
	styles: './components/spinner/spinner.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/jquery/jquery-ui.min.js'
	],
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			let
				params = parseJSON( node.getAttribute( 'data-spinner' ) ),
				defaults = {
					min: 0,
					step: 1
				};

			$( node ).spinner( $.extend( defaults, params ) );
		});
	}
};

components.lightgallery = {
	selector: '[data-lightgallery]',
	styles: './components/lightgallery/lightgallery.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/lightgallery/lightgallery.min.js',
		'./components/util/util.min.js'
	],
	init: function ( nodes ) {
		if ( !window.xMode ) {
			nodes.forEach( function ( node ) {
				node = $( node );
				let
					defaults = {
						thumbnail: true,
						selector: '.lightgallery-item',
						youtubePlayerParams: {
							modestbranding: 1,
							showinfo: 0,
							rel: 0,
							controls: 0
						},
						vimeoPlayerParams: {
							byline : 0,
							portrait : 0,
							color : 'A90707'
						}
					},
					options = parseJSON( node.attr( 'data-lightgallery' ) );

				node.lightGallery( Util.merge( [ defaults, options ] ) );
			});
		}
	}
};

components.icon = {
	selector: '.icon',
	styles: './components/icon/icon.css'
};

components.logo = {
	selector: '.logo',
	styles: './components/logo/logo.css'
};

components.badge = {
	selector: '.badge',
	styles: './components/badge/badge.css'
};

components.bradcrumb = {
	selector: '.breadcrumb',
	styles: './components/breadcrumb/breadcrumb.css'
};

components.accordion = {
	selector: '.accordion',
	styles: [
		'./components/accordion/accordion.css',
		'./components/intense-icons/intense-icons.css'
	]
};

components.pagination = {
	selector: '.pagination, .pag',
	styles: [
		'./components/pagination/pagination.css',
		'./components/pag/pag.css',
		'./components/intense-icons/intense-icons.css'
	]
};

components.thumbnailScaleup = {
	selector: '.thumbnail-scaleup',
	styles: './components/thumbnail-scaleup/thumbnail-scaleup.css'
};

components.thumbnailZoom = {
	selector: '.thumbnail-zoom',
	styles: './components/thumbnail-zoom/thumbnail-zoom.css'
};

components.gallery = {
	selector: '.gallery',
	styles: './components/gallery/gallery.css'
};

components.blog = {
	selector: '.blog',
	styles: './components/blog/blog.css'
};

components.blogArticle = {
	selector: '.blog-article',
	styles: './components/blog-article/blog-article.css'
};

components.post = {
	selector: '.post',
	styles: './components/post/post.css'
};

components.postMeta = {
	selector: '.post-meta',
	styles: './components/post-meta/post-meta.css'
};

components.postShare = {
	selector: '.post-share',
	styles: './components/post-share/post-share.css'
};

components.product = {
	selector: '.product',
	styles: './components/product/product.css'
};

components.widget = {
	selector: '.widget',
	styles: './components/widget/widget.css'
};

components.tag = {
	selector: '.tag',
	styles: './components/tag/tag.css'
};

components.intro = {
	selector: '.intro',
	styles: './components/intro/intro.css'
};

components.snackbar = {
	selector: '.snackbar',
	styles: './components/snackbar/snackbar.css'
};

components.rights = {
	selector: '.rights',
	styles: './components/rights/rights.css'
};

components.iframe = {
	selector: '.iframe',
	styles: './components/iframe/iframe.css'
};

components.gmap = {
	selector: '.google-map',
		styles: './components/google-map/google-map.css',
		script: [
		'//maps.google.com/maps/api/js?key=AIzaSyBHij4b1Vyck1QAuGQmmyryBYVutjcuoRA&libraries=geometry,places&v=quarterly',
		'./components/google-map/google-map.js'
	],
	init: function ( nodes ) {
		let promises = [];

		nodes.forEach( function ( node ) {
			let
				defaults = {
					node: node,
					center: { lat: 0, lng: 0 },
					zoom: 4,
				},
				params = parseJSON( node.getAttribute( 'data-settings' ) ),
				sMap = new SimpleGoogleMap( Object.assign( defaults, params ) );

			promises.push( new Promise ( function ( resolve ) {
				sMap.map.addListener( 'tilesloaded', resolve );
			}) );
		});

		return Promise.all( promises );
	}
};

components.gmapMarkerInfo = {
	selector: '[data-marker-info]',
		init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			node.addEventListener( 'click', function () {
				let
					params = parseJSON( this.getAttribute( 'data-marker-info' ) ),
					map = document.querySelector( params.mapId ).simpleGoogleMap;

				map.showInfo( params.markerId );
			});
		});
	}
};

components.isotope = {
	selector: '.isotope-wrap',
	styles: './components/isotope/isotope.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/isotope/isotope.min.js'
	],
	init: function ( nodes ) {
		function setFilterActive ( filterGroup, activeItem ) {
			if ( !activeItem.classList.contains( 'active' ) ) {
				for ( let n = 0; n < filterGroup.length; n++ ) filterGroup[ n ].classList.remove( 'active' );
				activeItem.classList.add( 'active' );
			}
		}

		nodes.forEach( function ( node ) {
			let
				isotopeItem = $( '.isotope' ),
				isotopeFilters = node.querySelectorAll( '[data-isotope-filter]' );

			isotopeItem.isotope({
				itemSelector: '.isotope-item'
			});

			isotopeFilters.forEach( function ( filter ) {
				filter.addEventListener( 'click', function () {
					setFilterActive( isotopeFilters, filter );
					isotopeItem.isotope( {
						filter: $( this ).attr( 'data-isotope-filter' )
					} );
				} );
			} );
		});
	}
};

components.pendedIFrame = {
	selector: '[data-pended-iframe]',
		init: function ( nodes ) {
		nodes.forEach( function( node ) {
			let loader = ( function () {
				node.setAttribute( 'src', node.getAttribute( 'data-pended-iframe' ) );
			}).bind( node );

			window.addEventListener( 'classSwitching', loader );
			window.addEventListener( 'components:stylesReady', loader );
		});
	}
};

components.snackbar = {
	selector: '.snackbar',
	styles: './components/snackbar/snackbar.css'
};

components.divider = {
	selector: '.divider',
	styles: './components/divider/divider.css'
};

components.blurb = {
	selector: '.blurb',
	styles: [
		'./components/media/media.css',
		'./components/blurb/blurb.css'
	]
};

components.person = {
	selector: '.person',
	styles: './components/person/person.css'
};

components.rating = {
	selector: '.rating',
	styles: './components/rating/rating.css'
};

components.award = {
	selector: '.award',
	styles: './components/award/award.css'
};

components.quote = {
	selector: '.quote',
	styles: [
		'./components/media/media.css',
		'./components/quote/quote.css'
	]
};

components.service = {
	selector: '.service',
	styles: './components/service/service.css'
};

components.quoteSimple = {
	selector: '.quote-simple',
	styles: [
		'./components/media/media.css',
		'./components/quote-simple/quote-simple.css'
	]
};

components.comment = {
	selector: '.comment',
	styles: [
		'./components/media/media.css',
		'./components/comment/comment.css'
	]
};

components.review = {
	selector: '.review',
	styles: './components/review/review.css'
};

components.partner = {
	selector: '.partner',
	styles: './components/partner/partner.css'
};

components.list = {
	selector: '.list',
	styles: [
		'./components/list/list.css',
		'./components/intense-icons/intense-icons.css'
	]
};

components.dl = {
	selector: 'dl',
	styles: './components/dl/dl.css'
};

components.media = {
	selector: '.media',
	styles: './components/media/media.css'
};

components.toTop = {
	selector: 'html',
	styles: './components/to-top/to-top.css',
	script: './components/jquery/jquery-3.4.1.min.js',
	init: function () {
		if ( !window.xMode ) {
			let node = document.createElement( 'div' );
			node.className = 'to-top int-arrow-up';
			document.body.appendChild( node );

			node.addEventListener( 'mousedown', function () {
				this.classList.add( 'active' );

				$( 'html, body' ).stop().animate( { scrollTop:0 }, 500, 'swing', (function () {
					this.classList.remove( 'active' );
				}).bind( this ));
			});

			document.addEventListener( 'scroll', function () {
				if ( window.scrollY > window.innerHeight ) node.classList.add( 'show' );
				else node.classList.remove( 'show' );
			});
		}
	}
};


/**
 * Wrapper to eliminate json errors
 * @param {string} str - JSON string
 * @returns {object} - parsed or empty object
 */
function parseJSON ( str ) {
	try {
		if ( str )  return JSON.parse( str );
		else return {};
	} catch ( error ) {
		return {};
	}
}

/**
 * Returns version of IE or false, if browser is not Internet Explorer
 * @see {@link https://gist.github.com/gaboratorium/25f08b76eb82b1e7b91b01a0448f8b1d}
 * @returns {number|boolean}
 */
function detectIE () {
	let
		ua = window.navigator.userAgent,
		msie = ua.indexOf( 'MSIE ' ),
		trident = ua.indexOf( 'Trident/' ),
		edge = ua.indexOf( 'Edge/' );

	if ( msie > 0 ) {
		return parseInt( ua.substring( msie + 5, ua.indexOf( '.', msie ) ), 10 );
	}

	if ( trident > 0 ) {
		let rv = ua.indexOf( 'rv:' );
		return parseInt( ua.substring( rv + 3, ua.indexOf( '.', rv ) ), 10 );
	}

	if ( edge > 0 ) {
		return parseInt( ua.substring( edge + 5, ua.indexOf( '.', edge ) ), 10 );
	}

	return false;
}

// Main
window.addEventListener( 'load', function () {
	new ZemezCore({
		components: components,
		observeDOM: window.xMode
	});
});

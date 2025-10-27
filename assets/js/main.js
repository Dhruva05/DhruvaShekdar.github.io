/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// A11y: focus trap support
	var lastFocusedElement = null;
	var sourceSection = null; // Track which section user came from
	
	function setupFocusTrap($article) {
		lastFocusedElement = document.activeElement;
		var $focusables = $article.find('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])').filter(':visible');
		if ($focusables.length === 0) {
			$article.attr('tabindex', '-1');
			$article.focus();
			return;
		}
		var first = $focusables.first()[0];
		var last = $focusables.last()[0];
		$(document).on('keydown.focus-trap', function(e) {
			if (e.key === 'Tab') {
				if (e.shiftKey) {
					if (document.activeElement === first) {
						e.preventDefault();
						last.focus();
					}
				} else {
					if (document.activeElement === last) {
						e.preventDefault();
						first.focus();
					}
				}
			}
		});
		first.focus();
	}

	function teardownFocusTrap() {
		$(document).off('keydown.focus-trap');
		if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
			lastFocusedElement.focus();
		}
		lastFocusedElement = null;
	}
	
	function getSourceSection(articleId) {
		// Determine source section based on article ID
		if (articleId.startsWith('project-')) {
			// Check if it's an internship project
			if (articleId === 'project-tesla' || articleId === 'project-cimco') {
				return '#internships';
			}
			return '#work';
		}
		if (articleId === 'intro') {
			return ''; // Return to home for About Me
		}
		return ''; // Default fallback to home
	}

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0) {

				$nav.addClass('use-middle');
				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

			}

	// Main.
		var	delay = 325,
			locked = false;

		// Methods.
			$main._show = function(id, initial) {

				var $article = $main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								$main_articles.removeClass('active');

							// Hide header, footer.
								$header.hide();
								$footer.hide();

							// Show main, article.
								$main.show();
								$article.show();

							// Activate article.
								$article.addClass('active');
								setupFocusTrap($article);

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						locked = true;

				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = $main_articles.filter('.active');

							$currentArticle.removeClass('active');

						// Show article.
							setTimeout(function() {

								// Hide current article.
									$currentArticle.hide();

								// Show article.
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');
										setupFocusTrap($article);

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							$body
								.addClass('is-article-visible');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									$header.hide();
									$footer.hide();

								// Show main, article.
									$main.show();
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');
										setupFocusTrap($article);

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								teardownFocusTrap();
								$article.hide();
								$main.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						locked = true;

				// Deactivate article.
					$article.removeClass('active');

				// Hide article.
					setTimeout(function() {

						// Hide article, main.
							teardownFocusTrap();
							$article.hide();
							$main.hide();

						// Show footer, header.
							$footer.show();
							$header.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-article-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);

					}, delay);


			};

		// Articles.
			$main_articles.each(function() {

				var $this = $(this);

				// Close.
					var targetSection = getSourceSection($this.attr('id'));
					var closeLabel = targetSection ? 'Back' : 'Home';
					var closeAriaLabel = targetSection ? 'Go back to previous section' : 'Return home';

					var $close = $('<div class="close" role="button" tabindex="0">' + closeLabel + '</div>')
						.attr('aria-label', closeAriaLabel)
						.appendTo($this)
						.on('click', function() {
							location.hash = targetSection;
						});

					// Keyboard activate close (Enter/Space)
					$close.on('keydown', function(e) {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							location.hash = targetSection;
						}
					});

				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {

				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

			});

			// Home button click handler
			$body.on('click', '.home-btn', function(event) {
				event.preventDefault();
				event.stopPropagation();
				location.hash = '';
			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching article.
					else if ($main_articles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show(location.hash.substr(1));

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}

		// Initialize.

			// Hide main, articles.
				$main.hide();
				$main_articles.hide();

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

})(jQuery);

// Background Canvas Animation
(function(){
	var canvas = document.getElementById('bg-canvas');
	if (!canvas) return;
	var ctx = canvas.getContext('2d');
	var width, height, dpr = window.devicePixelRatio || 1;
	var particles = [];
	var num = 60;
	var hue = 210;
	var rafId = null;
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var maxDist = 140; // px

	function resize() {
		width = canvas.clientWidth;
		height = canvas.clientHeight;
		canvas.width = Math.floor(width * dpr);
		canvas.height = Math.floor(height * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	function rand(min, max){ return Math.random() * (max - min) + min; }

	function initParticles(){
		particles = [];
		for (var i = 0; i < num; i++) {
			particles.push({
				x: rand(0, width),
				y: rand(0, height),
				vx: rand(-0.4, 0.4),
				vy: rand(-0.4, 0.4),
				size: rand(1, 2.5),
				life: rand(0.5, 1.0)
			});
		}
	}

	function step(){
		ctx.clearRect(0, 0, width, height);
		var grad = ctx.createLinearGradient(0, 0, width, height);
		grad.addColorStop(0, 'rgba(20,24,28,0.4)');
		grad.addColorStop(1, 'rgba(20,24,28,0.1)');
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, width, height);

		ctx.fillStyle = 'hsla(' + hue + ',70%,70%,0.9)';
		ctx.shadowColor = 'hsla(' + hue + ',70%,70%,0.8)';
		ctx.shadowBlur = 8;
		for (var i = 0; i < particles.length; i++) {
			var p = particles[i];
			p.x += p.vx;
			p.y += p.vy;
			if (p.x < -10) p.x = width + 10; else if (p.x > width + 10) p.x = -10;
			if (p.y < -10) p.y = height + 10; else if (p.y > height + 10) p.y = -10;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.shadowBlur = 0;

		// Constellation lines
		ctx.lineWidth = 1.25;
		for (var i = 0; i < particles.length; i++) {
			for (var j = i + 1; j < particles.length; j++) {
				var a = particles[i];
				var b = particles[j];
				var dx = a.x - b.x;
				var dy = a.y - b.y;
				var d2 = dx*dx + dy*dy;
				if (d2 < maxDist * maxDist) {
					var d = Math.sqrt(d2);
					var alpha = (1 - d / maxDist) * 0.9; // brighter lines
					ctx.strokeStyle = 'hsla(' + hue + ',70%,60%,' + alpha.toFixed(3) + ')';
					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(b.x, b.y);
					ctx.stroke();
				}
			}
		}

		hue += 0.05;
		rafId = requestAnimationFrame(step);
	}

	function start(){
		resize();
		initParticles();
		if (!reduceMotion) step();
	}

	function stop(){
		if (rafId) cancelAnimationFrame(rafId);
		rafId = null;
	}

	window.addEventListener('resize', function(){
		resize();
		initParticles();
	});

	if (reduceMotion) {
		// Draw static background
		resize();
		ctx.fillStyle = 'rgba(20,24,28,0.5)';
		ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	} else {
		start();
	}
})();

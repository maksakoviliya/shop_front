//= ../libs/jquery/jquery.3.3.1.js
//= ../libs/parallax.js-1.5.0/parallax.js
//= ../libs/OwlCarousel2-2.3.4/dist/owl.carousel.min.js
//= ../libs/ion.rangeSlider-master/js/ion.rangeSlider.min.js

// Variables
var productTitleBlock = '.product-link__title';

$(document).ready(function () {
	$('.initializible').addClass('initialized');

	linkTitleEqualHeight(productTitleBlock);
	stickyHeader();

	$('.header__hamburger').on('click', function (e) {
		e.preventDefault();
		openSideMenu();
	})

	$('.wrapper__overlay').on('click', function (e) {
		e.preventDefault();
		closeSideMenu()
	})

	$('.has-submenu a').on('click', function (e) {
		e.preventDefault();

		var $this = $(this),
			submenu = $this.siblings('ul');

		submenu.slideToggle(150);
		$this.toggleClass('is-active');
	})

	var cartTimer = '';
	$('.header__cart').hover(function() {
		var $this = $(this),
			$cart = $('#' + $this.data('target'));

		if ($cart.length) {
			$cart.addClass('is-active');
			clearTimeout(cartTimer);
		}
	},function () {
		var $this = $(this),
			$cart = $('#' + $this.data('target'));
		if ($cart.length) {
			cartTimer = setTimeout(function() {$cart.removeClass('is-active');}, 500);
		}
	})

	$('.cart__inner').hover(function() {
		clearTimeout(cartTimer);
	},function() {
		var $cart = $(this).closest('.cart');

		if ($cart.length) {
			cartTimer = setTimeout(function() {$cart.removeClass('is-active');}, 500);
		}
	})

	var submenuTimer = '';
	$('.has-megamenu a').hover(function() {
		var $this = $(this),
			$submenu = $('#' + $this.data('target'));

		if ($submenu.length) {
			$submenu.addClass('is-active');
			clearTimeout(submenuTimer);
		}
	},function () {
		var $this = $(this),
			$submenu = $('#' + $this.data('target'));
		if ($submenu.length) {
			submenuTimer = setTimeout(function() {$submenu.removeClass('is-active');}, 500);
		}
	})

	$('.megamenu').hover(function() {
		clearTimeout(submenuTimer);
	},function() {
		var $submenu = $(this);

		submenuTimer = setTimeout(function() {$submenu.removeClass('is-active');}, 500);
	})


	$('.banner__slider').owlCarousel({
		items: 1,
		loop: true,
		margin: 30,
		// autoplay: true
		dots: false,
	});

	$(".js-range-slider").ionRangeSlider({
		skin: "round"
	});

	$('.filter-btn').on('click', function (e) {
		e.preventDefault();

		var $this = $(this),
			filter = $this.siblings('.filter');

		$this.toggleClass('is-active');
		if ($this.hasClass('is-active')) {
			$this.text('Свернуть')
		} else {
			$this.text('Фильтр')
		}
		filter.stop(true, true).slideToggle('150');
	})

	$('.thumbs__item').on('click', 'a', function (e) {
		e.preventDefault();

		var $this = $(this),
			$item = $this.closest('.thumbs__item'),
			$src  = $this.find('img').attr('src'),
			$screen = $('.screen').find('img');

		$item.siblings('.thumbs__item').removeClass('is-active');
		$item.addClass('is-active');
		
		$screen.attr('src', $src);
	})

	var feedbacks = $('.feedbacks__screen').owlCarousel({
		items: 1,
		dots: false,
		loop: true,
	});

	$('.feedbacks__nav a').click(function(e) {
		e.preventDefault();

		if ($(this).hasClass('prev')){
		    feedbacks.trigger('prev.owl.carousel');
		} else {
		    feedbacks.trigger('next.owl.carousel');
		}
	})

	$('.value-input__change').on('click', function(e) {
		e.preventDefault();

		var $this = $(this),
			$input = $this.siblings('input'),
			$value = $input.val();


		if ($this.hasClass('value-input__change_minus')) {
			if ($value!=1) {
				$value--;
				$input.val($value);
			}
		} else if ($this.hasClass('value-input__change_plus')) {
			$value++;
			$input.val($value);
		}

		$input.trigger('change');
	})

	$('.value-input input').on('change', function() {
		var $input = $(this),
			$value = $input.val(),
			$price = $input.closest('tr').find('.cart-table__price_item').text().split(' ').join(''),
			$total = $input.closest('tr').find('.cart-table__price_total'),
			$total_val = 0;

		$total_val = $value * $price;
		$total_val = $total_val.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		$total.text($total_val);

		setTotalPrice();
	})

	setTotalPrice();

	$('.categories a').hover(function() {
		var $this = $(this),
			$subcat = $('#' + $this.data('target'));

		if ($subcat.length) {
			$this.addClass('is-active').siblings().removeClass('is-active');
			$subcat.addClass('is-active').siblings().removeClass('is-active');;
		}
	});

	$('.tabs').each(function(index) {
      var $tabParent = $(this);
      var $tabs = $tabParent.find('li');
      var $contents = $tabParent.next('.tabs-content').find('.tab-content');

      $tabs.click(function() {
        var curIndex = $(this).index();
        // toggle tabs
        $tabs.removeClass('is-active');
        $tabs.eq(curIndex).addClass('is-active');
        // toggle contents
        $contents.removeClass('is-active');
        $contents.eq(curIndex).addClass('is-active');
      });
    });

    $('.modal-close').on('click', function(e) {
    	e.preventDefault();
    	$(this).closest('.modal').removeClass('is-active');
    });

    $('.modal-background').on('click', function() {
    	$(this).closest('.modal').removeClass('is-active');
    });

    $('.notification__close').on('click', function(){
    	$(this).closest('.notification').slideUp(150);
    });

})

$(window).on('resize', function() {
	linkTitleEqualHeight(productTitleBlock);
	resizeHeader();
});

function stickyHeader() {
	var header = $('.header'),
		scrollPosition = 0,
		headerTopHeight = 41,
		checkpoint = 300;
	$(window).scroll(function() {
		var currentPosition = $(this).scrollTop();
		if (currentPosition < scrollPosition) {
			// On top
			if (currentPosition == 0) {
				header.removeClass('navigation--sticky navigation--unpin navigation--pin');
				// header.css("margin-top", 0);
			}
			// on scrollUp
			else if (currentPosition > checkpoint) {
				header.removeClass('navigation--unpin').addClass('navigation--sticky navigation--pin');
			}
		}
		// On scollDown
		else {
			if (currentPosition > checkpoint) {
				if(!$('#megamenu').hasClass('is-active') && !$('#cart').hasClass('is-active')){
					header.addClass('navigation--unpin').removeClass('navigation--pin');
				}
				// header.css("margin-top", -headerTopHeight);
			}
		}
		scrollPosition = currentPosition;
	});
}

function openSideMenu() {
	$('.header__hamburger').addClass('is-active');
	$('.wrapper').addClass('menu-active');
	$('.side-menu').addClass('is-active');
}

function closeSideMenu() {
	$('.header__hamburger').removeClass('is-active');
	$('.wrapper').removeClass('menu-active');
	$('.side-menu').removeClass('is-active');
}

function resizeHeader() {
	var menu = $('.side-menu'),
		checkPoint = 1087,
		windowWidth = $(window).innerWidth();
	if (windowWidth > checkPoint) {
		closeSideMenu();
	}
}

function linkTitleEqualHeight(block) {
	var mh = 0;
	if ($(block).length) {
		$(block).each(function () {
			$(this).height('auto');
			var h_block = parseInt($(this).height());
			if(h_block > mh) {
			  mh = h_block;
			}
		});
		$(block).height(mh);
	}	
}

function setTotalPrice() {
	var $total = 0,
		$items = $('.cart-table__price_total'),
		$cart = $('.cart-total__price');

	$items.each(function () {
		$total += parseInt($(this).text().split(' ').join(''), 10);
	})

	$cart.text($total.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
}
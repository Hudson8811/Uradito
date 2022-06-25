'use strict';
$(document).ready(function() {
	$('.js-show-menu').on('click',function (){
		let header = $('.header');
		header.toggleClass('active');
		$('body').toggleClass('menu-opened');
	});

	$('.js-audio-control').on('click',function (){
		event.preventDefault();
		let audio = $(this).find('audio')[0];
		if (audio.paused == false) {
			audio.pause();
			$(this).removeClass('active');
		} else {
			$('.js-audio-control audio').each(function (){
				if (this != audio){
					this.pause();
					this.currentTime = 0;
					$(this).parent().removeClass('active');
				}
			})
			audio.play();
			$(this).addClass('active');
		}
	});


	$('.js-show-lang').on('click',function (){
		event.preventDefault();
		$(this).parent('.lang').toggleClass('lang--active');
	});

	$(document).on('click',function (){
		let lang = $('.lang');
		if (!event.composedPath().includes(lang[0])) {
			lang.removeClass('lang--active');
		}
	});


	if ($('.garants__slider').length > 0){
		let maxHeightSlider = 0;
		var rev = $('.garants__slider');
		rev.on('init', function(event, slick, currentSlide) {
			var
				cur = $(slick.$slides[slick.currentSlide]),
				next = cur.next(),
				prev = cur.prev();
			prev.addClass('slick-sprev');
			next.addClass('slick-snext');
			cur.removeClass('slick-snext').removeClass('slick-sprev');
			slick.$prev = prev;
			slick.$next = next;

			slick.$slides.each(function (){
				let height = $(this).find('.garant').outerHeight();
				if (maxHeightSlider < height) maxHeightSlider = height;
			});
			slick.$slides.css('height', maxHeightSlider + 'px')
		}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			var cur = $(slick.$slides[nextSlide]);
			slick.$prev.removeClass('slick-sprev');
			slick.$next.removeClass('slick-snext');
			var next = cur.next(),
				prev = cur.prev();
			prev.prev();
			prev.next();
			prev.addClass('slick-sprev');
			next.addClass('slick-snext');
			slick.$prev = prev;
			slick.$next = next;
			cur.removeClass('slick-next').removeClass('slick-sprev');
		});


		rev.slick({
			speed: 700,
			arrows: false,
			dots: true,
			focusOnSelect: true,
			prevArrow: '<button> prev</button>',
			nextArrow: '<button> next</button>',
			infinite: true,
			centerMode: true,
			slidesPerRow: 1,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerPadding: '0',
			swipe: true,
			dotsClass: 'garants__dots',
			customPaging: function(slider, i) {
				return '';
			},
		});

		$(window).resize(function(){
			rev.find('.slick-slide').height('auto');
			maxHeightSlider = 0;
			rev.find('.slick-slide').each(function (){
				let height = $(this).find('.garant').outerHeight();
				if (maxHeightSlider < height) maxHeightSlider = height;
			});
			rev.find('.slick-slide').css('height', maxHeightSlider + 'px')
		});
	}

	if ($('.r-slider__items').length > 0){
		$('.r-slider__items').slick({
			speed: 400,
			arrows: true,
			dots: false,
			fade: true,
			focusOnSelect: true,
			prevArrow: '.js-review-prev',
			nextArrow: '.js-review-next',
			infinite: false,
			centerMode: false,
			slidesPerRow: 1,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerPadding: '0',
			swipe: true,
			customPaging: function(slider, i) {
				return '';
			},
			/*infinite: false,*/
		});

		$('.r-slider__items').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$('.reviews__image').eq(nextSlide).addClass('reviews__image--active').siblings().removeClass('reviews__image--active');
		});

		$('.reviews__image').on('click',function (){
			event.preventDefault();
			let index = $(this).index();
			$('.r-slider__items').slick('slickGoTo', index);
		});
	}
});


function calculateVh() {
	var vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');
}

calculateVh();
window.addEventListener('resize', calculateVh);
window.addEventListener('orientationchange', calculateVh);

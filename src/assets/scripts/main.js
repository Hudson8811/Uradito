'use strict';
$(document).ready(function() {
	$('.js-audio-control').on('click',function (){
		event.preventDefault();
		let audio = $(this).find('audio')[0];
		if (audio.paused == false) {
			audio.pause();
		} else {
			$('.js-audio-control audio').each(function (){
				if (this != audio){
					this.pause();
					this.currentTime = 0;
				}
			})
			audio.play();
		}
	});



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
		/*infinite: false,*/
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


	$('.r-slider__items').slick({
		speed: 600,
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

});

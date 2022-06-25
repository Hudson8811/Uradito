'use strict';
import Swiper from 'swiper/bundle';

$(document).ready(function() {
	if ($('.triple-slider').length > 0){
		$('.triple-slider').each(function (){
			let mainSlider = $(this).find('.triple-slider__main-inner')[0];
			let textSlider = $(this).find('.triple-slider__text-inner')[0];
			let backSlider = $(this).find('.triple-slider__back-inner')[0];
			let nextArrow = $(this).find('.triple-slider__arrow--next')[0];
			let prevArrow = $(this).find('.triple-slider__arrow--prev')[0];
			let $Speed = 500;

			let mainSwiper = new Swiper(mainSlider, {
				effect: "fade",
				speed: $Speed,
				//autoHeight: true,
				loop: true,
				allowTouchMove: true,
				loopAdditionalSlides: 100,
			});

			let backSwiper = new Swiper(backSlider, {
				speed: $Speed,
				loop: true,
				followFinger: true,
				grabCursor: true,
				watchSlidesProgress: true,
				parallax: false,
				slidesPerView: 'auto',
				centeredSlides: true,
				loopAdditionalSlides: 100,
				navigation: {
					nextEl: nextArrow,
					prevEl: prevArrow,
				},
			});

			let textSwiper = new Swiper(textSlider, {
				effect: "fade",
				speed: $Speed,
				autoHeight: true,
				loop: true,
				allowTouchMove: true,
				loopAdditionalSlides: 100,
			});


			backSwiper.controller.control = [mainSwiper,textSwiper];
		});
	}

	let stagesActive = false;
	let stagesSwiper;

	if ($('.stages').length > 0){
		if (!stagesActive && $(window).width() < 768){
			stagesActive = true;
			createStagesSlider()
		}

		$(window).on('resize',function (){
			if (!stagesActive && $(window).width() < 768){
				stagesActive = true;
				createStagesSlider()
			} else if (stagesActive && $(window).width() >= 768){
				stagesActive = false;
				destroyStagesSlider()
			}
		});

		function createStagesSlider(){
			$('.stages__inner').addClass('swiper-wrapper');
			$('.stages__row').addClass('swiper-slide');
			$('.stages__top-item').eq(0).addClass('active').siblings().removeClass('active');
			stagesSwiper = new Swiper('.stages__slider', {
				effect: "slide",
				speed: 500,
				//autoHeight: true,
				loop: false,
				allowTouchMove: true,
				slidesPerView: 1,
				spaceBetween: 14
			});
			stagesSwiper.on('slideChange', function (swiper) {
				let index = swiper.activeIndex;
				$('.stages__top-item').eq(index).addClass('active').siblings().removeClass('active');
			});
		}


		function destroyStagesSlider(){
			stagesSwiper.destroy(true,true);
			$('.stages__inner').removeClass('swiper-wrapper');
			$('.stages__row').removeClass('swiper-slide');
		}
	}



});

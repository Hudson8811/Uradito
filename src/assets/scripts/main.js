'use strict';
$(document).ready(function() {
	$('.js-set-category').on('click',function (){
		event.preventDefault();
		if (!$(this).hasClass('category--active')){
			let id = $(this).data('id')
			$(this).addClass('category--active').siblings('.category').removeClass('category--active');
			$('.specialist').removeClass('specialist--active');
			$('.specialist[data-id='+id+']').addClass('specialist--active');
		}
	});
	$('.js-next-category').on('click',function (){
		event.preventDefault();
		let active = $('.category--active');
		let next = active.next('.category');
		if (next.length){
			let id = next.data('id')
			next.addClass('category--active').siblings('.category').removeClass('category--active');
			$('.specialist').removeClass('specialist--active');
			$('.specialist[data-id='+id+']').addClass('specialist--active');
		}
	});
	$('.js-prev-category').on('click',function (){
		event.preventDefault();
		let active = $('.category--active');
		let prev = active.prev('.category');
		if (prev.length){
			let id = prev.data('id')
			prev.addClass('category--active').siblings('.category').removeClass('category--active');
			$('.specialist').removeClass('specialist--active');
			$('.specialist[data-id='+id+']').addClass('specialist--active');
		}
	});



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


});

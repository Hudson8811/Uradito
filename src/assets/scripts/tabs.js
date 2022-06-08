'use strict';
$(document).ready(function() {
	let currentTab = $('.category--active').index();
	let totalTabs = $('.category').length;

	$('.category').on('click', function() {
		event.preventDefault();
		if (!$(this).hasClass('category--active') ) {
			let index = $(this).index();
			currentTab = index;
			selectTab(index);
		}
	})

	function previousTab() {
		currentTab = Math.max(currentTab - 1, 0);
		selectTab(currentTab)
	}
	function nextTab() {
		currentTab = Math.min(currentTab + 1, totalTabs - 1);
		selectTab(currentTab)
	}

	function selectTab(index) {
		$('.category').eq(index).addClass('category--active').siblings().removeClass('category--active');
		let id = $('.category').eq(index).data('id')
		setActiveTab(id);
	}
	function setActiveTab(id){
		$('.specialist').removeClass('specialist--active');
		$('.specialist[data-id='+id+']').addClass('specialist--active');
	}

	$('.js-next-category').on('click',function (){
		event.preventDefault();
		let active = $('.category--active');
		let next = active.next('.category');
		if (next.length){
			nextTab();
		}
	});
	$('.js-prev-category').on('click',function (){
		event.preventDefault();
		let active = $('.category--active');
		let prev = active.prev('.category');
		if (prev.length){
			previousTab();
		}
	});
});

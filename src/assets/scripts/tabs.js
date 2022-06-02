'use strict';
$(document).ready(function() {
	let currentTab = $('.category--active').index();
	let totalTabs = $('.category').length;
	let speed = 300;
	let addLeftPad = 0;
	let tabsList = $(".categories");
	let initSwipe = false;
	let swipeOptions = {
		triggerOnTouchEnd: true,
		swipeStatus: swipeStatus,
		allowPageScroll: "vertical",
		threshold: 75
	};


	if ($(window).width() < 768) {
		tabsList.swipe(swipeOptions);
		initSwipe = true;
	}
	$(window).resize(function() {
		if ($(window).width() < 768) {
			if (!initSwipe) {
				tabsList.swipe(swipeOptions);
				initSwipe = true;
			}
		} else {
			if (initSwipe) {
				tabsList.swipe("destroy");
				tabsList.attr("style", "");
				initSwipe = false;
			}
		}
	})
	$('.category').on('click', function() {
		event.preventDefault();
		if (!$(this).hasClass('category--active') ) {
			let index = $(this).index();
			if ($(window).width() < 768) {
				currentTab = index;
				if (currentTab === 0) {
					addLeftPad = 0
				} else if (currentTab < totalTabs - 1) {
					addLeftPad = (($('.specialists__container').width() - $('.category').eq(currentTab).innerWidth()) / 2 - parseInt(tabsList.css('padding-left'))) * -1;
				} else {
					addLeftPad = (($('.specialists__container').width() - $('.category').eq(currentTab).innerWidth()) - parseInt(tabsList.css('padding-left')) * 2) * -1;
				}
				selectTab(currentTab, speed);
			} else {
				currentTab = index;
				selectTab(index, speed);
			}
		}
	})
	function swipeStatus(event, phase, direction, distance) {
		if (phase == "move" && (direction == "left" || direction == "right")) {
			let duration = 0;
		} else if (phase == "end") {
			if (direction == "right") {
				previousTab();
			} else if (direction == "left") {
				nextTab();
			}
		}
	}
	function previousTab() {
		currentTab = Math.max(currentTab - 1, 0);
		if (currentTab === 0) {
			addLeftPad = 0
		} else {
			addLeftPad = (($('.specialists__container').width() - $('.category').eq(currentTab).innerWidth()) / 2 - parseInt(tabsList.css('padding-left'))) * -1;
		}
		selectTab(currentTab, speed)
	}
	function nextTab() {
		currentTab = Math.min(currentTab + 1, totalTabs - 1);
		if (currentTab < totalTabs - 1) {
			addLeftPad = (($('.specialists__container').width() - $('.category').eq(currentTab).innerWidth()) / 2 - parseInt(tabsList.css('padding-left'))) * -1;
		} else {
			addLeftPad = (($('.specialists__container').width() - $('.category').eq(currentTab).innerWidth()) - parseInt(tabsList.css('padding-left')) * 2) * -1;
		}
		selectTab(currentTab, speed)
	}
	function scrollTabs(tabIndex, duration, addDistance=0) {
		if ($('.categories').outerWidth() > $(window).width()) {
			let distance = 0;
			for (let i = 0; i < tabIndex; i++) {
				distance += $('.category').eq(i).innerWidth();
			}
			distance += addDistance;
			distance += addLeftPad;
			tabsList.css("transition-duration", (duration / 1000).toFixed(1) + "s");
			let value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
			tabsList.css("transform", "translate(" + value + "px,0)");
		}
	}
	function selectTab(index, speed=0) {
		if ($(window).width() < 768) {
			scrollTabs(index, speed);
		}

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

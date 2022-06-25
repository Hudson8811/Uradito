/* src/app.js */

// Styles
import 'swiper/css/bundle';
import 'styles/_app.scss'

$(function() {
	console.log('Ready!')

	require('scripts/slick')

	require('scripts/main')
	require('scripts/tabs')
	require('scripts/header')
	require('scripts/phones-slider')
})

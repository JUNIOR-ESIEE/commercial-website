'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
			_userAgentInit();
		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();

})();


// Auto resizing
var je = {};

je.hero = document.querySelector("section.hero"); // Todo : make this scalable
je.resizeHero = function() {
	je.hero.style.minHeight = window.innerHeight + "px";
}
$(document).ready(function(){
	je.resizeHero();
});
window.onresize = function() {
	je.resizeHero();
}


// Navigation
$(document).ready(function () { // Navbar
	// init controller
	var controller = new ScrollMagic.Controller();

	// build scenes
	new ScrollMagic.Scene({
			duration: 0,
			offset: 50
		})
		.setClassToggle("#nav", "on-content") // add class toggle
		.addTo(controller);
	var navOpen = false;
	var navElement = document.querySelector(".nav-overlay");
	var navAnimation = new TweenLite.fromTo(navElement,1,{top:-1 * window.innerHeight,bottom:window.innerHeight},{top:0,bottom:0,paused:true});
	navElement.style.top = '-9999px';
	navElement.style.bottom = '9999px';
	$(".toggle-nav").click(function(){
		if(navOpen) {
			navAnimation.reverse(0).eventCallback("onComplete", function() {
				navElement.style.top = '-9999px';
				navElement.style.bottom = '9999px';
			});
		} else {
			navAnimation.reversed(false).restart().eventCallback("onComplete",null);
		}
		navOpen = !navOpen;
	});	
});
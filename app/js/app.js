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

// Competencies animations
/*var pales = document.getElementById("svg2");
TweenLite.to(pales, 10, {rotation:"360",ease:"Linear.easeNone",repeat:'-1'});*/

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
	var navAnimation = new TweenLite.fromTo(navElement,1,{top:-1 * window.innerHeight},{top:0,paused:true});
	//var closeNavAnimation = new TweenLite.to(".nav-overlay",0.6,{top:window.innerHeight, paused:true});
	$(".toggle-nav").click(function(){
		if(navOpen) {
			navAnimation.reversed(true).restart().eventCallback("onComplete", function() {
				navElement.style.top = '-9999px';
			});
		} else {
			navAnimation.reversed(false).restart().eventCallback("onComplete",null);
		}
		navOpen = !navOpen;
	});	
});
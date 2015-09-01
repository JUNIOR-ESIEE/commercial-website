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
	
	///////////////////////
	// ScrollMagic Stuff //
	///////////////////////

	// init controller
/*		var controller = new ScrollMagic.Controller();

		// Navbar
		var navtween = TweenMax.to("nav.main,nav .cta",1, {className:"+=on-content"});
	
		new ScrollMagic.Scene({triggerElement: "#title-main",triggerHook:0.1,duration:150})
						//.setTween("nav.main,li.cta", {className:"+=on-content"})
						.setTween(navtween)
						.addIndicators()
						.addTo(controller);*/

})();

var je = {};

je.hero = document.querySelector("section.hero"); // Todo : make this scalable
je.resizeHero = function() {
	je.hero.style.height = window.innerHeight + "px";
}
$(document).ready(function(){
	je.resizeHero();
});
window.onresize = function() {
	je.resizeHero();
}
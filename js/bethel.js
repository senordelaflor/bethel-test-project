(function(bethel, window, document) {
"use strict";

bethel.animate = function(el, animationClass) {

    var endAnimation = function () {
        el.classList.remove(animationClass);
        el.removeEventListener('transitionend', endAnimation);
    };

    var startAnimation = function() {
        el.classList.add(animationClass);
        el.addEventListener('transitionend', endAnimation);
    };

    startAnimation();
};

var mobileMenu = function() {
    var nav = document.querySelector('nav'),
        hamburger = document.getElementById('menu__hamburger'),
        menu = document.querySelector('ul');

    var toggleMenu = function(e) {
        e.preventDefault();
        bethel.animate(menu, 'menu__animation');
        nav.classList.toggle('menu__hamburger--opened');
    };

    var init = function() {
        hamburger.addEventListener('click', toggleMenu);
    };

    init();
};

mobileMenu();
}(window.bethel = window.bethel || {}, window, document));

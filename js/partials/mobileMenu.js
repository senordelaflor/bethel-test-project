var mobileMenu = function() {
    var nav = document.querySelector('nav'),
        hamburger = document.getElementById('menu__hamburger'),
        menu = document.querySelector('ul'),

    toggleMenu = function(e) {
        e.preventDefault();
        bethel.animate(menu, 'menu__animation');
        nav.classList.toggle('menu__hamburger--opened');
    },

    closeMenu = function(e) {
        if (nav.classList.contains('menu__hamburger--opened')) {
            nav.classList.remove('menu__hamburger--opened');
        }
    },

    attachCloseMenu = function(e) {
        var links = document.getElementsByClassName('menu__link');

        for (var d = 0; d < links.length; d++) {
            links[d].addEventListener('click', closeMenu);
        }
    },

    init = function() {
        hamburger.addEventListener('click', toggleMenu);
        attachCloseMenu();
    };

    init();
};

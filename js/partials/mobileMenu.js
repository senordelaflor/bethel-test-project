var mobileMenu = function() {
    var nav = document.querySelector('nav'),
        hamburger = document.getElementById('menu__hamburger'),
        menu = document.querySelector('ul'),

    toggleMenu = function(e) {
        e.preventDefault();
        bethel.animate(menu, 'menu__animation');
        nav.classList.toggle('menu__hamburger--opened');
    },

    init = function() {
        hamburger.addEventListener('click', toggleMenu);
    };

    init();
};

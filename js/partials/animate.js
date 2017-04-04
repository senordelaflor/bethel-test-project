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

(function(bethel, window, document, undefined) {
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

bethel.loadYoutubeAsync = function (el, youtubeLink){
    var iframe = document.createElement('iframe');

    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('src', youtubeLink);

    el.textContent = '';
    el.appendChild(iframe);
};
bethel.findClosest = function(el, stopAtEl) {
    try {
        if (el === stopAtEl) {
            return el;
        }
        do {
            el = el.parentElement;
        }
        while (el !== stopAtEl);
        return el;
    }
    catch (e) {
        el = null;
        return el;
    }
};
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

var popups = function() {

    var popupEl = document.getElementById('popups'),
        youtubeEl = document.getElementById('popup__video'),

    removeIframe = function() {
        var iframes = document.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; i++) {
            iframes[i].parentNode.removeChild(iframes[i]);
        }
    },

    isClickOutsidePopup = function(e) {
        var popup = document.getElementById('popup'),
            findIfClickIsInsidePopup = bethel.findClosest(e.target, popup);
        if (findIfClickIsInsidePopup === null){
            popupEl.classList.add('hide');
            popupEl.classList.remove('popup--visible');
            popupEl.removeEventListener('click', isClickOutsidePopup);
            removeIframe();
        }
    },

    openPopup = function(e) {
        e.preventDefault();

        popupEl.classList.remove('hide');
        popupEl.classList.add('popup--visible');
        bethel.loadYoutubeAsync(youtubeEl, this.href);
        popupEl.addEventListener('click', isClickOutsidePopup);

    },

    attachOpenPopupEvents = function() {
        var openPopupButtons = document.getElementsByClassName('open-popup');
        for (var c = 0; c < openPopupButtons.length; c++) {
            openPopupButtons[c].addEventListener('click', openPopup)
        }
    },

    attachClosePopupEvents = function() {
        var closePopupButtons = document.getElementsByClassName('close-popup');
        for (var d = 0; d < closePopupButtons.length; d++) {
            closePopupButtons[d].addEventListener('click', closePopupButtons);
        }
    },

    init = function() {
         attachOpenPopupEvents();
         attachClosePopupEvents();
    };

    init();
};
var ascendingNumbers = function () {

    var numbersFinished = 0,

    isScrolledIntoView = function(el) {
        var percentVisible = 0.1;
        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;
        var elemHeight = el.getBoundingClientRect().height;
        var overhang = elemHeight * (1 - percentVisible);

        return (elemTop >= -overhang) && (elemBottom <= window.innerHeight + overhang);
    },

    animateValue = function (obj, start, end, duration) {
        // assumes integer values for start and end
        var range = end - start;
        // no timer shorter than 50ms (not really visible any way)
        var minTimer = 50;
        // calc step time to show all interediate values
        var stepTime = Math.abs(Math.floor(duration / range));

        // never go below minTimer
        stepTime = Math.max(stepTime, minTimer);

        // get current time and calculate desired end time
        var startTime = new Date().getTime();
        var endTime = startTime + duration;
        var timer;

        var run = function() {
            var now = new Date().getTime();
            var remaining = Math.max((endTime - now) / duration, 0);
            var value = Math.round(end - (remaining * range));
            obj.textContent = value;
            if (value === end) {
                clearInterval(timer);
            }
        };

        timer = setInterval(run, stepTime);
        run();

    },

    startCounter = function() {
            var numbers = document.querySelectorAll('.counter');

            if (numbersFinished === numbers.length) {
                window.removeEventListener('scroll', startCounter, false);
            }

            for (var b = 0; b < numbers.length; b++) {
                if (isScrolledIntoView(numbers[b]) && !numbers[b].classList.contains('finished')) {
                    animateValue(numbers[b], 0, numbers[b].getAttribute('count-to'), 2000);
                    numbers[b].classList.add('finished');
                    numbersFinished += 1;
                }
            }
    },

    init = function () {
        window.addEventListener('scroll', startCounter, false);
        startCounter();
    };

    init();
};





mobileMenu();
ascendingNumbers();
popups();


/*! https://github.com/callmecavs/jump.js
*   http://codepen.io/SitePoint/pen/YqewzZ
* */


initSmoothScrolling();

function initSmoothScrolling() {
    // if (isCssSmoothSCrollSupported()) {
    //     document.getElementById('css-support-msg').className = 'supported';
    //     return;
    // }

    var duration = 400;

    var pageUrl = location.hash ?
        stripHash(location.href) :
        location.href;

    delegatedLinkHijacking();
    //directLinkHijacking();

    function delegatedLinkHijacking() {
        document.body.addEventListener('click', onClick, false);

        function onClick(e) {
            if (!isInPageLink(e.target))
                return;

            e.stopPropagation();
            e.preventDefault();

            jump(e.target.hash, {
                duration: duration,
                callback: function() {
                    setFocus(e.target.hash);
                }
            });
        }
    }

    function directLinkHijacking() {
        [].slice.call(document.querySelectorAll('a'))
            .filter(isInPageLink)
            .forEach(function(a) {
                a.addEventListener('click', onClick, false);
            });

        function onClick(e) {
            e.stopPropagation();
            e.preventDefault();

            jump(e.target.hash, {
                duration: duration,
            });
        }

    }

    function isInPageLink(n) {
        return n.tagName.toLowerCase() === 'a' &&
            n.hash.length > 0 &&
            stripHash(n.href) === pageUrl;
    }

    function stripHash(url) {
        return url.slice(0, url.lastIndexOf('#'));
    }

    function isCssSmoothSCrollSupported() {
        return 'scrollBehavior' in document.documentElement.style;
    }

    // Adapted from:
    // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
    function setFocus(hash) {
        var element = document.getElementById(hash.substring(1));

        if (element) {
            if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                element.tabIndex = -1;
            }

            element.focus();
        }
    }

}

function jump(target, options) {
    var
        start = window.pageYOffset,
        opt = {
            duration: options.duration,
            offset: options.offset || 0,
            callback: options.callback,
            easing: options.easing || easeInOutQuad
        },
        distance = typeof target === 'string' ?
            opt.offset + document.querySelector(target).getBoundingClientRect().top :
            target,
        duration = typeof opt.duration === 'function' ?
            opt.duration(distance) :
            opt.duration,
        timeStart, timeElapsed;

    requestAnimationFrame(function(time) {
        timeStart = time;
        loop(time);
    });

    function loop(time) {
        timeElapsed = time - timeStart;

        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

        if (timeElapsed < duration)
            requestAnimationFrame(loop)
        else
            end();
    }

    function end() {
        window.scrollTo(0, start + distance);

        if (typeof opt.callback === 'function')
            opt.callback();
    }

    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
    }

}
}(window.bethel = window.bethel || {}, window, document));

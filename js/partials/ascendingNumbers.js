var ascendingNumbers = function () {

    var isScrolledIntoView = function(el) {
        var percentVisible = 0.3;
        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;
        var elemHeight = el.getBoundingClientRect().height;
        var overhang = elemHeight * (1 - percentVisible);

        var isVisible = (elemTop >= -overhang) && (elemBottom <= window.innerHeight + overhang);
        return isVisible;
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
            obj.innerHTML = value;
            if (value === end) {
                clearInterval(timer);
            }
        };

        timer = setInterval(run, stepTime);
        run();

    },

    startCounter = function() {
        if (isScrolledIntoView(document.getElementById('numbers'))) {
            var numbers = document.querySelectorAll('.counter');
            for (var b = 0; b < numbers.length; b++) {
                animateValue(numbers[b], 0, numbers[b].getAttribute('count-to'), 2000);
            }
            window.removeEventListener('scroll', startCounter, false);
        }
    },

    init = function () {
        window.addEventListener('scroll', startCounter, false);
        startCounter();
    };

    init();
};





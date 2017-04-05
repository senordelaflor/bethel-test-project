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
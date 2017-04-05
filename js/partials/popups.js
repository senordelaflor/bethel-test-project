var popups = function() {

    var popupEl = document.getElementById('popups'),
        youtubeEl = document.getElementById('popup__video'),

    isClickOutsidePopup = function(e) {
        var popup = document.getElementById('popup'),
            findIfClickIsInsidePopup = bethel.findClosest(e.target, popup);
        if (findIfClickIsInsidePopup === null){
            popupEl.classList.add('hide');
            popupEl.classList.remove('popup--visible');
            popupEl.removeEventListener('click', isClickOutsidePopup);
        }
    },

    openPopup = function(e) {
        e.preventDefault();

        popupEl.classList.remove('hide');
        popupEl.classList.add('popup--visible');
        bethel.loadYoutubeAsync(youtubeEl, e.target.href);
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
bethel.loadYoutubeAsync = function (el, youtubeLink){
    var iframe = document.createElement('iframe');

    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('src', youtubeLink);

    el.textContent = '';
    el.appendChild(iframe);
};
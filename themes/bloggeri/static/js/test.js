document.addEventListener('DOMContentLoaded', function() {
var colorThief = new ColorThief();
$('.cover-front').each(function() {
    var thumb = $(this);
    thumb.find('img').each(function() {
        thisColor = colorThief.getColor(this);
        thumb.parent().find('.cover').css({
            background: 'rgb('+ thisColor +')'
         })
    });
});
$('html').css({
            background: 'rgb('+ thisColor +')'
         });
var bg = 'rgb('+ thisColor +')'
var bg_url = document.querySelector("img").src;
document.querySelector(".cover-video").style.backgroundImage = "url('" + bg_url + "')";
document.querySelector(".cover").style.backgroundImage = "linear-gradient(-180deg,#1b1d1e8c 500px," + bg + "," + bg + " 100%),url('" + bg_url + "')";
document.querySelector(".cover").style.backgroundPosition = "center";
document.querySelector(".cover").style.backgroundSize = "cover";
});

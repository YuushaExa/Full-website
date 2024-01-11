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
document.querySelector(".cover").style.backgroundImage = "url('" + bg_url + "')center/cover";
});

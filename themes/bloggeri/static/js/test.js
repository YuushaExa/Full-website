setTimeout(function () {
document.addEventListener('DOMContentLoaded', function() {
var colorThief = new ColorThief();
$('.cover-front').each(function() {
    var thumb = $(this);
    thumb.find('img').each(function() {
        thisColor = colorThief.getColor(this);
        thumb.parent().find('.cover').css({
         })
    });
});
$('html').css({
         });
var bg = 'rgb('+ thisColor +')'

var bg_url = document.querySelector("img").src;
document.querySelector(".cover").style.backgroundImage = `linear-gradient(to top, rgb(22, 24, 28) 0, rgb(22 24 28 / 10%) 60%), url('${bg_url}')`;    
document.querySelector(".cover").style.backgroundPosition = "center";
document.querySelector(".cover").style.backgroundSize = "cover";
});
}, 1000)

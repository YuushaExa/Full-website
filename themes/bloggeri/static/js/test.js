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
var bg1 = 'rgb('+ thisColor +', 0.1)'
var bg_url = document.querySelector("img").src;
document.querySelector(".cover").style.backgroundImage = `linear-gradient(to top, ${bg} 0, ${bg1} 60%), url('${bg_url}')`;    
document.querySelector(".cover").style.backgroundPosition = "center";
document.querySelector(".cover").style.backgroundSize = "cover";
});

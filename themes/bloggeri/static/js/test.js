setTimeout(function () {
var colorThief = new ColorThief();
$('.cover-front').each(function() {
    var thumb = $(this);
    thumb.find('img:eq(2)').each(function() {
        thisColor = colorThief.getColor(this);
        thumb.parent().find('.cover').css({
         })
    });
});
$('html').css({
         });
// var bg = 'rgb('+ thisColor +')'

var images = Array.from(document.querySelectorAll("img"));
var randomIndex = Math.floor(Math.random() * images.length);
var bg_url = images[randomIndex];
document.querySelector(".cover").style.backgroundImage = `linear-gradient(to top, rgb(22, 24, 28) 0, rgb(22 24 28 / 10%) 60%), url('${bg_url}')`;    
document.querySelector(".cover").style.backgroundPosition = "center";
document.querySelector(".cover").style.backgroundSize = "cover";
}, 1000)

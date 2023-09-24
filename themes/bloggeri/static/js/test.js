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
var bg_url = document.querySelector("img").src.split('&w')[0];
document.querySelector(".cover").style.backgroundImage = "linear-gradient(-180deg, #1b1d1e8c 0, 'rgb('" + thisColor + "')' 100%),url('" + bg_url + "')";

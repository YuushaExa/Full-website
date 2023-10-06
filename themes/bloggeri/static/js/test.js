var colorThief = new ColorThief();
var coverFrontElements = document.querySelectorAll('.cover-front');
coverFrontElements.forEach(function(coverFront) {
    var thumb = coverFront;
    var imgElements = thumb.querySelectorAll('img');
    imgElements.forEach(function(img) {
        var thisColor = colorThief.getColor(img);
        var coverElement = thumb.parentElement.querySelector('.cover');
        coverElement.style.background = 'rgb(' + thisColor.join(',') + ')';
    });
});
document.querySelector('html').style.background = 'rgb(' + thisColor.join(',') + ')';

var bg = 'rgb('+ thisColor +')'
var bg_url = document.querySelector("img").src.split('&w')[0];
document.querySelector(".cover").style.backgroundImage = "linear-gradient(-180deg,#1b1d1e8c 0," + bg + "," + bg + " 100%),url('" + bg_url + "')";

var colorThief = new ColorThief();
var coverFrontElements = document.querySelectorAll('.cover-front');
coverFrontElements.forEach(function(coverFront) {
    var thumb = coverFront;
    var imgElements = thumb.querySelectorAll('img');
    
    // Get the first image element
    var firstImg = imgElements[0];
    
    // Attach a load event listener to the first image
    firstImg.addEventListener('load', function() {
        var thisColor = colorThief.getColor(firstImg);
        var coverElement = thumb.parentElement.querySelector('.cover');
        coverElement.style.background = 'rgb(' + thisColor.join(',') + ')';
        document.querySelector('html').style.background = 'rgb(' + thisColor.join(',') + ')';
    });
});

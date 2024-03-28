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
var randomImage, randomImageUrl;
var bg_url; // Declare bg_url variable

// Check if the image URL returns a 404 error
function checkImageAvailability(imageUrl) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = function() {
      // Image exists
      resolve(imageUrl);
    };
    img.onerror = function() {
      // Image doesn't exist
      reject();
    };
    img.src = imageUrl;
  });
}

// Select a random image URL that is available
function getRandomImageUrl() {
  var randomIndex = Math.floor(Math.random() * images.length);
  randomImage = images[randomIndex];
  randomImageUrl = randomImage.src;

  return checkImageAvailability(randomImageUrl)
    .then(function(validImageUrl) {
      bg_url = validImageUrl;
      // Use the valid random image URL (bg_url) in your code
    })
    .catch(function() {
      // Retry with another random image URL
      return getRandomImageUrl();
    });
}

// Start the process
getRandomImageUrl();
    
document.querySelector(".cover").style.backgroundImage = "linear-gradient(to top, rgb(22, 24, 28) 0, rgb(22 24 28 / 10%) 60%), url('" + bg_url + "')";
document.querySelector(".cover").style.backgroundPosition = "center";
document.querySelector(".cover").style.backgroundSize = "cover";
}, 1000)

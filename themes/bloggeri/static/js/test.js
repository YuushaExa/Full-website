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

var images = Array.from(document.querySelectorAll(".screenshots1 img"));
var bg_url; // Declare bg_url variable
var MAX_RETRY_ATTEMPTS = 5;
var retryAttempts = 0;

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

// Modify the image URL if necessary
function modifyImageUrl(imageUrl) {
  var regex = /https:\/\/wsrv.nl\/\?url=(.*?)&/; // Regular expression to match the format
  var match = imageUrl.match(regex);
  if (match && match.length > 1) {
    return match[1]; // Return the extracted URL
  }
  return imageUrl; // Return the original URL if no match found
}

// Select a random image URL that is available
function getRandomImageUrl() {
  var randomIndex = Math.floor(Math.random() * images.length);
  var randomImage = images[randomIndex];
  var randomImageUrl = randomImage.src;
  randomImageUrl = modifyImageUrl(randomImageUrl); // Modify the image URL if necessary
  return checkImageAvailability(randomImageUrl)
    .then(function(validImageUrl) {
      bg_url = validImageUrl;
      // Use the valid random image URL (bg_url) in your code
    })
    .catch(function() {
      if (retryAttempts < MAX_RETRY_ATTEMPTS) {
        retryAttempts++;
        return getRandomImageUrl();
      } else {
        // Handle the case when the maximum retry attempts are reached
        console.log("Max retry attempts reached. Unable to find a valid image.");
      }
    });
}

// Start the process
getRandomImageUrl().then(function() {
  document.querySelector(".cover").style.backgroundImage = `linear-gradient(to top, rgb(22, 24, 28) 0, rgb(22 24 28 / 10%) 60%), url('${bg_url}')`;
});
    document.querySelector(".cover").style.backgroundPosition = "center";
document.querySelector(".cover").style.backgroundSize = "cover";
}, 1000)

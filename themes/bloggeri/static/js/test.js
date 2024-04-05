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
  var screenshots1Elements = document.getElementsByClassName("screenshots1");

  var screenshots1Images = Array.from(screenshots1Elements).map(function(element) {
    var src = element.src;
    // Check if the source URL contains the unwanted part
    var unwantedPartIndex = src.indexOf("https://wsrv.nl/?url=");
    if (unwantedPartIndex !== -1) {
      // Extract the desired part of the URL
      src = src.substring(unwantedPartIndex + "https://wsrv.nl/?url=".length).split("&amp;")[0];
    }
    return src;
  });

  if (screenshots1Images.length > 0) {
    var randomIndex = Math.floor(Math.random() * screenshots1Images.length);
    var randomImageUrl = screenshots1Images[randomIndex];

    return checkImageAvailability(randomImageUrl)
      .then(function(validImageUrl) {
        bg_url = validImageUrl;
        // Use the valid random image URL (bg_url) in your code
      })
      .catch(function() {
        // Retry with another random image URL
        return getRandomImageUrl();
      });
  } else {
    // No images found in elements with class "screenshots1"
    // Search for other sources or handle the case accordingly
    return Promise.reject("No images found");
  }
}

// Start the process
getRandomImageUrl();
    
getRandomImageUrl().then(function() {
  document.querySelector(".cover").style.backgroundImage = `linear-gradient(to top, rgb(22, 24, 28) 0, rgb(22 24 28 / 10%) 60%), url('${bg_url}')`;
});
    document.querySelector(".cover").style.backgroundPosition = "center";
document.querySelector(".cover").style.backgroundSize = "cover";
}, 1000)

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

const screenshots = document.getElementsByClassName("screenshots1");

// Create an array to store the image URLs
const bg_url = [];

// Loop through each element and extract the image URLs
for (let i = 0; i < screenshots.length; i++) {
  const screenshot = screenshots[i];

  // Check if the element is an image
  if (screenshot.tagName === "IMG") {
    const imageUrl = screenshot.src;
    bg_url.push(imageUrl);
  }
}

// Function to generate a random index
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

// Get a random image URL from bg_url array
const randomImageUrl = bg_url[getRandomIndex(bg_url)];
    
  document.querySelector(".cover").style.backgroundImage = `linear-gradient(to top, rgb(22, 24, 28) 0, rgb(22 24 28 / 10%) 60%), url('${randomImageUrl}')`;
    document.querySelector(".cover").style.backgroundPosition = "center";
document.querySelector(".cover").style.backgroundSize = "cover";
}, 1000)

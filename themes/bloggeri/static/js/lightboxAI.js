var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var totalImages = galleryImages.length;
var openedImageCounter = document.getElementById('opened-image-counter');
var totalImageCounter = document.getElementById('total-image-counter');
updateCounters();
 
function updateCounters() {
  openedImageCounter.textContent = Math.min(currentIndex + 1, totalImages);
  totalImageCounter.textContent = totalImages;
}
 
galleryImages.forEach(function(image) {
  var imgLink = image.getAttribute('data-src').split('&w')[0] + "&w=1920&fit=inside&we";
  var link = document.createElement('a');
  link.href = imgLink;
  link.setAttribute('data-fancybox', 'gallery');
  image.parentNode.insertBefore(link, image);
  link.appendChild(image);
});

var gallery = document.querySelector('.gallery');

// Get the lightbox-content element
var lightboxContent = document.querySelector('.thumbnails-container');

// Check if both elements exist
if (gallery && lightboxContent) {
  // Get all the child nodes of the gallery element
  var galleryContent = gallery.innerHTML;

  // Append the gallery content to the lightbox-content element
  lightboxContent.innerHTML += galleryContent;

}

const links = document.querySelectorAll('.thumbnails-container img');
links.forEach((link) => {
  const dataSrc = link.getAttribute('data-src');
  link.setAttribute('src', dataSrc);
  link.removeAttribute('data-src');
});

const links1 = document.querySelectorAll('.thumbnails-container a');
links1.forEach((link1) => {
 link1.removeAttribute('data-fancybox');
});


var lightboxImages = document.querySelectorAll('a[data-fancybox="gallery"]');

// Attach click event listener to each image
lightboxImages.forEach(function(image, index) {
  image.addEventListener('click', function(event) {
    event.preventDefault();
    currentIndex = index;
    openLightbox(image.href);
  });
});


$('.thumbnails-container img').click(function(event) {
event.preventDefault();
var thumbnailSrc = $(this).attr('src');
var newSrc = thumbnailSrc.replace('&w=200&h=150&fit=cover&a=attention', '&w=1920&fit=inside&we');
$('.lightbox-content img').attr('src', newSrc);
});

function openLightbox(imageSrc) {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
 
var loadingText = document.getElementById('loading-text');
 
  lightboxImg.style.display = 'none'; // Hide the image initially
 
  var loadingTimeout = setTimeout(function() {
    loadingText.style.display = 'block'; // Show the loading text
  }, 1000);
 
  // Add a load event listener to the image
  lightboxImg.addEventListener('load', function() {
    clearTimeout(loadingTimeout); // Cancel the loading text timeout
    lightboxImg.style.display = 'block'; // Show the image
    loadingText.style.display = 'none'; // Hide the loading text
  });
 
  lightboxImg.src = imageSrc;
  lightbox.classList.remove('hidden');
document.body.classList.add('lightbox-open');
  document.documentElement.style.overflow = 'hidden';
  updateCounters();

   preloadTimeout = setTimeout(function() {
    var nextIndex = (currentIndex + 1) % lightboxImages.length;
    var nextImage = new Image();
    nextImage.src = lightboxImages[nextIndex].href;
  }, 1000);
}
 
function nextSlide() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
 const element123 = document.querySelector('#lightbox-img');
  var loadingText = document.getElementById('loading-text');
  lightboxImg.style.transform = 'translateX(-70vw)';

   preloadTimeout = setTimeout(function() {
    var nextIndex = (currentIndex + 1) % lightboxImages.length;
    var nextImage = new Image();
    nextImage.src = lightboxImages[nextIndex].href;
  }, 1000);
 
  var loadingTimeout = setTimeout(function() {
    loadingText.style.display = 'block'; // Show the loading text
  }, 1000);
 
  // Add a load event listener to the image
  lightboxImg.addEventListener('load', function() {
    clearTimeout(loadingTimeout); // Cancel the loading text timeout
    lightboxImg.style.transform = 'none'; // Show the image
   element123.style.animation = 'slideAnimation 1s forwards';
    loadingText.style.display = 'none'; // Hide the loading text
  });
 
  lightboxImg.src = lightboxImages[currentIndex].href;
   updateCounters();
}
 
function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
 
  var loadingText = document.getElementById('loading-text');
 
  lightboxImg.style.display = 'none'; // Hide the image initially
 
  var loadingTimeout = setTimeout(function() {
    loadingText.style.display = 'block'; // Show the loading text
  }, 1000);
 
  // Add a load event listener to the image
  lightboxImg.addEventListener('load', function() {
    clearTimeout(loadingTimeout); // Cancel the loading text timeout
    lightboxImg.style.display = 'block'; // Show the image
    loadingText.style.display = 'none'; // Hide the loading text
  });
 
  lightboxImg.src = lightboxImages[currentIndex].href;
   updateCounters();
}
 
function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  document.body.classList.remove('lightbox-open');
  document.documentElement.style.overflow = 'auto';
}
 
document.addEventListener('wheel', function(event) {
  if (!lightbox.classList.contains('hidden')) {
    if (event.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
});


let pixelated = false;
let saturated = false;
const lightboxImage = document.getElementById('lightbox-img');
const increaseScaleButton = document.getElementById('increaseScaleButton');
const resetScaleButton = document.getElementById('resetScaleButton');

let scale = 1.0;
const maxScale = 3.0; // Maximum allowed scale value

function increaseScale() {
  if (scale < maxScale) {
    scale += 1.0;
    lightboxImage.style.transform = `scale(${scale})`;
  }
}

function resetScale() {
  scale = 1.0;
  lightboxImage.style.transform = `scale(${scale})`;
}

increaseScaleButton.addEventListener('click', increaseScale);
resetScaleButton.addEventListener('click', resetScale);

function togglePixelated() {
  pixelated = !pixelated;
  lightboxImage.style.imageRendering = pixelated ? 'pixelated' : 'auto';
  const pixelatedButton = document.getElementById('pixelatedButton');
  pixelatedButton.classList.toggle('active');
}
function toggleSaturated() {
  saturated = !saturated;
  lightboxImage.style.filter = saturated ? 'saturate(2)' : 'none';
  const saturatedButton = document.getElementById('saturatedButton');
  saturatedButton.classList.toggle('active');
}
 
window.addEventListener('keydown', function(event) {
  if (lightbox && !lightbox.classList.contains('hidden')) {
    if (event.key === 'ArrowRight') {
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      prevSlide();
    }
  }
});
 
var touchStartX = 0;
var touchEndX = 0;
var touchStartY = 0;
var touchEndY = 0;

document.addEventListener('touchstart', function(event) {
  touchStartY = event.touches[0].clientY;
  touchStartX = event.touches[0].clientX;
});

document.addEventListener('touchend', function(event) {
  touchEndY = event.changedTouches[0].clientY;
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe(event.target);
});

function handleSwipe(target) {
  var swipeThreshold = 50; // Adjust this value as needed
  var deltaX = touchEndX - touchStartX;
  var deltaY = touchEndY - touchStartY;

  if (target.tagName === 'BUTTON') {
    // Check if the touch event originated from a button
    return; // Do nothing and exit the function
  }

  if (deltaY > swipeThreshold) {
    closeLightbox();
  } else if (deltaY < -swipeThreshold) {
    closeLightbox();
  }

  if (deltaX > swipeThreshold) {
    prevSlide();
  } else if (deltaX < -swipeThreshold) {
    nextSlide();
  }
}

const container = document.querySelector(".thumbnails-container");
let isDragging = false;
let startX;
let scrollLeft;

container.addEventListener("mousedown", startDrag);
container.addEventListener("touchstart", startDrag);

container.addEventListener("mouseleave", stopDrag);
container.addEventListener("mouseup", stopDrag);
container.addEventListener("touchend", stopDrag);

container.addEventListener("mousemove", drag);
container.addEventListener("touchmove", drag);

function startDrag(event) {
  isDragging = true;
  container.classList.add("dragging");

  if (event.type === "mousedown") {
    startX = event.pageX - container.offsetLeft;
  } else if (event.type === "touchstart") {
    startX = event.touches[0].pageX - container.offsetLeft;
  }

  scrollLeft = container.scrollLeft;
}

function stopDrag() {
  isDragging = false;
  container.classList.remove("dragging");
}

function drag(event) {
  if (!isDragging) return;
  event.preventDefault();

  let x;
  if (event.type === "mousemove") {
    x = event.pageX - container.offsetLeft;
  } else if (event.type === "touchmove") {
    x = event.touches[0].pageX - container.offsetLeft;
  }

  const walk = (x - startX) * 2; // Adjust dragging speed here
  container.scrollLeft = scrollLeft - walk;
}

// plugins

    function openImageInNewWindow() {
      var image = document.querySelector('.lightbox-content img');
      var src = image.getAttribute('src');
      var newSrc = src.split('?w=')[0]; // Remove everything after 'w='

      // Open the new window with the modified image URL
      window.open(newSrc);
    }

    // Attach click event listener to the button
    var openButton = document.getElementById('openImageButton');
    openButton.addEventListener('click', openImageInNewWindow);

$('#fullimagebtn').on('click', function (e) {
    $(".lightbox-content img").each(function () {
        var src = $(this).attr("src");
        var newLink = src.substring(0, src.indexOf("w=") + 2);
        $(this).attr("src", newLink);
    });
});


function toggleButtons() {
  var button1 = document.getElementById("fullimagebtn");
  var button2 = document.getElementById("button2");
  var toggleText = document.getElementById("toggleText");

  button1.classList.toggle("visible");
  button1.classList.toggle("hidden");

  button2.classList.toggle("visible");
  button2.classList.toggle("hidden");

  toggleText.textContent = toggleText.textContent === "Toggle Open" ? "Toggle Close" : "Toggle Open";
}

    // Function to toggle the display of the thumbnails container
function toggleThumbnails() {
    const thumbnailsContainer = document.querySelector('.thumbnails-container');
    const isVisible = thumbnailsContainer.style.display !== 'none';
    thumbnailsContainer.style.display = isVisible ? 'none' : 'flex';

    // Save the state in storage
    localStorage.setItem('thumbnailsVisible', thumbnailsContainer.style.display);
}

// Get the initial state from storage or default to 'none'
const initialState = localStorage.getItem('thumbnailsVisible') || 'none';

// Set the initial state
const thumbnailsContainer = document.querySelector('.thumbnails-container');
thumbnailsContainer.style.display = initialState;

// Add event listener to the toggle button
const toggleBtn = document.getElementById('toggleBtn');
toggleBtn.addEventListener('click', toggleThumbnails);

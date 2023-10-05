var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var totalImages = galleryImages.length;
var openedImageCounter = document.getElementById('opened-image-counter');
var totalImageCounter = document.getElementById('total-image-counter');
updateCounters();
 
function updateCounters() {
  openedImageCounter.textContent = currentIndex + 1;
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
 lightboxContent.classList.replace('lazyloading', 'lazyloaded');
  lightboxContent.innerHTML += galleryContent;

}

var lightboxImages = document.querySelectorAll('a[data-fancybox="gallery"]');

// Attach click event listener to each image
lightboxImages.forEach(function(image, index) {
  image.addEventListener('click', function(event) {
    event.preventDefault();
    currentIndex = index;
    openLightbox(image.href);
  });
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
}
 
function nextSlide() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
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
let scale = 1.0;
const lightboxImage = document.getElementById('lightbox-img');
const scaleSlider = document.getElementById('scaleSlider');
const scaleLabel = document.getElementById('scaleLabel');
const sliderContainer = document.getElementById('sliderContainer');
const openSliderButton = document.getElementById('openSliderButton');

function updateScale(value) {
  scale = value * 0.2;
  lightboxImage.style.transform = `scale(${scale})`;
  scaleLabel.textContent = scale.toFixed(1);
}

function resetScale() {
  scale = 1.0;
  scaleSlider.value = 5;
  lightboxImage.style.transform = `scale(${scale})`;
  scaleLabel.textContent = scale.toFixed(1);
}
function openSlider() {
  sliderContainer.classList.toggle('hidden');
}

scaleSlider.addEventListener('input', function() {
  updateScale(scaleSlider.value);
});

function toggleSlider() {
   const openSliderButton = document.getElementById('openSliderButton');
  openSliderButton.classList.toggle('active');
  sliderContainer.classList.toggle('hidden');
  
  if (sliderContainer.classList.contains('hidden')) {
    openSliderButton.textContent = 'Open Slider';
  } else {
    openSliderButton.textContent = 'Close Slider';
  }
}

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
});
 
document.addEventListener('touchend', function(event) {
  touchEndY = event.changedTouches[0].clientY;
  handleSwipe();
});
 
document.addEventListener('touchstart', function(event) {
  touchStartX = event.touches[0].clientX;
});
 
document.addEventListener('touchend', function(event) {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
});
 
function handleSwipe() {
  var swipeThreshold = 50; // Adjust this value as needed
  var deltaX = touchEndX - touchStartX;
  var deltaY = touchEndY - touchStartY;
 
  if (deltaY > swipeThreshold) {
    closeLightbox();
  } else if (deltaY < -swipeThreshold) {
    closeLightbox()
  }
 
  if (deltaX > swipeThreshold) {
    prevSlide();
  } else if (deltaX < -swipeThreshold) {
    nextSlide();
  }
}

// Retrieve the .thumbnails-container element
const thumbnailsContainer = document.querySelector('.thumbnails-container');

// Variables to store the initial position and mouse/touch offsets
let initialX = 0;
let offsetX = 0;

// Function to handle the start of the dragging action
function handleDragStart(event) {
  event.preventDefault();
  initialX = event.clientX || event.touches[0].clientX;
  thumbnailsContainer.classList.add('grabbing');

  // Attach event listeners for tracking movement
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('touchmove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchend', handleDragEnd);
}

// Function to handle the movement during dragging
function handleDragMove(event) {
  event.preventDefault();
  const currentX = event.clientX || event.touches[0].clientX;
  offsetX = currentX - initialX;

  // Update the position of .thumbnails-container
  thumbnailsContainer.style.transform = `translateX(${offsetX}px)`;
}

// Function to handle the end of the dragging action
function handleDragEnd() {
  thumbnailsContainer.classList.remove('grabbing');

  // Remove event listeners for tracking movement
  document.removeEventListener('mousemove', handleDragMove);
  document.removeEventListener('touchmove', handleDragMove);
  document.removeEventListener('mouseup', handleDragEnd);
  document.removeEventListener('touchend', handleDragEnd);

  // Start the loop animation
  startLoopAnimation();
}

// Function to animate the loop movement
function startLoopAnimation() {
  const containerWidth = thumbnailsContainer.offsetWidth;
  const loopDuration = 3000; // Duration of each loop in milliseconds
  const distance = 100; // Distance to move in each loop

  let currentPosition = 0;
  let direction = 1; // 1 for moving to the right, -1 for moving to the left

  function animateLoop() {
    currentPosition += direction * distance;
    thumbnailsContainer.style.transform = `translateX(${currentPosition}px)`;

    if (currentPosition >= containerWidth - thumbnailsContainer.offsetWidth) {
      direction = -1; // Change direction to move left
    } else if (currentPosition <= 0) {
      direction = 1; // Change direction to move right
    }

    setTimeout(animateLoop, loopDuration);
  }

  // Start the animation loop
  animateLoop();
}

// Attach the drag event listener to .thumbnails-container
thumbnailsContainer.addEventListener('mousedown', handleDragStart);
thumbnailsContainer.addEventListener('touchstart', handleDragStart);

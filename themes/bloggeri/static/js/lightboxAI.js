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
 
var lightboxImages = document.querySelectorAll('a[data-fancybox="gallery"]');
var thumbnailsContainers = document.querySelectorAll('.thumbnails-container a');

// Attach click event listener to each image
lightboxImages.forEach(function(image, index) {
  image.addEventListener('click', function(event) {
    event.preventDefault();
    currentIndex = index;
    openLightbox(image.href);
  });
});

thumbnailsContainers.forEach(function(image, index) {
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
    event.preventDefault();
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

// Get the gallery element
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

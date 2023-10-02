var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var lightboxImages = [];
galleryImages.forEach(function(image) {
  var imgLink = image.getAttribute('data-src').split('&w')[0] + "&w=1920&fit=inside&we";
  var link = document.createElement('a');
  link.href = imgLink;
  link.setAttribute('data-fancybox', 'gallery');
  image.parentNode.insertBefore(link, image);
  link.appendChild(image);
  lightboxImages.push(link);
});
lightboxImages.forEach(function(image, index) {
  image.addEventListener('click', function(event) {
    event.preventDefault();
    currentIndex = index;
    openLightbox(image.href);
  });
});

function loadImage(imageSrc, callback) {
  var image = new Image();
  image.onload = function() {
    callback(null, image);
  };
  image.onerror = function() {
    callback(new Error('Failed to load image'));
  };
  image.src = imageSrc;
}


function openLightbox(imageSrc) {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
    var loadingText = document.getElementById('loading-text');
  var isImageLoaded = false;

// Show loading text
  loadingText.style.display = 'block';

  // Hide image until loaded
  lightboxImg.style.display = 'none';
  
 loadImage(imageSrc, function(error, image) {
    if (error) {
      console.error(error);
      return;
    }
       // Hide loading text
    loadingText.style.display = 'none';

    // Show image
    lightboxImg.style.display = 'block';
  };
  
  lightbox.classList.remove('hidden');
   document.body.classList.add('lightbox-open');
  document.documentElement.style.overflow = 'hidden';
 setTimeout(function() {
    preloadNextPrevImages();
  }, 10000);
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('wheel', handleMouseWheel, { passive: true });
  }
  
}
function preloadNextPrevImages() {
  var nextIndex = (currentIndex + 1) % lightboxImages.length;
  var nextImg = new Image();
  nextImg.src = lightboxImages[nextIndex].href;
}
function nextSlide() {
  setTimeout(function() {
    currentIndex = (currentIndex + 1) % lightboxImages.length;
    var lightboxImg = document.getElementById('lightbox-img');
    var loadingText = document.getElementById('loading-text');
    var isImageLoaded = false; // Flag to track if the current image has finished loading

    // Show loading text
    loadingText.style.display = 'block';
    // Hide image until loaded
    lightboxImg.style.display = 'none';

    // Set image source
    lightboxImg.src = lightboxImages[currentIndex].href;
    // Wait for image to load
    openLightbox(imageSrc);
    // Preload next/previous images
    setTimeout(function() {
      preloadNextPrevImages();
    }, 10000);
  }, 1000);
}

function prevSlide() {
  // Disable next/prev buttons while loading
  document.querySelector('.next').disabled = true;
  document.querySelector('.prev').disabled = true;

  setTimeout(function() {
    currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    var lightboxImg = document.getElementById('lightbox-img');
    var loadingText = document.getElementById('loading-text');
    var isImageLoaded = false; // Flag to track if the current image has finished loading

    // Show loading text
    loadingText.style.display = 'block';
    // Hide image until loaded
    lightboxImg.style.display = 'none';

    // Set image source
    lightboxImg.src = lightboxImages[currentIndex].href;
    // Wait for image to load
 openLightbox(imageSrc);

    // Preload next/previous images
    setTimeout(function() {
      preloadNextPrevImages();
    }, 10000);
  }, 1000);
}

window.addEventListener('keydown', function(event) {
  var lightbox = document.getElementById('lightbox');
  if (lightbox && lightbox.classList.contains('hidden') === false) {
    if (event.key === 'ArrowRight') {
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      prevSlide();
    }
  }
});
function handleMouseWheel(event) {
  var lightbox = document.getElementById('lightbox');
  if (lightbox && lightbox.classList.contains('hidden') === false) {
    var delta = event.deltaY || event.detail || (-event.wheelDelta);
    if (delta > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}
function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  document.documentElement.style.overflow = 'auto';
  document.body.classList.remove('lightbox-open');
}

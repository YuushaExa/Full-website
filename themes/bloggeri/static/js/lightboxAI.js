var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var lightboxImages = [];
var isLoadingImage = false; // Flag to track if an image is currently being loaded

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

function openLightbox(imageSrc) {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var loadingText = document.getElementById('loading-text');
  var isImageLoaded = false;

  if (isLoadingImage) {
    return; // Return early if an image is currently being loaded
  }

  isLoadingImage = true; // Set the flag to true when starting to load an image
  loadingText.style.display = 'block';
  lightboxImg.style.display = 'none';

  lightboxImg.src = imageSrc;
  lightboxImg.onload = function() {
    isImageLoaded = true;
    loadingText.style.display = 'none';
    lightboxImg.style.display = 'block';
    isLoadingImage = false; // Set the flag to false when the image has finished loading
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
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
  var loadingText = document.getElementById('loading-text');
  var isImageLoaded = false;

  if (isLoadingImage) {
    return; // Return early if an image is currently being loaded
  }

  isLoadingImage = true;
  loadingText.style.display = 'block';
  lightboxImg.style.display = 'none';
  lightboxImg.src = lightboxImages[currentIndex].href;
  lightboxImg.onload = function() {
    isImageLoaded = true;
    loadingText.style.display = 'none';
    lightboxImg.style.display = 'block';
    document.querySelector('.next').disabled = false;
    document.querySelector('.prev').disabled = false;
    isLoadingImage = false;
  };

  document.querySelector('.next').disabled = true;
  document.querySelector('.prev').disabled = true;
  setTimeout(function() {
    preloadNextPrevImages();
  }, 10000);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
  var loadingText = document.getElementById('loading-text');
  var isImageLoaded = false;

  if (isLoadingImage) {
    return; // Return early if an image is currently being loaded
  }

  isLoadingImage = true;
  loadingText.style.display = 'block';
  lightboxImg.style.display = 'none';
  lightboxImg.src = lightboxImages[currentIndex].href;
  lightboxImg.onload = function() {
    isImageLoaded = true;
    loadingText.style.display = 'none';
    lightboxImg.style.display = 'block';
    document.querySelector('.next').disabled = false;
    document.querySelector('.prev').disabled = false;
    isLoadingImage = false;
  };

  document.querySelector('.next').disabled = true;
  document.querySelector('.prev').disabled = true;
  setTimeout(function() {
    preloadNextPrevImages();
  }, 10000);
}

window.addEventListener('keydown', function(event) {
  var lightbox = document.getElementById('lightbox');
  if (lightbox && !lightbox.classList.contains('hidden')) {
    if (event.key === 'ArrowRight') {
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      prevSlide();
    }
  }
});

function handleMouseWheel(event) {
  var lightbox = document.getElementById('lightbox');
  if (lightbox && !lightbox.classList.contains('hidden')) {
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

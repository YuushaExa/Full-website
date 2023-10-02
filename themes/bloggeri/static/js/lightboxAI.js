var galleryContainer = document.querySelector('.gallery');
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');
var loadingText = document.getElementById('loading-text');
var nextButton = document.querySelector('.next');
var prevButton = document.querySelector('.prev');
var currentIndex = 0;
var isLoadingImage = false;
var loadingTimeout;

galleryContainer.addEventListener('click', function(event) {
  var target = event.target;
  if (target.tagName === 'IMG' && target.parentNode.classList.contains('gallery')) {
    event.preventDefault();
    currentIndex = Array.from(target.parentNode.children).indexOf(target);
    openLightbox();
  }
});

function openLightbox() {
  if (isLoadingImage) {
    return;
  }

  isLoadingImage = true;
  loadingTimeout = setTimeout(function() {
    loadingText.style.display = 'block';
  }, 300);

  lightboxImg.style.display = 'none';
  lightboxImg.src = lightboxImages[currentIndex].href;
  lightbox.classList.toggle('hidden');
  document.body.classList.add('lightbox-open');
  document.documentElement.style.overflow = 'hidden';

  lightboxImg.onload = function() {
    clearTimeout(loadingTimeout);
    loadingText.style.display = 'none';
    lightboxImg.style.display = 'block';
    isLoadingImage = false;
    preloadNextPrevImages();
  };
}

function preloadNextPrevImages() {
  var nextIndex = (currentIndex + 1) % lightboxImages.length;
  var prevIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;

  setTimeout(function() {
    var nextImg = new Image();
    nextImg.src = lightboxImages[nextIndex].href;

    var prevImg = new Image();
    prevImg.src = lightboxImages[prevIndex].href;
  }, 300);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  updateLightboxImage();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  if (isLoadingImage) {
    return;
  }

  isLoadingImage = true;

  loadingTimeout = setTimeout(function() {
    loadingText.style.display = 'block';
  }, 300);

  lightboxImg.style.display = 'none';
  lightboxImg.src = lightboxImages[currentIndex].href;

  lightboxImg.onload = function() {
    clearTimeout(loadingTimeout);
    loadingText.style.display = 'none';
    lightboxImg.style.display = 'block';
    isLoadingImage = false;
    preloadNextPrevImages();
  };
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

window.addEventListener('keydown', function(event) {
  if (!lightbox.classList.contains('hidden')) {
    if (event.key === 'ArrowRight') {
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      prevSlide();
    }
  }
});

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

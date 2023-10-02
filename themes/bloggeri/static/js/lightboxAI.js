var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var lightboxImages = [];
var isLoadingImage = false;
var loadingTimeout;

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
    return;
  }

  isLoadingImage = true;
  loadingTimeout = setTimeout(function() {
    loadingText.style.display = 'block';
  }, 300);

  lightboxImg.style.display = 'none';

  lightboxImg.src = imageSrc;
  lightboxImg.onload = function() {
    isImageLoaded = true;
    clearTimeout(loadingTimeout);
    loadingText.style.display = 'none';
    lightboxImg.style.display = 'block';
    isLoadingImage = false;
    preloadNextPrevImages(); // Preload next/previous images after the current image has loaded
  };

  lightbox.classList.remove('hidden');
  document.body.classList.add('lightbox-open');
  document.documentElement.style.overflow = 'hidden';
}

function preloadNextPrevImages() {
  var nextIndex = (currentIndex + 1) % lightboxImages.length;
  var prevIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;

  var nextImg = new Image();
  nextImg.src = lightboxImages[nextIndex].href;

  var prevImg = new Image();
  prevImg.src = lightboxImages[prevIndex].href;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
  var loadingText = document.getElementById('loading-text');
  var isImageLoaded = false;

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
    isImageLoaded = true;
    clearTimeout(loadingTimeout);
    loadingText.style.display = 'none';
    lightboxImg.style.display = 'block';
    document.querySelector('.next').disabled = false;
    document.querySelector('.prev').disabled = false;
    isLoadingImage = false;
    preloadNextPrevImages();
  };

  document.querySelector('.next').disabled = true;
  document.querySelector('.prev').disabled = true;
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
  var loadingText = document.getElementById('loading-text');
  var isImageLoaded = false;

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
    isImageLoaded = true;
    clearTimeout(loadingTimeout);
    loadingText.style.display = 'none';
    lightboxImg.style.display = 'block';
    document.querySelector('.next').disabled = false;
    document.querySelector('.prev').disabled = false;
    isLoadingImage = false;
    preloadNextPrevImages();
  };

  document.querySelector('.next').disabled = true;
  document.querySelector('.prev').disabled = true;
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

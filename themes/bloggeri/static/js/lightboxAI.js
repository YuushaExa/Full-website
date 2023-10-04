var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var totalImages = galleryImages.length;
var openedImageCounter = document.getElementById('opened-image-counter');
var totalImageCounter = document.getElementById('total-image-counter');
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');
var loadingText = document.getElementById('loading-text');
var lightboxImages = document.querySelectorAll('a[data-fancybox="gallery"]');

updateCounters();

// Wrap each image with an <a> tag and set the data-fancybox attribute
galleryImages.forEach(function (image) {
  var imgLink = image.getAttribute('data-src').split('&w')[0] + '&w=1920&fit=inside&we';
  var link = document.createElement('a');
  link.href = imgLink;
  link.setAttribute('data-fancybox', 'gallery');
  image.parentNode.insertBefore(link, image);
  link.appendChild(image);
});

// Attach click event listener to the parent container using event delegation
document.addEventListener('click', function (event) {
  if (event.target && event.target.matches('a[data-fancybox="gallery"]')) {
    event.preventDefault();
    currentIndex = Array.prototype.indexOf.call(lightboxImages, event.target);
    openLightbox(event.target.href);
  }
});

function updateCounters() {
  openedImageCounter.textContent = currentIndex + 1;
  totalImageCounter.textContent = totalImages;
}

function openLightbox(imageSrc) {
  lightboxImg.style.display = 'none'; // Hide the image initially
  loadingText.style.display = 'block'; // Show the loading text

  lightboxImg.onload = function () {
    lightboxImg.style.display = 'block'; // Show the image
    loadingText.style.display = 'none'; // Hide the loading text
  };

  lightboxImg.src = imageSrc;
  lightbox.classList.remove('hidden');
  document.body.classList.add('lightbox-open');
  document.documentElement.style.overflow = 'hidden';
  updateCounters();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  lightboxImg.style.display = 'none'; // Hide the image initially
  loadingText.style.display = 'block'; // Show the loading text

  lightboxImg.onload = function () {
    lightboxImg.style.display = 'block'; // Show the image
    loadingText.style.display = 'none'; // Hide the loading text
  };

  lightboxImg.src = lightboxImages[currentIndex].href;
  updateCounters();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  lightboxImg.style.display = 'none'; // Hide the image initially
  loadingText.style.display = 'block'; // Show the loading text

  lightboxImg.onload = function () {
    lightboxImg.style.display = 'block'; // Show the image
    loadingText.style.display = 'none'; // Hide the loading text
  };

  lightboxImg.src = lightboxImages[currentIndex].href;
  updateCounters();
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.classList.remove('lightbox-open');
  document.documentElement.style.overflow = 'auto';
}

document.addEventListener('wheel', function (event) {
  if (!lightbox.classList.contains('hidden')) {
    event.preventDefault();
    if (event.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
});

window.addEventListener('keydown', function (event) {
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
  var touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

document.addEventListener('touchend', function(event) {
  var touch = event.changedTouches[0];
  touchEndX = touch.clientX;
  touchEndY = touch.clientY;
  handleSwipe();
});

function handleSwipe() {
  var swipeThreshold = 50; // Adjust this value as needed
  var deltaX = touchEndX - touchStartX;
  var deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaY) > swipeThreshold) {
    closeLightbox();
  }

  if (Math.abs(deltaX) > swipeThreshold) {
    if (deltaX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
}

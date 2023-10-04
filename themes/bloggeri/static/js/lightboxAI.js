var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var totalImages = galleryImages.length;
var openedImageCounter = document.getElementById('opened-image-counter');
var totalImageCounter = document.getElementById('total-image-counter');
var thumbnailsContainer = document.getElementById('thumbnails-container');
updateCounters();

function updateCounters() {
  openedImageCounter.textContent = currentIndex + 1;
  totalImageCounter.textContent = totalImages;
}

// Wrap each image with an <a> tag and set the data-fancybox attribute
galleryImages.forEach(function (image) {
  var imgLink = image.getAttribute('data-src').split('&w')[0] + '&w=1920&fit=inside&we';
  var link = document.createElement('a');
  link.href = imgLink;
  link.setAttribute('data-fancybox', 'gallery');
  image.parentNode.insertBefore(link, image);
  link.appendChild(image);

  // Create thumbnail image
  var thumbnail = document.createElement('img');
  thumbnail.src = image.getAttribute('src');
  thumbnail.alt = image.getAttribute('alt');
  thumbnail.addEventListener('click', function () {
    currentIndex = Array.from(thumbnailsContainer.children).indexOf(this);
    openLightbox(link.href);
  });
  thumbnailsContainer.appendChild(thumbnail);
});

var lightboxImages = document.querySelectorAll('a[data-fancybox="gallery"]');

// Attach click event listener to each image
lightboxImages.forEach(function (image, index) {
  image.addEventListener('click', function (event) {
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

  var loadingTimeout = setTimeout(function () {
    loadingText.style.display = 'block'; // Show the loading text
  }, 1000);

  // Add a load event listener to the image
  lightboxImg.addEventListener('load', function () {
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

  var loadingTimeout = setTimeout(function () {
    loadingText.style.display = 'block'; // Show the loading text
  }, 1000);

  // Add a load event listener to the image
  lightboxImg.addEventListener('load', function () {
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

  var loadingTimeout = setTimeout(function () {
    loadingText.style.display = 'block'; // Show the loading text
  }, 1000);

  // Add a load event listener to the image
  lightboxImg.addEventListener('load', function () {
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
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    nextSlide();
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    prevSlide();
  } else if (event.key === 'Escape') {
    closeLightbox();
  }
});

var touchStartX = 0;
var touchStartY = 0;
var touchEndX = 0;
var touchEndY = 0;

document.addEventListener('touchstart', function (event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function (event) {
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;
  handleSwipe();
});

function handleSwipe() {
  var deltaX = touchEndX - touchStartX;
  var deltaY = touchEndY - touchStartY;
  var swipeThreshold = 50;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  } else {
    if (Math.abs(deltaY) > swipeThreshold) {
      if (deltaY > 0) {
        closeLightbox();
      }
    }
  }
}

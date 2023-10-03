// Variable declarations
var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var totalImages = galleryImages.length;
var openedImageCounter = document.getElementById('opened-image-counter');
var totalImageCounter = document.getElementById('total-image-counter');
var lightboxImages = document.querySelectorAll('[data-fancybox="gallery"]');

// Function to update image counters
function updateCounters() {
  openedImageCounter.textContent = currentIndex + 1;
  totalImageCounter.textContent = totalImages;
}

// Gallery setup
galleryImages.forEach(function (image) {
  var link = document.createElement('a');
  link.href = image.getAttribute('data-src') + '?w=1200&h=800&fit=crop'; // Example of image manipulation using query parameters
  image.parentNode.insertBefore(link, image);
  link.appendChild(image);
});

// Lightbox setup
lightboxImages.forEach(function (image) {
  image.addEventListener('click', function (e) {
    e.preventDefault();
    currentIndex = Array.from(lightboxImages).indexOf(image);
    openLightbox(image.href);
  });
});

// Function to update the loading bar
function updateLoadingBar(progress, loadedKB, totalKB) {
  var loadingBar = document.getElementById('loading-bar');
  var loadingProgress = document.getElementById('loading-progress');
  
  loadingBar.style.width = progress + '%';
  loadingProgress.textContent = loadedKB + ' KB / ' + totalKB + ' KB';
}

// Function to open the lightbox
function openLightbox(imageSrc) {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var loadingText = document.getElementById('loading-text');
  
  lightbox.style.display = 'flex';
  document.body.classList.add('lightbox-open');
  
  lightboxImg.style.display = 'none'; // Hide the image initially
  loadingText.style.display = 'block'; // Show the loading text
  
  var xhr = new XMLHttpRequest();
  xhr.open('GET', imageSrc, true);
  xhr.responseType = 'blob';

  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      var loadedKB = Math.round(event.loaded / 1024); // Convert bytes to KB
      var totalKB = Math.round(event.total / 1024); // Convert bytes to KB
      var progress = (event.loaded / event.total) * 100;
      updateLoadingBar(progress, loadedKB, totalKB);
    }
  };

  xhr.onload = function(event) {
    if (xhr.status === 200) {
      var imageUrl = URL.createObjectURL(xhr.response);
      lightboxImg.src = imageUrl;
      lightboxImg.style.display = 'block'; // Show the image
      loadingText.style.display = 'none'; // Hide the loading text
      updateLoadingBar(100, 0, 0); // Update loading bar to 100% when the image is fully loaded
    }
  };

  xhr.send();
  
  updateCounters();
}

// Function to navigate to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  openLightbox(lightboxImages[currentIndex].href);
}

// Function to navigate to the previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  openLightbox(lightboxImages[currentIndex].href);
}

// Function to close the lightbox
function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.body.classList.remove('lightbox-open');
  document.documentElement.style.overflow = 'auto';
}

// Event listeners

// Mouse wheel event listener
window.addEventListener('wheel', function (e) {
  if (document.body.classList.contains('lightbox-open')) {
    e.preventDefault();
    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
});

// Keyboard event listener
window.addEventListener('keydown', function (e) {
  if (document.body.classList.contains('lightbox-open')) {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  }
});

// Touch event listeners
var touchstartX = 0;
var touchendX = 0;

window.addEventListener('touchstart', function (e) {
  touchstartX = e.touches[0].clientX;
});

window.addEventListener('touchend', function (e) {
  touchendX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  if (document.body.classList.contains('lightbox-open')) {
    if (touchendX < touchstartX){
      nextSlide();
    } else if (touchendX > touchstartX) {
      prevSlide();
    }
  }
}

// Lightbox close button event listener
var closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', closeLightbox);

// Lightbox next button event listener
var nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', nextSlide);

// Lightbox previous button event listener
var prevBtn = document.getElementById('prev-btn');
prevBtn.addEventListener('click', prevSlide);

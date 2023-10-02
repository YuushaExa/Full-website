var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var currentImageIndex = 0;
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

function openLightbox(imageSrc) {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = imageSrc;
  lightbox.classList.remove('hidden');
   document.body.classList.add('lightbox-open');
  document.documentElement.style.overflow = 'hidden';
 setTimeout(function() {
    preloadNextPrevImages();
  }, 1000);
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('wheel', handleMouseWheel, { passive: true });
  }
  var totalImages = lightboxImages.length;

  // Update the total number of images display
  var totalImagesElement = document.getElementById('total-images');
  totalImagesElement.textContent = totalImages;

  // ...existing code...

  // Assign numbers to each image
  lightboxImages.forEach(function(image, index) {
    image.setAttribute('data-image-number', index + 1);
    image.addEventListener('click', function() {
      showImageNumber(index + 1);
    });
  });
  
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
  lightboxImg.src = lightboxImages[currentIndex].href;
  preloadNextPrevImages();
    currentImageIndex = (currentImageIndex + 1) % lightboxImages.length; // Update the current image index

  // Call the updateImageNumber function
  updateImageNumber(currentImageIndex);

}

function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = lightboxImages[currentIndex].href;
  preloadNextPrevImages();
    currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length; // Update the current image index

  // Call the updateImageNumber function
  updateImageNumber(currentImageIndex);
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
    event.preventDefault();
  }
}

function showImageNumber(imageNumber) {
  // Get the current image number element
  var currentImageNumberElement = document.getElementById('current-image-number');

  // Update the current image number display
  currentImageNumberElement.textContent = imageNumber;
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  document.documentElement.style.overflow = 'auto';
  document.body.classList.remove('lightbox-open');
}

var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var lightboxImages = [];

galleryImages.forEach(function(image) {
  var imgLink = image.getAttribute('data-src').split('&w')[0];
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
  preloadNextPrevImages();
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
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = lightboxImages[currentIndex].href;
  preloadNextPrevImages();
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  document.documentElement.style.overflow = 'auto';
  document.body.classList.remove('lightbox-open');
}

window.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    nextSlide();
  } else if (event.key === 'ArrowLeft') {
    prevSlide();
  }
});

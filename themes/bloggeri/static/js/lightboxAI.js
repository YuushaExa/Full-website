var gallery = document.querySelector('.gallery');
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');
var lightboxImages = [];

gallery.addEventListener('click', function(event) {
  if (event.target.matches('img')) {
    var imgLink = event.target.getAttribute('data-src').split('&w')[0];
    var link = document.createElement('a');
    link.href = imgLink;
    link.setAttribute('data-fancybox', 'gallery');
    link.appendChild(event.target.cloneNode());

    lightboxImages.push(link);
    currentIndex = lightboxImages.length - 1;
    openLightbox(link.href);
    event.preventDefault();
  }
});

function openLightbox(imageSrc) {
  lightboxImg.src = imageSrc;
  lightbox.classList.remove('hidden');
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
  lightboxImg.src = lightboxImages[currentIndex].href;
  preloadNextPrevImages();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentIndex].href;
  preloadNextPrevImages();
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.documentElement.style.overflow = 'auto';
}

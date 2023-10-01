var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;

// Wrap each image with an <a> tag and set the data-fancybox attribute
galleryImages.forEach(function(image) {
  var imgLink = image.getAttribute('data-src').split('&w')[0];
  var link = document.createElement('a');
  link.href = imgLink;
  link.setAttribute('data-fancybox', 'gallery');
  image.parentNode.insertBefore(link, image);
  link.appendChild(image);
});

var lightboxImages = document.querySelectorAll('a[data-fancybox="gallery"]');

// Attach click event listener to each image
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
  document.documentElement.style.overflow = 'hidden';
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = lightboxImages[currentIndex].href;
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = lightboxImages[currentIndex].href;
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  document.documentElement.style.overflow = 'auto';
}

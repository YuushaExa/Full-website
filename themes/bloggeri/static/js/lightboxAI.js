window.onload = function() {
  var galleryImages = document.querySelectorAll('.gallery img');

  // Attach click event listener to each image
  galleryImages.forEach(function(image) {
    image.addEventListener('click', function() {
      openLightbox(image.src);
    });
  });
};

function openLightbox(imageSrc) {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');

  // Set the image source
  lightboxImg.src = imageSrc;

  // Show the lightbox
  lightbox.classList.remove('hidden');

    document.documentElement.style.overflow = 'hidden';

};

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');

  // Hide the lightbox
  lightbox.classList.add('hidden');
    document.documentElement.style.overflow = 'auto';

};

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = images[currentIndex];
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = images[currentIndex];
}

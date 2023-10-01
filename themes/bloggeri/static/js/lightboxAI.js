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

}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');

  // Hide the lightbox
  lightbox.classList.add('hidden');
    document.documentElement.style.overflow = 'auto';

}

function openLightbox(imageSrc) {
  // ...

  // Add click event listener to the lightbox background
  var lightbox = document.getElementById('lightbox');
  lightbox.addEventListener('click', handleBackgroundClick);
}

function handleBackgroundClick(event) {
  // Check if the clicked element is the background
  if (event.target.id === 'lightbox') {
    closeLightbox();
  }
}

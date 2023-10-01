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
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');

  // Hide the lightbox
  lightbox.classList.add('hidden');
}

var startY = 0;

window.onload = function() {
  var galleryImages = document.querySelectorAll('.gallery img');
  var lightboxImg = document.getElementById('lightbox-img');

  // Attach click event listener to each image
  galleryImages.forEach(function(image) {
    image.addEventListener('click', function() {
      openLightbox(image.src);
    });
  });

  // Attach touchstart and touchmove event listeners to the lightbox image
  lightboxImg.addEventListener('touchstart', function(event) {
    startY = event.touches[0].clientY;
  });

  lightboxImg.addEventListener('touchmove', function(event) {
    var currentY = event.touches[0].clientY;

    if (currentY - startY > 50) {
      closeLightbox();
    }
  });
};

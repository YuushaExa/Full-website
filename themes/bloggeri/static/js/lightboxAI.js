window.onload = function() {
  var galleryImages = document.querySelectorAll('.gallery img');
  var currentIndex = 0;

  // Attach click event listener to each image
  galleryImages.forEach(function(image, index) {
    image.addEventListener('click', function() {
      currentIndex = index;
      openLightbox(image.src);
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
    currentIndex = (currentIndex + 1) % galleryImages.length;
    var lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[currentIndex].src;
  }

  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    document.documentElement.style.overflow = 'auto';
  }

  // Attach click event listener to the next button
  var nextButton = document.querySelector('.next');
  nextButton.addEventListener('click', function() {
    nextSlide();
  });

  // Attach click event listener to the close button
  var closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', function() {
    closeLightbox();
  });
};

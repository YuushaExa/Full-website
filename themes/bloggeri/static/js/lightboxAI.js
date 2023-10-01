   var galleryImages = document.querySelectorAll('.gallery img');
  var currentIndex = 0;
  var preloadedImages = [];

  // Attach click event listener to each image
  galleryImages.forEach(function(image, index) {
    image.addEventListener('click', function() {
      currentIndex = index;
      openLightbox(image.src);
    });
  });

  function preloadImage(index) {
    var image = new Image();
    image.src = galleryImages[index].src;
    preloadedImages.push(image);

     var image = document.getElementById('lightbox-img');
image.src = image.getAttribute('data-src');
image.removeAttribute('data-src');
  }

  function openLightbox(imageSrc) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.classList.remove('hidden');
    document.documentElement.style.overflow = 'hidden';

    preloadImage((currentIndex + 1) % galleryImages.length); // Preload next image
    preloadImage((currentIndex - 1 + galleryImages.length) % galleryImages.length); // Preload previous image
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    var lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[currentIndex].src;
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    var lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[currentIndex].src;
  }

  
  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    document.documentElement.style.overflow = 'auto';
  }

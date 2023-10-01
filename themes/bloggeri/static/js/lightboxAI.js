   var galleryImages = document.querySelectorAll('.gallery img');
  var currentIndex = 0;

  // Attach click event listener to each image
  galleryImages.forEach(function(image, index) {
    image.addEventListener('click', function() {
      currentIndex = index;
      openLightbox(image.src);
       $('.gallery img').attr("src", $(this).data('src'));
$('.gallery img').removeAttr('data-src');
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
lightboxImg.src = img.getAttribute("data-src");
 $('.gallery img').attr("src", $(this).data('src'));
$('.gallery img').removeAttr('data-src');
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    var lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[currentIndex].src;
$('.gallery img').attr("src", $(this).data('src'));
$('.gallery img').removeAttr('data-src');
  }

  
  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    document.documentElement.style.overflow = 'auto';
  }

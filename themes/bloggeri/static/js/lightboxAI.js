const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCloseBtn = document.getElementById('lightbox-close');
const lightboxNextBtn = document.getElementById('lightbox-next');
const lightboxPrevBtn = document.getElementById('lightbox-prev');

let currentIndex = 0;
const lightboxImages = [];

// Wrap each image with an <a> tag and set the data-fancybox attribute
galleryImages.forEach(function (image, index) {
  const imgLink = image.getAttribute('data-src').split('&w')[0] + '&w=1920&fit=inside&we';
  const link = document.createElement('a');
  link.href = imgLink;
  link.setAttribute('data-fancybox', 'gallery');
  link.appendChild(image);
  image.parentNode.insertBefore(link, image);
  lightboxImages.push(link);

  // Attach click event listener to each image
  link.addEventListener('click', function (event) {
    event.preventDefault();
    currentIndex = index;
    openLightbox(link.href);
  });
});

// Attach click event listeners to lightbox buttons
lightboxCloseBtn.addEventListener('click', closeLightbox);
lightboxNextBtn.addEventListener('click', nextSlide);
lightboxPrevBtn.addEventListener('click', prevSlide);

function openLightbox(imageSrc) {
  lightboxImg.src = imageSrc;
  lightbox.classList.remove('hidden');
  document.documentElement.style.overflow = 'hidden';
}

function switchSlide() {
  lightboxImg.src = lightboxImages[currentIndex].href;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  switchSlide();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  switchSlide();
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.documentElement.style.overflow = 'auto';
}

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

var startX = 0;
var startY = 0;
var currentX = 0;
var currentY = 0;
var isDragging = false;

window.onload = function() {
  var galleryImages = document.querySelectorAll('.gallery img');
  var lightboxImg = document.getElementById('lightbox-img');

  // Attach click event listener to each image
  galleryImages.forEach(function(image) {
    image.addEventListener('click', function() {
      openLightbox(image.src);
    });
  });

  // Attach touchstart, touchmove, touchend, mousedown, mousemove, and mouseup event listeners to the lightbox image
  lightboxImg.addEventListener('touchstart', handleStart, { passive: true });
  lightboxImg.addEventListener('touchmove', handleMove, { passive: true });
  lightboxImg.addEventListener('touchend', handleEnd, { passive: true });
  lightboxImg.addEventListener('mousedown', handleStart);
  lightboxImg.addEventListener('mousemove', handleMove);
  lightboxImg.addEventListener('mouseup', handleEnd);
};

function handleStart(event) {
  if (event.type === 'touchstart') {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  } else {
    startX = event.clientX;
    startY = event.clientY;
  }

  currentX = startX;
  currentY = startY;
  isDragging = true;
}

function handleMove(event) {
  if (!isDragging) return;

  event.preventDefault();

  if (event.type === 'touchmove') {
    currentX = event.touches[0].clientX;
    currentY = event.touches[0].clientY;
  } else {
    currentX = event.clientX;
    currentY = event.clientY;
  }

  var deltaX = currentX - startX;
  var deltaY = currentY - startY;

  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px)';
}

function handleEnd() {
  if (!isDragging) return;

  isDragging = false;

  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.style.transform = '';
}

// Rest of the code remains the same...


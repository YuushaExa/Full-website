var galleryImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var totalImages = galleryImages.length;
var openedImageCounter = document.getElementById('opened-image-counter');
var totalImageCounter = document.getElementById('total-image-counter');
updateCounters();
  var loadingBarC = document.getElementById('loading-bar-container');
var loadingText = document.getElementById('loading-text');
 
function updateCounters() {
  openedImageCounter.textContent = currentIndex + 1;
  totalImageCounter.textContent = totalImages;
}
 
galleryImages.forEach(function(image) {
  var imgLink = image.getAttribute('data-src').split('&w')[0] + "&w=1920&fit=inside&we";
  var link = document.createElement('a');
  link.href = imgLink;
  link.setAttribute('data-fancybox', 'gallery');
  image.parentNode.insertBefore(link, image);
  link.appendChild(image);
});
 
var lightboxImages = document.querySelectorAll('a[data-fancybox="gallery"]');
 
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
 
var loadingText = document.getElementById('loading-text');
 
 var loadingBar = document.getElementById('loading-bar');
  var loadingProgress = document.getElementById('loading-progress');
  var loadingBarC = document.getElementById('loading-bar-container');
 
  lightboxImg.style.display = 'none'; // Hide the image initially
  loadingBar.style.width = '0%'; // Reset the loading bar width
  loadingBarC.style.display = 'none'; // Show the loading bar
   loadingText.style.display = 'none'; // Hide the image initially
 
  var loadingTimeout = setTimeout(function() {
    loadingText.style.display = 'block'; // Show the loading text
  }, 1000);
 var loadingTimeout = setTimeout(function() {
    loadingBarC.style.display = 'block'; // Show the loading bar after 1 second
  }, 1000);
 
 
  var xhr = new XMLHttpRequest();
  xhr.open('GET', imageSrc, true);
  xhr.responseType = 'blob';
 
  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      var loadedKB = Math.round(event.loaded / 1024); // Convert bytes to KB
      var totalKB = Math.round(event.total / 1024); // Convert bytes to KB
      var progress = (event.loaded / event.total) * 100;
      loadingBar.style.width = progress + '%'; // Update the loading bar width based on the progress
      loadingProgress.textContent = loadedKB + ' KB / ' + totalKB + ' KB'; // Update the loading progress text
    }
  };
 
  xhr.onload = function(event) {
    if (xhr.status === 200) {
      loadingBar.style.width = '100%'; // Set the loading bar width to 100% when the image is fully loaded
      var imageUrl = URL.createObjectURL(xhr.response);
      lightboxImg.src = imageUrl;
      loadingProgress.textContent = ''; // Clear the loading progress text
      loadingBarC.style.display = 'none'; // Hide the loading bar
    }
  };
 
  xhr.send();
 
  // Add a load event listener to the image
  lightboxImg.addEventListener('load', function() {
    clearTimeout(loadingTimeout); // Cancel the loading text timeout
    lightboxImg.style.display = 'block'; // Show the image
    loadingText.style.display = 'none'; // Hide the loading text
  });
 
  lightboxImg.src = imageSrc;
  lightbox.classList.remove('hidden');
document.body.classList.add('lightbox-open');
  document.documentElement.style.overflow = 'hidden';
  updateCounters();
}
 
function updateLoadingBar(progress, loadedKB, totalKB) {
  var loadingBar = document.getElementById('loading-bar');
  var loadingProgress = document.getElementById('loading-progress');
    var loadingBarC = document.getElementById('loading-bar-container');
 
  loadingBar.style.width = progress + '%';
  loadingProgress.textContent = loadedKB + ' KB / ' + totalKB + ' KB';
}
 
function loadLightboxImage(imageSrc) {
  var lightboxImg = document.getElementById('lightbox-img');
  var loadingText = document.getElementById('loading-text');
  var loadingBar = document.getElementById('loading-bar');
  var loadingProgress = document.getElementById('loading-progress');
    var loadingBarC = document.getElementById('loading-bar-container');
 
  lightboxImg.style.display = 'none'; // Hide the image initially
 loadingBar.style.width = '0%'; // Reset the loading bar width
 
  var xhr = new XMLHttpRequest();
  xhr.open('GET', imageSrc, true);
  xhr.responseType = 'blob';
 
  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      var loadedKB = Math.round(event.loaded / 1024); // Convert bytes to KB
      var totalKB = Math.round(event.total / 1024); // Convert bytes to KB
      var progress = (event.loaded / event.total) * 100;
      updateLoadingBar(progress, loadedKB, totalKB);
    }
  };
 
  xhr.onload = function(event) {
    if (xhr.status === 200) {
      var imageUrl = URL.createObjectURL(xhr.response);
      lightboxImg.src = imageUrl;
           loadingText.style.display = 'none'; // Hide the loading text
      loadingBarC.style.display = 'none'; // Hide the loading bar
      updateLoadingBar(100, 0, 0); // Update loading bar to 100% when the image is fully loaded
    }
  };
 
  xhr.send();
}
 
function nextSlide() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
  var loadingText = document.getElementById('loading-text');
 
  lightboxImg.style.display = 'none'; // Hide the image initially
   loadingBarC.style.display = 'none'; // Show the loading bar
   loadingText.style.display = 'none'; // Hide the image initially
 
  var loadingTimeout = setTimeout(function() {
    loadingText.style.display = 'block'; // Show the loading text
  }, 1000);
  var loadingTimeout = setTimeout(function() {
    loadingBarC.style.display = 'block'; // Show the loading bar after 1 second
  }, 1000);
 
  lightboxImg.addEventListener('load', function() {
    clearTimeout(loadingTimeout); // Cancel the loading text timeout
    lightboxImg.style.display = 'block'; // Show the image
    loadingText.style.display = 'none'; // Hide the loading text
  });

  loadLightboxImage(lightboxImages[currentIndex].href);
  updateCounters();
}
 
function prevSlide() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  var lightboxImg = document.getElementById('lightbox-img');
  var loadingText = document.getElementById('loading-text');
 
  lightboxImg.style.display = 'none'; // Hide the image initially
   loadingBarC.style.display = 'none'; // Show the loading bar
   loadingText.style.display = 'none'; // Hide the image initially
 
  var loadingTimeout = setTimeout(function() {
    loadingText.style.display = 'block'; // Show the loading text
  }, 1000);
  var loadingTimeout = setTimeout(function() {
    loadingBarC.style.display = 'block'; // Show the loading bar after 1 second
  }, 1000);
 
  lightboxImg.addEventListener('load', function() {
    clearTimeout(loadingTimeout); // Cancel the loading text timeout
    lightboxImg.style.display = 'block'; // Show the image
    loadingText.style.display = 'none'; // Hide the loading text
  });

  loadLightboxImage(lightboxImages[currentIndex].href);  
  updateCounters();
}
 
function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  document.body.classList.remove('lightbox-open');
  document.documentElement.style.overflow = 'auto';
}
 
document.addEventListener('wheel', function(event) {
  if (!lightbox.classList.contains('hidden')) {
    if (event.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
});
 
window.addEventListener('keydown', function(event) {
  if (lightbox && !lightbox.classList.contains('hidden')) {
 
    if (event.key === 'ArrowRight') {
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      prevSlide();
    }
  }
});
 
var touchStartX = 0;
var touchEndX = 0;
var touchStartY = 0;
var touchEndY = 0;
 
document.addEventListener('touchstart', function(event) {
  touchStartY = event.touches[0].clientY;
});
 
document.addEventListener('touchend', function(event) {
  touchEndY = event.changedTouches[0].clientY;
  handleSwipe();
});
 
document.addEventListener('touchstart', function(event) {
  touchStartX = event.touches[0].clientX;
});
 
document.addEventListener('touchend', function(event) {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
});
 
function handleSwipe() {
  var swipeThreshold = 50; // Adjust this value as needed
  var deltaX = touchEndX - touchStartX;
  var deltaY = touchEndY - touchStartY;
 
  if (deltaY > swipeThreshold) {
    closeLightbox();
  } else if (deltaY < -swipeThreshold) {
    closeLightbox()
  }
 
  if (deltaX > swipeThreshold) {
    prevSlide();
  } else if (deltaX < -swipeThreshold) {
    nextSlide();
  }
}
 

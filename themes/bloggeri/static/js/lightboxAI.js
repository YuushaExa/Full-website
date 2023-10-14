// Slider variables
let currentIndex = 0;
const sliderImages = document.querySelectorAll('.gallery img');
const totalImages = sliderImages.length;

// Slider controls
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

// Update image counter
function updateCounter() {
  const counterElement = document.getElementById('image-counter');
  counterElement.textContent = `${currentIndex + 1}/${totalImages}`;
}

// Show current image
function showImage() {
  // Hide all images
  sliderImages.forEach(image => {
    image.style.display = 'none';
  });

  // Show current image
  sliderImages[currentIndex].style.display = 'block';

  // Update counter
  updateCounter();
}

// Show next image
function nextImage() {
  currentIndex++;
  if (currentIndex >= totalImages) {
    currentIndex = 0;
  }
  showImage();
}

// Show previous image
function prevImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = totalImages - 1;
  }
  showImage();
}

// Attach event listeners to controls
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// Show the initial image
showImage();

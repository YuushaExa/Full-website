var sliderImages = document.querySelectorAll('.gallery img');
var currentIndex = 0;
var totalImages = sliderImages.length;
var sliderContent = document.querySelector('.slider-content');
var prevButton = document.getElementById('prev-button');
var nextButton = document.getElementById('next-button');
var autoplayInterval;

updateSlider();

prevButton.addEventListener('click', function() {
  clearInterval(autoplayInterval);
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  updateSlider();
});

nextButton.addEventListener('click', function() {
  clearInterval(autoplayInterval);
  currentIndex = (currentIndex + 1) % totalImages;
  updateSlider();
});

function updateSlider() {
  sliderContent.innerHTML = '';
  sliderContent.appendChild(sliderImages[currentIndex].cloneNode(true));
  
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(function() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlider();
  }, 3000); // Change the autoplay interval (in milliseconds) as needed
}

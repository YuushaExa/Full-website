document.addEventListener("DOMContentLoaded", function() {
  const lightbox = document.querySelector(".lightbox");
  const slider = document.querySelector(".slider");
  const images = slider.querySelectorAll("img");
  let currentIndex = 0;

  function showSlide(index) {
    images[currentIndex].classList.remove("active");
    currentIndex = index;
    images[currentIndex].classList.add("active");
  }

  function nextSlide() {
    if (currentIndex === images.length - 1) {
      showSlide(0);
    } else {
      showSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex === 0) {
      showSlide(images.length - 1);
    } else {
      showSlide(currentIndex - 1);
    }
  }

  document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  });

  lightbox.addEventListener("click", function(e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  images.forEach(function(image, index) {
    image.addEventListener("click", function() {
      showSlide(index);
      lightbox.style.display = "flex";
    });
  });

  showSlide(currentIndex);
});

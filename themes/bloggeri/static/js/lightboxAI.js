document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const slider = sliderContainer.querySelector('.slider');
    const images = slider.querySelectorAll('img');
    const imageCount = images.length;
    let currentIndex = 0;

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    function openLightbox(index) {
        // Create a lightbox container element
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        // Create an image element for the enlarged image
        const lightboxImage = document.createElement('img');
        lightboxImage.src = images[index].src;
        lightboxImage.alt = images[index].alt;
        
        // Append the image to the lightbox container
        lightbox.appendChild(lightboxImage);
        
        // Append the lightbox container to the document body
        document.body.appendChild(lightbox);
    }

    function closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            // Remove the lightbox from the document body
            document.body.removeChild(lightbox);
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % imageCount;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + imageCount) % imageCount;
        showSlide(currentIndex);
    }

    sliderContainer.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const clickedIndex = Array.from(images).indexOf(event.target);
            openLightbox(clickedIndex);
        }
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('lightbox')) {
            closeLightbox();
        }
    });

    // Optional: Add buttons or other elements to control the slider manually
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', nextSlide);

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', prevSlide);

    const controlsContainer = document.createElement('div');
    controlsContainer.appendChild(prevButton);
    controlsContainer.appendChild(nextButton);

    sliderContainer.appendChild(controlsContainer);
});

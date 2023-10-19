let currentPageURL = 'https://yuushaexa.github.io/snes/';
let loadedCards = 0;

function fetchData(url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      // Extract the content you need from the response
      const parser = new DOMParser();
      const html = parser.parseFromString(data, 'text/html');
      const newCards = html.querySelectorAll('.card');

      // Update the current page URL with the next page URL
      currentPageURL = html.querySelector('.paginator-next-page')?.getAttribute('href');

      // Append the new cards to your existing content
      appendCardsToDOM(newCards);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function appendCardsToDOM(cards) {
  const contentContainer = document.getElementById('content');

  cards.forEach(card => {
    // Append the card to your existing content in the DOM
    contentContainer.appendChild(card);
    loadedCards++;

    // Stop loading if the desired number of cards is reached
    if (loadedCards === 50) {
      stopLoading();
    }
  });
}

function stopLoading() {
  window.removeEventListener('scroll', handleScroll);
}

function handleScroll() {
  // Check if the user has scrolled to the bottom of the page
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    // Make a GET request to the current page URL
    fetchData(currentPageURL);
  }
}

window.addEventListener('scroll', handleScroll);

// Initial data fetch
fetchData(currentPageURL);

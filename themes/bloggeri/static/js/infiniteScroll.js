let nextPageUrl = '.paginator-next-page';
let isLoading = false;
let page = 1;

async function fetchNextPage() {
  try {
    const response = await fetch(nextPageUrl);
    const data = await response.json();

    // Update the next page URL
    nextPageUrl = data.nextPageUrl;

    // Render the cards
    renderCards(data.cards);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading = false;
  }
}

function renderCards(cards) {
  const cardContainer = document.getElementById('card-container');

  cards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.textContent = card.title;

    cardContainer.appendChild(cardElement);
  });
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
    isLoading = true;
    fetchNextPage();
  }
});

fetchNextPage();

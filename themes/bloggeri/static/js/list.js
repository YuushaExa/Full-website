document.addEventListener('DOMContentLoaded', function() {
  function handleCardClick(sectionClass, storageKey) {
    var cardsContainers = document.querySelectorAll(sectionClass);
    var cardData = [];
 
    var storedData = localStorage.getItem(storageKey);
    if (storedData) {
      cardData = JSON.parse(storedData);
    }
 
    cardsContainers.forEach(function(cardsContainer) {
      cardsContainer.addEventListener('click', function(event) {
        var card = event.target.closest('.card');
        if (card) {
          var title = card.querySelector('.title').textContent;
          var image = card.querySelector('.card-image img').src;
          var strippedImage = decodeURIComponent(image.substring(image.indexOf('=') + 1, image.indexOf('&')));
          var href = card.querySelector('.card-image').href;
          var currentDate = new Date();
          var options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
          var formattedDate = currentDate.toLocaleDateString('en-US', options);
 
          var isDuplicate = cardData.some(function(item) {
            return item.title === title && item.image === strippedImage && item.href === href;
          });
 
          if (!isDuplicate) {
            var data = {
              "title": title,
              "image": strippedImage,
              "href": href,
              "dateAdded": formattedDate
            };
 
            cardData.push(data);
            var jsonData = JSON.stringify(cardData);
            localStorage.setItem(storageKey, jsonData);
          } else {
            // Remove the duplicate item from cardData array
            cardData = cardData.filter(function(item) {
              return !(item.title === title && item.image === strippedImage && item.href === href);
            });
            var jsonData = JSON.stringify(cardData);
            localStorage.setItem(storageKey, jsonData);
          }
        }
      });
    });
  }
 
  handleCardClick('.Playing', 'Playing');
  handleCardClick('.Backlog', 'Backlog');
  handleCardClick('.Completed', 'Completed'); 
  handleCardClick('.OnHold', 'OnHold');
  handleCardClick('.Dropped', 'Dropped');
  handleCardClick('.Wishlist', 'Wishlist');
});

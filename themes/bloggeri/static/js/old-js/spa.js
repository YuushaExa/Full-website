document.body.addEventListener("click", async function(event) {
  var target = event.target;
 var closestLink = target.closest(".navbar-start a, .navbar-brand a");
  if (closestLink) {
    event.preventDefault();

    try {
      const response = await fetch(closestLink.href);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const postTitle = doc.querySelector('main').innerHTML;

      const mainElement = document.querySelector('main');
      mainElement.innerHTML = postTitle;

      window.history.pushState({}, "", closestLink.href);

       var cardContainer = document.getElementById('cardContainer');
  if (cardContainer) {
    displaySavedCards();
 var toggleButtons = document.querySelectorAll('.toggleButton path');
toggleButtons.forEach(function(button) {
  button.style.fill = 'unset';
});
var toggleButtons1 = document.querySelectorAll('.toggleButtonSVG');
toggleButtons1.forEach(function(button1) {
  button1.style.fill = 'rgb(4 252 14 / 80%)';
});
  var totalCountfav = document.getElementById('totalCount-fav');
  if (totalCountfav) {
document.getElementById("totalCount-fav").textContent = "" + totalCount;
   updateCounter();
 }
   
  }

var toggleButton12 = document.querySelectorAll('.toggleButton');
  if (toggleButton12) {
    attachToggleListeners();
}

 tippy('.toggleButton', {
        content: (reference) => reference.getAttribute('aria-label'),
   delay: [1000, null],
      });
     
    } catch (error) {
      console.error('Error:', error);
    }
  }
});

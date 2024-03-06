let t,e;const n=new Set,o=document.createElement("link"),s=o.relList&&o.relList.supports&&o.relList.supports("prefetch")&&window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype,i="instantAllowQueryString"in document.body.dataset,r="instantAllowExternalLinks"in document.body.dataset,a="instantWhitelist"in document.body.dataset;let c=65,d=!1,l=!1,u=!1;if("instantIntensity"in document.body.dataset){const t=document.body.dataset.instantIntensity;if("mousedown"==t.substr(0,"mousedown".length))d=!0,"mousedown-only"==t&&(l=!0);else if("viewport"==t.substr(0,"viewport".length))navigator.connection&&(navigator.connection.saveData||navigator.connection.effectiveType.includes("2g"))||("viewport"==t?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(u=!0):"viewport-all"==t&&(u=!0));else{const e=parseInt(t);isNaN(e)||(c=e)}}if(s){const n={capture:!0,passive:!0};if(l||document.addEventListener("touchstart",function(t){e=performance.now();const n=t.target.closest("a");if(!f(n))return;h(n.href)},n),d?document.addEventListener("mousedown",function(t){const e=t.target.closest("a");if(!f(e))return;h(e.href)},n):document.addEventListener("mouseover",function(n){if(performance.now()-e<1100)return;const o=n.target.closest("a");if(!f(o))return;o.addEventListener("mouseout",m,{passive:!0}),t=setTimeout(()=>{h(o.href),t=void 0},c)},n),u){let t;(t=window.requestIdleCallback?t=>{requestIdleCallback(t,{timeout:1500})}:t=>{t()})(()=>{const t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const n=e.target;t.unobserve(n),h(n.href)}})});document.querySelectorAll("a").forEach(e=>{f(e)&&t.observe(e)})})}}function m(e){e.relatedTarget&&e.target.closest("a")==e.relatedTarget.closest("a")||t&&(clearTimeout(t),t=void 0)}function f(t){if(t&&t.href&&(!a||"instant"in t.dataset)&&(r||t.origin==location.origin||"instant"in t.dataset)&&["http:","https:"].includes(t.protocol)&&("http:"!=t.protocol||"https:"!=location.protocol)&&(i||!t.search||"instant"in t.dataset)&&!(t.hash&&t.pathname+t.search==location.pathname+location.search||"noInstant"in t.dataset))return!0}function h(t){if(n.has(t))return;const e=document.createElement("link");e.rel="prefetch",e.href=t,document.head.appendChild(e),n.add(t)}

//
function storedNotesDisplays() {
var storedNotes = localStorage.getItem("Notes");
if (storedNotes) {
var notesData = JSON.parse(storedNotes);
var cards = document.querySelectorAll('.card');
cards.forEach(function(card) {
var href = card.querySelector('.card-image').href;

if (notesData[href]) {
  var notesReadDiv = document.createElement('div');
  notesReadDiv.className = 'NotesRead';

  card.appendChild(notesReadDiv);

}
});
}
}
storedNotesDisplays() 
//

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('NotesRead')) {
    var storedNotes = localStorage.getItem('Notes');
    if (storedNotes) {
      var notesData = JSON.parse(storedNotes);
      
      var card = event.target.closest('.card');
      var href = card.querySelector('.card-image').href;
      
      if (notesData[href]) {
        var notesReadOpenLetterDiv = document.createElement('div');
        notesReadOpenLetterDiv.id = 'notesROL';
        document.body.appendChild(notesReadOpenLetterDiv);
        
        var notesReadOpenDiv = document.createElement('div');
        notesReadOpenDiv.id = 'NotesReadOpen';
        notesReadOpenDiv.textContent = notesData[href];
        notesReadOpenLetterDiv.appendChild(notesReadOpenDiv);

          var notesCloseDiv = document.createElement('div');
        notesCloseDiv.id = 'notesCloseDiv';
        notesCloseDiv.textContent = 'Close';
        notesReadOpenLetterDiv.appendChild(notesCloseDiv);
      }
    }
  }
});

//
//
function updateRatingDisplays() {
  // Retrieve existing rating data from localStorage
  var existingRatingJSON = localStorage.getItem('Stars');
  var existingRatingData = existingRatingJSON ? JSON.parse(existingRatingJSON) : [];
  // Loop through each card element
  var cards = document.getElementsByClassName('card');
  for (var j = 0; j < cards.length; j++) {
    var card = cards[j];
    // Get the href value from the card image
    var href = card.querySelector('.card-image').href;
    // Check if the href value already exists in the existingRatingData array
    var existingRating = existingRatingData.find(function(item) {
      return item.href === href;
    });
    // Update the rating display with the current rating
    var ratingDisplay = card.querySelector('.rating-menu2');
ratingDisplay.textContent = '★' + (existingRating ? existingRating.rating : "Not rated");
  }
}
// Call the updateRatingDisplays function initially to set the initial ratings
updateRatingDisplays();
//
const addButtons = document.querySelectorAll(".AddList");

// Loop through each button
addButtons.forEach(function (addButton) {
  // Add a click event listener to the button
  addButton.addEventListener("click", function () {
    // Create the list menu and its items
    const listMenu = document.createElement("ul");
    listMenu.className = "List-Menu";

    const playingItem = document.createElement("li");
    playingItem.className = "Playing";
    playingItem.textContent = "Playing";
    listMenu.appendChild(playingItem);

    const completedItem = document.createElement("li");
    completedItem.className = "Completed";
    completedItem.textContent = "Completed";
    listMenu.appendChild(completedItem);

    const onHoldItem = document.createElement("li");
    onHoldItem.className = "OnHold";
    onHoldItem.textContent = "On Hold";
    listMenu.appendChild(onHoldItem);

    const droppedItem = document.createElement("li");
    droppedItem.className = "Dropped";
    droppedItem.textContent = "Dropped";
    listMenu.appendChild(droppedItem);

    const backlogItem = document.createElement("li");
    backlogItem.className = "Backlog";
    backlogItem.textContent = "Backlog";
    listMenu.appendChild(backlogItem);

    const wishlistItem = document.createElement("li");
    wishlistItem.className = "Wishlist";
    wishlistItem.textContent = "Wishlist";
    listMenu.appendChild(wishlistItem);

    // Get the closest '.card' element to the clicked button
    const card = addButton.closest('.card');

    // Append the created list menu and the closest '.card' element to the Listcontainer
    const Listcontainer = document.createElement("div");
    Listcontainer.id = "Listcontainer"; 
    const cardClone = card.cloneNode(true);
    cardClone.appendChild(listMenu);
    Listcontainer.appendChild(cardClone);
    document.body.appendChild(Listcontainer);

var div = document.createElement('div');
div.className = 'rating';

for (var i = 5; i >= 1; i--) {
  var rating = document.createElement('span');
  rating.className = 'star';
  rating.setAttribute('data-rating', i);
  rating.textContent = '★';
  div.appendChild(rating);
}

cardClone.appendChild(div);

var rating1 = document.createElement("div");
rating1.setAttribute("id", "rating-menu1");
rating.appendChild(rating1);

const noteDiv = document.createElement("div");
noteDiv.id = "Note";
noteDiv.textContent = "Click here to toggle the text window";
const textWindowDiv = document.createElement("div");
textWindowDiv.id = "textWindow";
textWindowDiv.className = "text-window";
const textarea = document.createElement("textarea");
const saveButton = document.createElement("button");
saveButton.className = "SaveNote";
saveButton.textContent = "Save";
textWindowDiv.appendChild(textarea);
textWindowDiv.appendChild(saveButton);
cardClone.appendChild(noteDiv);
cardClone.appendChild(textWindowDiv);

  });
});


// played 
$(document).on('click', '.AddList', function(event) {
  var stars = document.querySelectorAll('.star');

stars.forEach(function(star) {
star.addEventListener('click', function() {
var clickedRating = parseInt(this.getAttribute('data-rating'));

// Remove yellow class from all stars
stars.forEach(function(star) {
  star.classList.remove('yellow');
});

// Add yellow class to stars up to the clicked rating
for (var i = 1; i <= clickedRating; i++) {
  var star = document.querySelector('.star[data-rating="' + i + '"]');
  if (star) {
    star.classList.add('yellow');
  }
}
});
});

  //
  // firrebase


const trackedLocalStorage = {
  setItem(key, value) {
    localStorage.setItem(key, value);
const wishlist = JSON.parse(localStorage.getItem(key));
    // Log the last added item
    const lastAddedItem = wishlist[wishlist.length - 1];
    console.log("Last added item:", lastAddedItem);

 async function updateFile() {
  const owner = 'YuushaExa';
  const repo = 'v';
  const branch = 'master';
  const directory = 'dev/json/favfiles';
  const filename = 'activity';

  // Check if the file already exists
  const checkFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${directory}/${filename}.json`;
  const checkFileResponse = await fetch(checkFileUrl);

  if (checkFileResponse.ok) {
    const checkFileData = await checkFileResponse.json();

    if (checkFileData.length > 0) {
      // File exists, update it
      const fileSha = checkFileData[0].sha;

      const updateFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${directory}/${filename}.json`;

      const response = await fetch(updateFileUrl, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update existing file',
          content: btoa(JSON.stringify(lastAddedItem)),
          branch: branch,
          sha: fileSha
        })
      });

      if (response.ok) {
        console.log('File updated successfully.');
      } else {
        console.log('Error updating file:', response.status);
      }
    } else {
      // File doesn't exist, create it
      const createFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${directory}/${filename}.json`;

      const response = await fetch(createFileUrl, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Create new file',
          content: btoa(JSON.stringify(lastAddedItem)),
          branch: branch
        })
      });

      if (response.ok) {
        console.log('File created successfully.');
      } else {
        console.log('Error creating file:', response.status);
      }
    }
  } else {
    console.log('Error checking file existence:', checkFileResponse.status);
  }
}

// Call the async function
updateFile();
  },
  removeItem(key) {
    // Log the deleted key
    console.log(`Deleted key: ${key}`);

    // Delete the key from local storage
    localStorage.removeItem(key);
  },
  clear() {
    // Log the cleared local storage
    console.log('Cleared local storage');

    // Clear the local storage
    localStorage.clear();
  }
};


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
          trackedLocalStorage.setItem(storageKey, jsonData);
        } else {
          // Remove the duplicate item from cardData array
          cardData = cardData.filter(function(item) {
            return !(item.title === title && item.image === strippedImage && item.href === href);
          });
          var jsonData = JSON.stringify(cardData);
          trackedLocalStorage.setItem(storageKey, jsonData);
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
  
// rating
// Function to handle star click event
function handleStarClick(event) {
  var star = event.target;
  var rating = star.getAttribute('data-rating');
    var card = event.target.closest('.card');
  var href = card.querySelector('.card-image').href;
  var existingRatingJSON = localStorage.getItem("Stars");
  var existingRatingData = existingRatingJSON ? JSON.parse(existingRatingJSON) : [];
  var existingRatingIndex = existingRatingData.findIndex(function(item) {
    return item.href === href;
  });
  
  if (rating === "0") {
    if (existingRatingIndex !== -1) {
      existingRatingData.splice(existingRatingIndex, 1);
    }
  } else {
    if (existingRatingIndex !== -1) {
      existingRatingData[existingRatingIndex].rating = rating;
    } else {
      var ratingData = {
        href: href,
        rating: rating
      };
    
      existingRatingData.push(ratingData);
    }
  }

  var updatedRatingJSON = JSON.stringify(existingRatingData);

  localStorage.setItem("Stars", updatedRatingJSON);
  var ratingDisplay = document.getElementById('rating-menu1');
  ratingDisplay.textContent = "" + (rating !== "0" ? rating : "Not rated");

  updateRatingDisplays()  
}
  
var stars = document.querySelectorAll('.star');
stars.forEach(function(star) {
  star.addEventListener('click', handleStarClick);
});
  
  // rating over
  //
var ratingDisplay = document.getElementById('rating-menu1');

var existingRatingJSON = localStorage.getItem("Stars");
var existingRatingData = existingRatingJSON ? JSON.parse(existingRatingJSON) : [];

var card = event.target.closest('.card');
var href = card.querySelector('.card-image').href;

var existingRating = existingRatingData.find(function(item) {
  return item.href === href;
});

ratingDisplay.textContent = "" + (existingRating ? existingRating.rating : "Not rated");
//

function updateStarColors() {
var ratingMenu = document.getElementById("rating-menu1");
var rating = parseInt(ratingMenu.innerText);
var stars = document.querySelectorAll(".star");
for (var i = 0; i < stars.length; i++) {
var starRating = parseInt(stars[i].getAttribute("data-rating"));
if (starRating <= rating) {
stars[i].classList.add("yellow");
} else {
stars[i].classList.remove("yellow");
}
}
}
updateStarColors();
  //

  // Notes
      var textWindow = document.getElementById("textWindow");
        var note = document.getElementById("Note");
        var saveButton = document.querySelector(".SaveNote");

var textArea = document.querySelector("#textWindow textarea");
var savedNotes = JSON.parse(localStorage.getItem("Notes")) || {};
var currentCardHref = card.querySelector('.card-image').href;
var savedNoteText = savedNotes[currentCardHref];
textArea.value = savedNoteText || ""; 
  
        note.addEventListener("click", function() {
            if (textWindow.style.display === "none") {
                textWindow.style.display = "block";
            } else {
                textWindow.style.display = "none";
            }
        });

        saveButton.addEventListener("click", function(event) {
            var card = event.target.closest('.card');
            var href = card.querySelector('.card-image').href;
            var textArea = textWindow.querySelector("textarea");
            var noteText = textArea.value;

            // Save data to localStorage
            var notes = JSON.parse(localStorage.getItem("Notes")) || {};
            notes[href] = noteText;
            localStorage.setItem("Notes", JSON.stringify(notes));
          
            storedNotesDisplays() 
        });

  //
});  
// test



$(document).on("click", "#Listcontainer", function(event) {
  var modal2 = document.getElementById("Listcontainer");
  if (event.target == modal2) {
    var divElement = document.getElementById("Listcontainer");
divElement.parentNode.removeChild(divElement);
  }
});

// history

document.addEventListener('DOMContentLoaded', function() {
var cardsContainer = document.querySelector('.content');
var cardData = [];
// Retrieve previously stored data from local storage
var storedData = localStorage.getItem('History');
if (storedData) {
cardData = JSON.parse(storedData);
}
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
// Check if the card already exists in cardData
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
localStorage.setItem('History', jsonData);
updateHistory();
}
}
});
});

// history count

function updateHistory() {
  var historyCountContainer = document.getElementById('HistoryCount');
  var storedData = localStorage.getItem('History');
  if (storedData) {
    var cardData = JSON.parse(storedData);
    var count = cardData.length;
  historyCountContainer.textContent = count;
  }
}
updateHistory();

// something else

 tippy('.toggleButton', {
        content: (reference) => reference.getAttribute('aria-label'),
   delay: [1000, null],
      });
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;

  // Get the current active tab
  var currentActive = document.getElementsByClassName("active")[0];

  // Check if the clicked tab is already active
  if (currentActive === evt.currentTarget) {
    // Remove the "active" class from the clicked tab
    evt.currentTarget.classList.remove("active");
    
    // Hide the corresponding content
    document.getElementById(cityName).style.display = "none";
  } else {
    // Deactivate all tab links
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Show the clicked tab's content
    document.getElementById(cityName).style.display = "block";

    // Add the "active" class to the clicked tab
    evt.currentTarget.classList.add("active");
  }
}

$(document).on('mouseenter', '.card-content', function(event) {
  event.preventDefault();
  var toggleButton = $(this).append('<span class="toggleButton" aria-label="Favorites" onclick="toggleLocalStorage(event)"><svg xmlns="http://www.w3.org/2000/svg" height="24" class="toggleButtonSVG" viewBox="0 -960 960 960" width="24"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg></span>');
  var card = $(this).closest('.card');
  var title = card.find('.title.is-4').text();
  var toggleButtonSVG = toggleButton.find('.toggleButtonSVG');
 
  if (localStorage.getItem(title)) {
    toggleButtonSVG.addClass('active');
  } else {
    toggleButtonSVG.removeClass('active');
  }
  
  $(this).append(toggleButton);
});

$(document).on('mouseleave', '.card-content', function() {
  $(this).find('.toggleButton').remove();
});

function updateCounter() {
let totalCount = 0;
for (let i = 0; i < localStorage.length; i++) {
const key = localStorage.key(i);
if (key !== "thumbnailsVisible") {
totalCount++;
}
}
document.getElementById("totalCount").textContent = "" + totalCount;
  var totalCountfav = document.getElementById('totalCount-fav');
  if (totalCountfav) {
document.getElementById("totalCount-fav").textContent = "" + totalCount;
 }
};

function displayRandomCards() {
  const cardContainer = document.getElementById('cardContainer1');
  cardContainer.innerHTML = ''; // Clear the container before populating it again

  let localStorageData = {}; // Object to store local storage data

  const localStorageKeys = Object.keys(localStorage).filter(key => key !== 'thumbnailsVisible');
  const randomKeys = getRandomItems(localStorageKeys, 3); // Get 3 random keys

  randomKeys.forEach(key => {
    const title = key;
    const content = localStorage.getItem(title);
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const image = doc.querySelector('img');
    const imageLink = image ? replaceUrlParameters(image.getAttribute('src')) : '';

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<img src="${imageLink}">`;

    cardContainer.appendChild(card);

    localStorageData[title] = imageLink;
  });
}

function replaceUrlParameters(url) {
  return url.replace('&output=webp&maxage=1d&w=200&h=300&fit=cover&a=attention', '&output=webp&maxage=1d&w=50&h=50&fit=cover&a=attention');
}

displayRandomCards();

function getRandomItems(array, count) {
  const shuffled = array.slice();
  const randomItems = [];

  while (randomItems.length < count && shuffled.length) {
    const index = Math.floor(Math.random() * shuffled.length);
    const item = shuffled.splice(index, 1)[0];
    randomItems.push(item);
  }

  return randomItems;
}

 function checkLocalStorage(card, toggleButton) {
  const title = card.querySelector('.title.is-4').textContent;
  const toggleButtonSVG = toggleButton.querySelector('.toggleButtonSVG');

  if (localStorage.getItem(title)) { 
    toggleButtonSVG.classList.add('active');
  } else {
    toggleButtonSVG.classList.remove('active');
  };
    updateCounter();
  }

function attachToggleListeners() {
  const toggleButtons = document.querySelectorAll('.toggleButton');
  toggleButtons.forEach(toggleButton => {
    const card = toggleButton.closest('.card');
    checkLocalStorage(card, toggleButton);
  });
}

function toggleLocalStorage(event) {
  const toggleButton = event.target;
  const card = toggleButton.closest('.card');
  const title = card.querySelector('.title.is-4').textContent;

  if (localStorage.getItem(title)) {
    localStorage.removeItem(title);
    toggleButton.style.fill = 'rgb(255 255 255 / 80%)';
      displayRandomCards();
  } else {
    const clonedCard = card.cloneNode(true);
    const clonedToggleButton = clonedCard.querySelector('.toggleButton');
    if (clonedToggleButton) {
      clonedToggleButton.remove();
    }

    const content = clonedCard.innerHTML;
    localStorage.setItem(title, content);
    toggleButton.style.fill = 'rgb(4 252 14 / 80%)';
      displayRandomCards();
  }

  updateCounter();
}

document.addEventListener('DOMContentLoaded', function() {
  attachToggleListeners();
    updateCounter();
});

document.addEventListener('click', function(event) {
  if (event.target.matches('span.toggleButton')) {
    toggleLocalStorage(event);
  }
});

  function displaySavedCards() {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = ''; // Clear the container before populating it again

  let localStorageData = {}; // Object to store local storage data

  // Loop through the local storage items
  for (let i = 0; i < localStorage.length; i++) {
    const title = localStorage.key(i); // Get the title (key) of the stored card

    // Skip the key "History"
    if (title === 'History') {
      continue;
    }

    const content = localStorage.getItem(title); // Get the content (value) of the stored card

    // Create a new card element
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = content;

    // Append the card to the container
    cardContainer.appendChild(card);

    // Store the title and content in the localStorageData object
    localStorageData[title] = content;
  }
}

 document.addEventListener('click', async function(event) {
  const target = event.target;
  if (target.closest('.card-image')) {
    event.preventDefault();

var divElement = document.createElement("div");
divElement.setAttribute("id", "content-front");

var closeButton = document.createElement("span");
closeButton.setAttribute("class", "close-pv");
closeButton.innerText = "X";

var textSpan = document.createElement("span");
textSpan.setAttribute("id", "content-front-text");
divElement.appendChild(closeButton);
divElement.appendChild(textSpan);

document.body.appendChild(divElement);

    var span1 = document.getElementsByClassName("close-pv")[0];
span1.onclick = function() {
$("#content-front-text").empty();
   $("#content-front-text").css("opacity", "0");
                          $("#content-front").css("z-index", "-1").css('background','unset');
    var divElement = document.getElementById("content-front");
divElement.parentNode.removeChild(divElement);
}
    
    try {
      const response = await fetch(target.closest('.card-image').href);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const postTitle = doc.querySelector('.post-title a').innerHTML;
      const postBody = doc.querySelector('.content').innerHTML;

      const mainElement = document.querySelector('#content-front-text');
      mainElement.innerHTML = postTitle + postBody;

      window.history.pushState({}, "", target.closest('.card-image').href);
      document.title = postTitle;
      
      var contentFrontElement = document.querySelector("#content-front");
      var contentFrontTextElement = document.querySelector("#content-front-text");
      contentFrontElement.style.zIndex = "1";
      contentFrontElement.style.background = "rgba(0, 0, 0, 0.5)";
      contentFrontTextElement.style.opacity = "1";
    } catch (error) {
      console.error('Error:', error);
    }
  }
});


$('.btn5').click(function () { 
  $.ajax({
    type: "GET",
    url: "https://www.reddit.com/r/jrpg/search.json?q=Breath of Fire II&restrict_sr=true",
    success: function (results) {
      currText = '';
      for (i=0;i<results.data.children.length;i++) {
        currText = currText+ 
        "<img src='"+results.data.children[i].data["thumbnail"]+"'></img>";
            currText = currText+ 

        "<a href='"+results.data.children[i].data["permalink"]+"'>'"+results.data.children[i].data["title"]+"'</a>";
      }
      
      $('.text5').html(currText);
    }
  });
});

  let time = 0;
$('.category a').mouseover(function (event) {
  var that = this;
  time = setTimeout(() => {
      event.preventDefault(); 
    $('.link-pre').css('top',event.pageY).css('left',event.pageX - 25 ).hide().load(that.href + ' #previewtag ', function (data) {
    }).fadeIn(300).css('transform', 'translate(0, -15px)');
    }, 500);
}).mouseleave(() => { clearTimeout(time); });
$('.link-pre').mouseleave (function (event) {
  event.preventDefault(); 
  $('.link-pre').css('transform', 'translate(0, +5px)').fadeOut(200, function() {
  $(this).empty();
          });
});

$('body').on('click', function(e) {
  var pop_container = $(".link-pre");
  if (!pop_container.is(e.target) && pop_container.has(e.target).length === 0) {
      pop_container.empty();
  }
});

$("body").on("mouseover", "#game-preview a", function(event) {
{setTimeout(function(){
    jQuery.getScript("/js/posts-load.js");
}, 300)};
});

$(document).on("click", "#content-front", function(event) {
  var modal1 = document.getElementById("content-front");
  if (event.target == modal1) {
    $("#content-front-text").empty();
    $("#content-front-text").css("opacity", "0");
    $("#content-front").css("z-index", "-1").css('background', 'unset');
    var divElement = document.getElementById("content-front");
divElement.parentNode.removeChild(divElement);
  }
});


$("body").on("click", ".tablinks:nth-child(3)", function() {
 $('#content-front-text #game-media img:not(.gallery)').each(function(){
      var img_link =  $(this).attr('data-src').split('&h')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
       $('#content-front-text #game-media img').addClass('gallery').addClass('visible');
        var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");
  });
});

$("body").on("click", "#button1", function() {
    var iframe = $("#GBframe");
    iframe.attr("src", iframe.data("src")); 
});


$('.Platforms a').hover(function (event) { 
    event.preventDefault(); 
  var link1 =  $(this).attr('href');
    $(this).append('<div id="game-preview1"><a href="'+ link1 +'"><svg viewBox="0 0 100 100" class="Preview"><path d="M3.563-.004a3.573 3.573 0 0 0-3.527 4.09l-.004-.02v28.141c0 1.973 1.602 3.57 3.57 3.57s3.57-1.598 3.57-3.57V12.218v.004l22.461 22.461a3.571 3.571 0 0 0 6.093-2.527c0-.988-.398-1.879-1.047-2.523L12.218 7.172h19.989c1.973 0 3.57-1.602 3.57-3.57s-1.598-3.57-3.57-3.57H4.035a3.008 3.008 0 0 0-.473-.035zM96.333 0l-.398.035.02-.004h-28.16a3.569 3.569 0 0 0-3.57 3.57 3.569 3.569 0 0 0 3.57 3.57h19.989L65.323 29.632a3.555 3.555 0 0 0-1.047 2.523 3.571 3.571 0 0 0 6.093 2.527L92.83 12.221v19.985a3.569 3.569 0 0 0 3.57 3.57 3.569 3.569 0 0 0 3.57-3.57V4.034v.004a3.569 3.569 0 0 0-3.539-4.043l-.105.004zM3.548 64.23A3.573 3.573 0 0 0 .029 67.8v28.626-.004l.016.305-.004-.016.004.059v-.012l.039.289-.004-.023.023.121-.004-.023c.074.348.191.656.34.938l-.008-.02.055.098-.008-.02.148.242-.008-.012.055.082-.008-.012c.199.285.43.531.688.742l.008.008.031.027.004.004c.582.461 1.32.742 2.121.762h.004l.078.004h28.61a3.569 3.569 0 0 0 3.57-3.57 3.569 3.569 0 0 0-3.57-3.57H12.224l22.461-22.461a3.569 3.569 0 0 0-2.492-6.125l-.105.004h.008a3.562 3.562 0 0 0-2.453 1.074L7.182 87.778V67.793a3.571 3.571 0 0 0-3.57-3.57h-.055.004zm92.805 0a3.573 3.573 0 0 0-3.519 3.57v19.993-.004L70.373 65.328a3.553 3.553 0 0 0-2.559-1.082h-.004a3.573 3.573 0 0 0-3.566 3.57c0 1.004.414 1.91 1.082 2.555l22.461 22.461H67.802a3.57 3.57 0 1 0 0 7.14h28.606c.375 0 .742-.059 1.082-.168l-.023.008.027-.012-.02.008.352-.129-.023.008.039-.02-.02.008.32-.156-.02.008.023-.016-.008.008c.184-.102.34-.207.488-.32l-.008.008.137-.113-.008.004.223-.211.008-.008c.156-.164.301-.34.422-.535l.008-.016-.008.016.008-.02.164-.285.008-.02-.008.016.008-.02c.098-.188.184-.406.246-.633l.008-.023-.004.008.008-.023a3.44 3.44 0 0 0 .121-.852v-.004l.004-.078V67.804a3.569 3.569 0 0 0-3.57-3.57h-.055.004z"></path></svg></a></div>'); 
 }, function() {
    $('#game-preview1').remove();
});

$("body").on("mouseover", "#game-preview1 a", function(event) {
    event.preventDefault();
       $('#content-front-text').load(this.href + ' .content ', function (data) {
    });
          $("#content-front").css("z-index", "1").css('background','rgba(0,0,0,.5)');
          $("#content-front-text").css("opacity", "1");   
});

$("body").on("click", "#notesCloseDiv", function() {
    var divElement2 = document.getElementById("notesROL");
divElement2.parentNode.removeChild(divElement2);
});
$(document).on("click", "#notesROL", function(event) {
  var modal4 = document.getElementById("notesROL");
  if (event.target == modal4) {
    var divElement = document.getElementById("notesROL");
divElement.parentNode.removeChild(divElement);
  }
});

var modal9 = document.getElementById("lightbox");
modal9.onclick = function(event) {
if (event.target == modal9) {
closeLightbox();
};
};


// save data
async function fetchDataAndSendToGitHub() {
try {
const response = await fetch('https://link-968.pages.dev/test.txt');
const data = await response.text();
const toktp = LZString.decompressFromBase64(data);

const owner = 'YuushaExa';
const repo = 'v';
const branch = 'master';
const directory = 'dev/json/favfiles';
const filename = firebase.auth().currentUser.uid;

const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${directory}/${filename}.json`;

const fileContent = {
  message: 'Update data.json from local storage',
  content: btoa(LZString.compressToBase64(JSON.stringify(localStorage))),
};

const existingFileResponse = await fetch(apiUrl, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${toktp}`,
  },
});
const existingFileData = await existingFileResponse.json();

fileContent.sha = existingFileData.sha;

const updateResponse = await fetch(apiUrl, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${toktp}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(fileContent),
});
const updateData = await updateResponse.json();

console.log('File created or updated successfully:', updateData);

const currentTime = new Date().toLocaleString();
localStorage.setItem('LastSync', currentTime);
updateLastSavedData();
document.getElementById('inputTextFavSet').style.backgroundColor = '#21b921';
setTimeout(() => {
  document.getElementById('inputTextFavSet').style.backgroundColor = '';
}, 2000);
} catch (error) {
console.error('Error occurred:', error);
document.getElementById('inputTextFavSet').style.backgroundColor = 'red';
}
}
document.getElementById("CloudSave").addEventListener("click", fetchDataAndSendToGitHub);

// storage

  // Check if the activation state is already stored in localStorage
    let isScriptActive = localStorage.getItem('isScriptActive') === 'true';

    function handleStorageEvent(event) {
      if (event.storageArea === localStorage && isScriptActive) {
        fetchDataAndSendToGitHub()
      }
    }

    window.addEventListener('storage', handleStorageEvent);
    function toggleScriptActivation() {
      isScriptActive = !isScriptActive;
      localStorage.setItem('isScriptActive', isScriptActive.toString());
    }
//

    var firebaseConfig = {
    apiKey: "AIzaSyCP3lyYIs5GjA6XYS9aSdaz5X6-ru3Fxeo",
    authDomain: "gamedb-95862.firebaseapp.com",
    databaseURL: "https://gamedb-95862-default-rtdb.firebaseio.com",
    projectId: "gamedb-95862",
    storageBucket: "gamedb-95862.appspot.com",
    messagingSenderId: "788250168154",
    appId: "1:788250168154:web:b6573c45a909fc09694163"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
  // auth console
  function dailylogin() {
firebase.auth().onAuthStateChanged((user) => {
if (user) {
const displayName = user.displayName || 'Nameless';
const today = new Date().toDateString(); // Get today's date in the format "Day Month Date Year"

const lastVisitStamp = localStorage.getItem('lastVisitStamp');
if (lastVisitStamp === today) {
  console.log('Script already executed today. Aborting...');
  return; // Abort the script if it has already been executed today
}

const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const userRef = db.collection('users').doc(user.uid);

userRef.get()
  .then((doc) => {
    const lastVisit = doc.exists ? doc.data().lastVisit : null;
    const qi = doc.exists ? doc.data().qi : 1;
    const name = user.displayName;
                localStorage.setItem('name', name);
            localStorage.setItem('Qi', qi);
    
    if (lastVisit) {
      const lastVisitDate = lastVisit.toDate().toDateString(); 
      if (lastVisitDate !== today) {
        console.log('Welcome, ' + displayName + '!');
        userRef.set({ lastVisit: timestamp, qi: firebase.firestore.FieldValue.increment(1), name: user.displayName }, { merge: true })
          .then(() => {
            console.log('Timestamp and qi updated in Firestore.');
            localStorage.setItem('lastVisitStamp', today); 
          })
          .catch((error) => {
            console.error('Failed to update timestamp and qi in Firestore:', error);
          });
      } else {
        console.log('Script already executed today based on Firestore data. Aborting...');
        localStorage.setItem('lastVisitStamp', today);
      }
    } else {
      console.log('First visit of the user. Welcome, ' + displayName + '!');

      userRef.set({ lastVisit: timestamp, qi: firebase.firestore.FieldValue.increment(1), name: user.displayName }, { merge: true })
        .then(() => {
          console.log('Timestamp updated in Firestore.');
          localStorage.setItem('lastVisitStamp', today); // Save today's date in localStorage
          console.cong('Dantian Unlocked, now you can store Qi energy');
        })
        .catch((error) => {
          console.error('Failed to update timestamp and Qi in Firestore:', error);
        });
    }
  })
  .catch((error) => {
    console.error('Error getting user document:', error);
  });

const randomWelcomeDiv = document.getElementById('randomwelcome');

if (randomWelcomeDiv) {
  console.log('Game of the day: ' + randomWelcomeDiv.innerHTML);
}
} else {
// User is logged out
}
});
  }
  dailylogin();

//

  function showErrorToast(message) {
Toastify({
  text: "This is a success message.",
  duration: 3000,
  close: true,
  gravity: "top",
  position: "left",
  backgroundColor: "#4caf50",
  stopOnFocus: true,
  containerClass: "toastify-container",
  className: "toastify toastify-success",
}).showToast();
}
  
  (function () {
  var originalLog = console.log;
  var originalError = console.error;
    
  console.log = function () {
    // Convert arguments to an array
    var args = Array.prototype.slice.call(arguments);
    // Join arguments into a single string
    var message = args.join(' ');
    // Display the toast notification
    showLogToast(message);
    // Call the original console.log function
    originalLog.apply(console, args);
  };

  console.error = function () {
    // Convert arguments to an array
    var args = Array.prototype.slice.call(arguments);
    // Join arguments into a single string
    var message = args.join(' ');
    // Display the toast notification
    showErrorToast(message);
    // Call the original console.error function
    originalError.apply(console, args);
  };

      console.info = function () {
    // Convert arguments to an array
    var args = Array.prototype.slice.call(arguments);
    // Join arguments into a single string
    var message = args.join(' ');
    // Display the toast notification
    showInfoToast(message);
    // Call the original console.log function
    originalLog.apply(console, args);
  };

            console.welcome = function () {
    // Convert arguments to an array
    var args = Array.prototype.slice.call(arguments);
    // Join arguments into a single string
    var message = args.join(' ');
    // Display the toast notification
    showWelcomeToast(message);
    // Call the original console.log function
    originalLog.apply(console, args);
  };

            console.cong = function () {
    var args = Array.prototype.slice.call(arguments);
    var message = args.join(' ');
    showCongToast(message);
    originalLog.apply(console, args);
  };
})();

// Toast notification functions
function showLogToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    style: {
      background: "#E6F5FF",
      color: "#003366",
    },
    stopOnFocus: true,
  }).showToast();
}

function showErrorToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
      style: {
      background: "#bb0606e6",
    },
    stopOnFocus: true,
  }).showToast();
}

  function showInfoToast(message) {
  Toastify({
    text: message,
    duration: 4000,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
  }).showToast();
}

    function showWelcomeToast(message) {
  Toastify({
    text: message,
    duration: 2000,
    close: true,
    gravity: "top",
    position: "center",
         style: {
         background: "#f0fff0",
         color: "#006400",
    },
    stopOnFocus: true,
  }).showToast();
}

function showCongToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
      style: {
 backgroundImage: "linear-gradient(to right, #FFD700, #ffffffcc)",
      textShadow: "1px 1px 2px rgb(0 0 0 / 30%)",
      color: "rgb(0 0 0)",
    },
    stopOnFocus: true,
  }).showToast();
}
  
fetch('https://yuushaexa.github.io/page/39/')
  .then(response => response.text())
  .then(htmlContent => {
    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Find all the card elements
    const cards = doc.querySelectorAll('.card');

    if (cards.length > 0) {
      // Select a random card
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      
      // Get the title of the random card
      const title = randomCard.querySelector('.title').innerText;
      
      // Get the href of the random card
      const href = randomCard.querySelector('a.card-image').getAttribute('href');
      
      // Get the link image of the random card
      const linkImage = randomCard.querySelector('img.lazyload').getAttribute('data-src');
      
      // Create a string with the HTML content to display
      const html = `
        <h2>Title: ${title}</h2>
        <p>Href: ${href}</p>
        <img src="${linkImage}" alt="Link Image">
      `;
      
      // Display the random card's information in the "randomwelcome" div
      const randomWelcomeDiv = document.getElementById('randomwelcome');
      randomWelcomeDiv.innerHTML = html;
    } else {
      console.log('No cards found.');
    }
  })
  .catch(error => console.error(error));


  // send data


  // show last sync data
function updateLastSavedData() {
const lastSyncTime = localStorage.getItem("LastSync");
if (lastSyncTime) {
  document.getElementById("lastsaveddata").textContent = `Last sync time: ${lastSyncTime}`;
} else {
  document.getElementById("lastsaveddata").textContent = `No save files, press load`;
}
}
 updateLastSavedData();

//


const journalRef = db.collection('Activity').doc('Journal');
const activityDiv = document.getElementById('Activity');

journalRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      activityDiv.innerHTML = ''; // Clear the div

      // Create a container for the data
      const container = document.createElement('div');

      // Iterate over the properties of the data object
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const entry = data[key];

          // Create a div for each entry
          const entryDiv = document.createElement('div');
          entryDiv.classList.add('entry');

          // Display the entry name
          const name = document.createElement('h2');
          name.textContent = entry.name;
          entryDiv.appendChild(name);

          // Display the entry time
          const time = document.createElement('p');
          const timestamp = new Date(Number(key));
          time.textContent = `Time: ${timestamp.toLocaleString()}`;
          entryDiv.appendChild(time);

          // Display the entry data
          const title = document.createElement('h3');
          title.textContent = entry.item.title;
          entryDiv.appendChild(title);

          const image = document.createElement('img');
          image.src = entry.item.image;
          entryDiv.appendChild(image);

          const href = document.createElement('a');
          href.href = entry.item.href;
          href.textContent = entry.item.href;
          entryDiv.appendChild(href);

          // Add the entry div to the container
          container.appendChild(entryDiv);
        }
      }

      // Append the container to the activityDiv
      activityDiv.appendChild(container);
    } else {
      activityDiv.innerHTML = 'Document does not exist';
    }
  })
  .catch((error) => {
    console.log('Error getting document:', error);
    activityDiv.innerHTML = 'Error retrieving document';
  });

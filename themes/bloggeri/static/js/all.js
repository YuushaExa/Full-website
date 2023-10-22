let t,e;const n=new Set,o=document.createElement("link"),s=o.relList&&o.relList.supports&&o.relList.supports("prefetch")&&window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype,i="instantAllowQueryString"in document.body.dataset,r="instantAllowExternalLinks"in document.body.dataset,a="instantWhitelist"in document.body.dataset;let c=65,d=!1,l=!1,u=!1;if("instantIntensity"in document.body.dataset){const t=document.body.dataset.instantIntensity;if("mousedown"==t.substr(0,"mousedown".length))d=!0,"mousedown-only"==t&&(l=!0);else if("viewport"==t.substr(0,"viewport".length))navigator.connection&&(navigator.connection.saveData||navigator.connection.effectiveType.includes("2g"))||("viewport"==t?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(u=!0):"viewport-all"==t&&(u=!0));else{const e=parseInt(t);isNaN(e)||(c=e)}}if(s){const n={capture:!0,passive:!0};if(l||document.addEventListener("touchstart",function(t){e=performance.now();const n=t.target.closest("a");if(!f(n))return;h(n.href)},n),d?document.addEventListener("mousedown",function(t){const e=t.target.closest("a");if(!f(e))return;h(e.href)},n):document.addEventListener("mouseover",function(n){if(performance.now()-e<1100)return;const o=n.target.closest("a");if(!f(o))return;o.addEventListener("mouseout",m,{passive:!0}),t=setTimeout(()=>{h(o.href),t=void 0},c)},n),u){let t;(t=window.requestIdleCallback?t=>{requestIdleCallback(t,{timeout:1500})}:t=>{t()})(()=>{const t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const n=e.target;t.unobserve(n),h(n.href)}})});document.querySelectorAll("a").forEach(e=>{f(e)&&t.observe(e)})})}}function m(e){e.relatedTarget&&e.target.closest("a")==e.relatedTarget.closest("a")||t&&(clearTimeout(t),t=void 0)}function f(t){if(t&&t.href&&(!a||"instant"in t.dataset)&&(r||t.origin==location.origin||"instant"in t.dataset)&&["http:","https:"].includes(t.protocol)&&("http:"!=t.protocol||"https:"!=location.protocol)&&(i||!t.search||"instant"in t.dataset)&&!(t.hash&&t.pathname+t.search==location.pathname+location.search||"noInstant"in t.dataset))return!0}function h(t){if(n.has(t))return;const e=document.createElement("link");e.rel="prefetch",e.href=t,document.head.appendChild(e),n.add(t)}

function checkLocalStorage(card, toggleButton) {
  const title = card.querySelector('.title.is-4').textContent;
  const toggleButtonSVG = toggleButton.querySelector('.toggleButtonSVG');

  if (localStorage.getItem(title)) { 
    toggleButtonSVG.classList.add('active');
  } else {
    toggleButtonSVG.classList.remove('active');
  };
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
  } else {
    const content = card.innerHTML;
    localStorage.setItem(title, content);
        toggleButton.style.fill = 'rgb(4 252 14 / 80%)';
  }
}


document.addEventListener('DOMContentLoaded', function() {
  attachToggleListeners();
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

    // Skip the key "thumbnailsVisible"
    if (title === 'thumbnailsVisible') {
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

  // Create a download link
  const downloadLink = document.createElement('a');
  downloadLink.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localStorageData));
  downloadLink.download = 'local_storage_data.json';
  downloadLink.textContent = 'Download Local Storage Data';

  // Append the download link to the container
  cardContainer.appendChild(downloadLink);

  // Create an upload input
  const uploadInput = document.createElement('input');
  uploadInput.type = 'file';
  uploadInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
      const uploadedData = JSON.parse(reader.result);
      Object.keys(uploadedData).forEach(function(key) {
        localStorage.setItem(key, uploadedData[key]);
      });

      alert('JSON data has been uploaded and stored in local storage.');
      // Refresh the displayed cards after uploading
      displaySavedCards();
    };

    reader.readAsText(file);
  });

  // Append the upload input to the container
  cardContainer.appendChild(uploadInput);
}

 document.addEventListener('click', async function(event) {
  const target = event.target;
  if (target.closest('.card-image')) {
    event.preventDefault();

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

window.addEventListener('popstate', function(event) {
  const closeElement = document.getElementsByClassName("close-pv")[0];
  if (closeElement) {
    closeElement.click();
  }
});


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
  }

var toggleButton12 = document.querySelectorAll('.toggleButton');
  if (toggleButton12) {
    attachToggleListeners();
}

      
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

$('.card a').hover(function (event) { 
    event.preventDefault(); 
  var link1 =  $(this).attr('href');
    $(this).append('<div id="game-preview"><a href="'+ link1 +'"><svg viewBox="0 0 100 100" class="Preview"><path d="M3.563-.004a3.573 3.573 0 0 0-3.527 4.09l-.004-.02v28.141c0 1.973 1.602 3.57 3.57 3.57s3.57-1.598 3.57-3.57V12.218v.004l22.461 22.461a3.571 3.571 0 0 0 6.093-2.527c0-.988-.398-1.879-1.047-2.523L12.218 7.172h19.989c1.973 0 3.57-1.602 3.57-3.57s-1.598-3.57-3.57-3.57H4.035a3.008 3.008 0 0 0-.473-.035zM96.333 0l-.398.035.02-.004h-28.16a3.569 3.569 0 0 0-3.57 3.57 3.569 3.569 0 0 0 3.57 3.57h19.989L65.323 29.632a3.555 3.555 0 0 0-1.047 2.523 3.571 3.571 0 0 0 6.093 2.527L92.83 12.221v19.985a3.569 3.569 0 0 0 3.57 3.57 3.569 3.569 0 0 0 3.57-3.57V4.034v.004a3.569 3.569 0 0 0-3.539-4.043l-.105.004zM3.548 64.23A3.573 3.573 0 0 0 .029 67.8v28.626-.004l.016.305-.004-.016.004.059v-.012l.039.289-.004-.023.023.121-.004-.023c.074.348.191.656.34.938l-.008-.02.055.098-.008-.02.148.242-.008-.012.055.082-.008-.012c.199.285.43.531.688.742l.008.008.031.027.004.004c.582.461 1.32.742 2.121.762h.004l.078.004h28.61a3.569 3.569 0 0 0 3.57-3.57 3.569 3.569 0 0 0-3.57-3.57H12.224l22.461-22.461a3.569 3.569 0 0 0-2.492-6.125l-.105.004h.008a3.562 3.562 0 0 0-2.453 1.074L7.182 87.778V67.793a3.571 3.571 0 0 0-3.57-3.57h-.055.004zm92.805 0a3.573 3.573 0 0 0-3.519 3.57v19.993-.004L70.373 65.328a3.553 3.553 0 0 0-2.559-1.082h-.004a3.573 3.573 0 0 0-3.566 3.57c0 1.004.414 1.91 1.082 2.555l22.461 22.461H67.802a3.57 3.57 0 1 0 0 7.14h28.606c.375 0 .742-.059 1.082-.168l-.023.008.027-.012-.02.008.352-.129-.023.008.039-.02-.02.008.32-.156-.02.008.023-.016-.008.008c.184-.102.34-.207.488-.32l-.008.008.137-.113-.008.004.223-.211.008-.008c.156-.164.301-.34.422-.535l.008-.016-.008.016.008-.02.164-.285.008-.02-.008.016.008-.02c.098-.188.184-.406.246-.633l.008-.023-.004.008.008-.023a3.44 3.44 0 0 0 .121-.852v-.004l.004-.078V67.804a3.569 3.569 0 0 0-3.57-3.57h-.055.004z"></path></svg></a></div>');
 }, function() {
    $('#game-preview').remove();
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

var modal1 = document.getElementById("content-front");
modal1.onclick = function(event) {
if (event.target == modal1) {
  $("#content-front-text").empty();
     var url = "https://yuushaexa.github.io/";
  history.pushState({}, "", url);
  document.title = "Library";
       $("#content-front-text").css("opacity", "0");
                              $("#content-front").css("z-index", "-1").css('background','unset');
}
}
var span1 = document.getElementsByClassName("close-pv")[0];
span1.onclick = function() {
 $("#content-front-text").empty();
      var url = "https://yuushaexa.github.io/";
  history.pushState({}, "", url);
  document.title = "Library";
       $("#content-front-text").css("opacity", "0");
                              $("#content-front").css("z-index", "-1").css('background','unset');
}



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

var modal9 = document.getElementById("lightbox");
modal9.onclick = function(event) {
if (event.target == modal9) {
closeLightbox();
};
};

function loadMoreContent(url) {
  // Show the loading indicator
  document.getElementById("loader").style.display = "block";

  // Send a fetch request to fetch the content for the specified URL
  fetch(url)
    .then(response => response.text())
    .then(data => {
      // Hide the loading indicator
      document.getElementById("loader").style.display = "none";

      // Append the new content to the existing content
      var contentContainer = document.getElementsByClass("content");
      contentContainer.innerHTML += data;

      // Update the URL using the History API
      history.pushState({}, "", url);
    })
    .catch(error => {
      // Handle error
      console.error("Error:", error);
    });
}

window.addEventListener("scroll", function() {
  // ...

  // Check if the user has scrolled to the bottom of the page
  if (scrollTop + windowHeight >= documentHeight) {
    // Find the next page link element
    var nextPageLink = document.querySelector(".paginator-next-page");

    // Check if the next page link exists
    if (nextPageLink) {
      // Get the URL from the next page link
      var url = nextPageLink.getAttribute("href");

      // Load more content for the next page
      loadMoreContent(url);
    }
  }
});

window.addEventListener("popstate", function(event) {
  // Load the content for the current URL
  loadMoreContent(window.location.href);
});

window.addEventListener("load", function() {
  // Load the initial content for the current URL
  loadMoreContent(window.location.href);
});

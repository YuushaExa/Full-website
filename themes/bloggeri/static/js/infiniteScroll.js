function loadNextPage() {
  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open("GET", nextPage, true);

  // Define the onload event handler
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Create a temporary container element to hold the response HTML
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = xhr.responseText;

      // Select the content from the response that you want to append to the current page
      const nextPageContent = tempContainer.querySelector("main").innerHTML;

      // Append the next page content to the current page
      currentPagePaginationContainer.innerHTML += nextPageContent;

      // Update the variables for the next page link
      currentPageNextLink = tempContainer.querySelector(".paginator-next-page");
      nextPage = currentPageNextLink.getAttribute("href");
    }
  };

  // Send the request
  xhr.send();
}

window.addEventListener("scroll", function () {
  const scrollPosition = window.pageYOffset;
  const windowSize = window.innerHeight;
  const contentHeight = document.body.offsetHeight;

  // Check if the user has reached the bottom of the page
  if (scrollPosition + windowSize >= contentHeight) {
    // Load the next page
    loadNextPage();
  }
});

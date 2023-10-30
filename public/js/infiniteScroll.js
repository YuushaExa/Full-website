let currentPagePaginationContainer = document.querySelector("main");
let currentPageNextLink = document.querySelector(".paginator-next-page");
let nextPage = currentPageNextLink.getAttribute("href");

function fetchNextPage() {
  fetch(nextPage)
    .then(response => response.text())
    .then(data => {
      // Create a temporary element to hold the fetched content
      let tempElement = document.createElement("div");
      tempElement.innerHTML = data;

      // Find the next page link in the fetched content
      let nextPageLink = tempElement.querySelector(".paginator-next-page");
      nextPage = nextPageLink.getAttribute("href");

      // Find the content to append from the fetched content
      let content = tempElement.querySelector("main").innerHTML;

      // Append the content to the current page's container
      currentPagePaginationContainer.insertAdjacentHTML("beforeend", content);

      // Update browser history
      history.pushState({}, "", nextPage);
    })
    .catch(error => {
      console.error("Error fetching next page:", error);
    });
}

window.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY;
  let windowHeight = window.innerHeight;
  let documentHeight = document.documentElement.scrollHeight;

  if (scrollPosition + windowHeight >= documentHeight) {
    fetchNextPage();
  }
});

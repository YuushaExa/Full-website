let currentPagePaginationContainer = document.querySelector("main");
let currentPageNextLink = document.querySelector(".paginator-next-page");
let nextPage = currentPageNextLink ? currentPageNextLink.getAttribute("href") : null;

function loadNextPage() {
  if (!nextPage) {
    // If there is no next page, return or handle the situation accordingly
    return;
  }

  fetch(nextPage)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Error loading next page");
      }
    })
    .then(html => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = html;
      const nextPageContent = tempContainer.querySelector("main").innerHTML;
      currentPagePaginationContainer.innerHTML += nextPageContent;
      currentPageNextLink = tempContainer.querySelector(".paginator-next-page");
      nextPage = currentPageNextLink ? currentPageNextLink.getAttribute("href") : null;
    })
    .catch(error => {
      console.error(error);
    });
}

window.addEventListener("scroll", function () {
  const scrollPosition = window.pageYOffset;
  const windowSize = window.innerHeight;
  const contentHeight = document.body.offsetHeight;

  if (scrollPosition + windowSize >= contentHeight) {
    loadNextPage();
  }
});

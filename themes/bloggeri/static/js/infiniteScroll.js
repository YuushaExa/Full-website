let currentPagePaginationContainer = document.querySelector("main");
let nextPage = document.querySelector(".paginator-next-page")?.href || null;
let loading = false;

function loadNextPage() {
  if (!nextPage || loading) {
    // If there is no next page or a request is already in progress, return
    return;
  }

  loading = true;

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
      currentPagePaginationContainer.insertAdjacentHTML('beforeend', nextPageContent);
      nextPage = tempContainer.querySelector(".paginator-next-page")?.href || null;
      loading = false;

      // Update browser history with the new page URL
      const nextPageTitle = document.title;
      const nextPageURL = nextPage || window.location.href;
      const isFirstLoad = performance.navigation.type === 1;
if (isFirstLoad) {
  window.history.replaceState({ page: -1 }, document.title, nextPage);
}
    })
    .catch(error => {
      console.error(error);
      loading = false;
    });
}

window.addEventListener("scroll", function () {
  const scrollPosition = window.pageYOffset;
  const windowSize = window.innerHeight;
  const contentHeight = document.body.offsetHeight;

  if (scrollPosition + windowSize >= contentHeight * 0.9) {
    loadNextPage();
  }
});

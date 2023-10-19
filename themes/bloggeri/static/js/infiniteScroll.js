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

      /* Update history and next page link */
      let state = {
        "status": "pagination: New list items added",
        "previousPage": window.location.pathname + window.location.search,
        "currentPage": nextPage
      };
      history.pushState(state, "", nextPage);
      console.log("pagination: New history pushed - ", state);

      let currentPageNextLink = document.querySelector(".paginator-next-page");
      let newNextLink = tempContainer.querySelector(".paginator-next-page");
      if (newNextLink) {
        currentPageNextLink.setAttribute("href", newNextLink.getAttribute("href"));
        console.log("pagination: Updated next page link!");
      } else {
        currentPageNextLink.parentNode?.removeChild(currentPageNextLink);
        console.log("pagination: Removed next page anchor!");
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

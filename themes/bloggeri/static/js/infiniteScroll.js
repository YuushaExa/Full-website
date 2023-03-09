async function loadNextListPage() {
  let currentPagePaginationContainer = document.querySelector(".pagination");
  let currentPageNextLink = document.querySelector(".paginator-next-page");
  let nextPage = currentPageNextLink.getAttribute("href");

  /* Try to get the next page asynchronously */
  console.log("pagination: Fetching next page...");
  try {

    let response = await fetch(nextPage);

    if (response.ok) {

      let data = await response.text();
      console.log("pagination: Next page fetched!");

      /* Get the new Pagination items of the next page and append */
      let parser = new DOMParser();
      let nextPageDom = parser.parseFromString(data, "text/html");
      console.log("pagination: Data parsed into temporary DOM!");
      let newPaginatorItems = nextPageDom.querySelector(".pagination").children;
      newPaginatorItems[0].removeAttribute("open");
      for (i = 0; i < newPaginatorItems.length; i++) {
        currentPagePaginationContainer.append(newPaginatorItems[i].cloneNode(true));
      }
      makeAllDatesLocal();
      console.log("pagination: New items added!");

      /* Update the history to the last page loaded */
      let state = { 
        "status": "pagination: New list items added",
        "previousPage": window.location.pathname + window.location.search,
        "currentPage": nextPage };
      history.replaceState(state, "", nextPage);
      console.log("pagination: History state replaced - ", state);

      /* Update the next page link on the current page */
      let newNextLink = nextPageDom.querySelector(".paginator-next-page");
      if (newNextLink) { // When there is no next page, newNextLink is 'null'
        currentPageNextLink.setAttribute("href", newNextLink.getAttribute("href"));
        console.log("pagination: Updated next page link!");
      } else { // When there are no other pages, remove the next page link
        if (currentPageNextLink.parentNode) currentPageNextLink.parentNode.removeChild(currentPageNextLink);
        console.log("pagination: Removed next page anchor!");
      }

    } else throw "response.ok was unsuccessful with status '" + response.statusText + " (" + response.status + ")'";

  } catch (error) {
    /* A fetch() promise will reject with a TypeError when a network error is encountered or CORS is misconfigured on the server-side, although this usually means permission issues or similar — a 404 does not constitute a network error, for example. 
    
    There are two places where awaited Promises may happen (and, ergo, will reject and throw an exception): the actual fetching of the next page and reading the response stream and converting it into a string. Considering a network error would preclude any access to my site and CORS is not utilized, any errors should, essentially, fall out of scope. I am not 100% certain when reading the response stream may fail. However, if something does throw an exception, I should know about it.
    
    In addition, this function will throw an exception if the Promises from the Fetch API still resolve, but the response was considered unsuccessful (status not in range of 200-299). I am not 100% certain what would cause an unsuccessful status with consideration of how my site is currently maintained and generated. However, should the Fetch's API return an unsuccessful response for any reason, I also want to know about it.*/

    console.error("pagination: Caught a Fetch API exception loading the next page! - ", error);
  }
}

/* Use the Intersection Observer API to get new items when scrolled down */
function observeForInfiniteScroll() {
  let nextPageObserver = new IntersectionObserver((entries, observer) => {
    let firstEntry = entries[0];
    if (firstEntry.isIntersecting) {
      if (!document.querySelector(".paginator-next-page")) {
        observer.disconnect();
        console.log("pagination: IntersectionObserver disconnected!");
      }
      else loadNextListPage();
    }
  }, {
    rootMargin: "0px 0px 80px 0px"
  });
  nextPageObserver.observe(document.querySelector(".icon-attribution"));
}
if (("IntersectionObserver" in window) && ("fetch" in window)) {
  console.log("pagination: IntersectionObserver and Fetch API available")
  addLoadEvent(observeForInfiniteScroll);
}

/* The onclick event for '.paginator-next-page' */
function manuallyLoadNextPage() {
  event.preventDefault(); // Disable the default href click event
  loadNextListPage();
}

/* Add onclick to '.paginator-next-page' if Fetch API is available */
function checkForFetchSupport() {
  if (("fetch" in window) && (document.querySelector(".paginator-next-page"))) {
    console.log("pagination: Fetch API available");
    document.querySelector(".paginator-next-page").setAttribute("onclick", "manuallyLoadNextPage();");
  }
}
addLoadEvent(checkForFetchSupport);

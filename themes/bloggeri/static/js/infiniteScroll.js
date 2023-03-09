async function loadNextListPage() {
  let currentPagePaginationContainer = document.querySelector("main");
  let currentPageNextLink = document.querySelector(".paginator-next-page");
  let nextPage = currentPageNextLink.getAttribute("href");

  try {

    let response = await fetch(nextPage);

    if (response.ok) {

      let data = await response.text();

      let parser = new DOMParser();
      let nextPageDom = parser.parseFromString(data, "text/html");
      let newPaginatorItems = nextPageDom.querySelector("main").children;
      newPaginatorItems[0].removeAttribute("open");
      for (i = 0; i < newPaginatorItems.length; i++) {
        currentPagePaginationContainer.append(newPaginatorItems[i].cloneNode(true));
      }

      let state = { 
        "status": "pagination: New list items added",
        "previousPage": window.location.pathname + window.location.search,
        "currentPage": nextPage };
      history.replaceState(state, "", nextPage);

      let newNextLink = nextPageDom.querySelector(".paginator-next-page");
      if (newNextLink) { // When there is no next page, newNextLink is 'null'
        currentPageNextLink.setAttribute("href", newNextLink.getAttribute("href"));
      } else {
        if (currentPageNextLink.parentNode) currentPageNextLink.parentNode.removeChild(currentPageNextLink);
      }

    } else throw "response.ok was unsuccessful with status '" + response.statusText + " (" + response.status + ")'";

  } catch (error) {
    console.error("pagination: Caught a Fetch API exception loading the next page! - ", error);
  }
}

function observeForInfiniteScroll() {
  let nextPageObserver = new IntersectionObserver((entries, observer) => {
    let firstEntry = entries[0];
    if (firstEntry.isIntersecting) {
      if (!document.querySelector(".paginator-next-page")) {
        observer.disconnect();
      }
      else loadNextListPage();
    }
  }, {
    rootMargin: "0px 0px 80px 0px"
  });
  
  nextPageObserver.observe(document.querySelector("footer"));
}
if (("IntersectionObserver" in window) && ("fetch" in window)) {
  addLoadEvent(observeForInfiniteScroll);
}

function manuallyLoadNextPage() {
  event.preventDefault(); // Disable the default href click event
  loadNextListPage();
}

function checkForFetchSupport() {
  if (("fetch" in window) && (document.querySelector(".paginator-next-page"))) {
    document.querySelector(".paginator-next-page").setAttribute("onclick", "manuallyLoadNextPage();");
  }
}
addLoadEvent(checkForFetchSupport);

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

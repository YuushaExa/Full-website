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
      for (let i = 0; i < newPaginatorItems.length; i++) {
        currentPagePaginationContainer.append(newPaginatorItems[i].cloneNode(true));
      }

      let state = {
        "status": "pagination: New list items added",
        "previousPage": window.location.pathname + window.location.search,
        "currentPage": nextPage
      };
      history.replaceState(state, "", nextPage);

      let newNextLink = nextPageDom.querySelector(".paginator-next-page");
      if (newNextLink) {
        currentPageNextLink.setAttribute("href", newNextLink.getAttribute("href"));
      } else {
        if (currentPageNextLink.parentNode) currentPageNextLink.parentNode.removeChild(currentPageNextLink);
      }
    } else throw "response.ok was unsuccessful with status '" + response.statusText + " (" + response.status + ")'";
  } catch (error) {
    console.error("pagination: Caught a Fetch API exception loading the next page! - ", error);
  }
}

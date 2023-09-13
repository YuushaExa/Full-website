window.addEventListener('DOMContentLoaded', (event) => {

    pagefind = new PagefindUI({
        element: "#search",
        baseUrl: "/",
    });

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if(q){
        setTimeout(function(){
            console.log('Searching:'+q);
            pagefind.triggerSearch(q);
        }, 1000);
    }

});

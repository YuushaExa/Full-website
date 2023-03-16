var bg_url = document.querySelector(".image-first > img").src.split('&w')[0];
document.getElementsByTagName("body")[0].style.backgroundImage = "linear-gradient(-180deg,#1b1d1e8c 0,#1a1b1e,#201f24 100%),url('" + bg_url + "')";

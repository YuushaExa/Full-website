var bg_url = document.querySelector("img").src.split('&w')[0];
document.querySelector(".cover").style.backgroundImage = "linear-gradient(-180deg, rgb(27 29 30 / 55%) 0px, rgb(11 11 11) 100%),url('" + bg_url + "')";

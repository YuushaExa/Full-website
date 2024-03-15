document.addEventListener('DOMContentLoaded', function() {

var bg_url = document.querySelector("img").src;
document.querySelector(".cover").style.backgroundImage = `linear-gradient(to top, rgb(22, 24, 28) 0, rgb(22 24 28 / 10%) 60%), url('${bg_url}')`;    
document.querySelector(".cover").style.backgroundPosition = "center";
document.querySelector(".cover").style.backgroundSize = "cover";
});

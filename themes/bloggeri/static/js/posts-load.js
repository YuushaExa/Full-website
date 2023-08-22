<script>
  document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll("img[data-src]");
    function loadImagesLazily(e) {
      for (let i = 0; i < images.length; i++) {
        let rect = images[i].getBoundingClientRect();
        if (images[i].hasAttribute("data-src")
          && rect.bottom > 0 && rect.top < window.innerHeight
          && rect.right > 0 && rect.left < window.innerWidth) {
          images[i].setAttribute("src", images[i].getAttribute("data-src"));
          images[i].removeAttribute("data-src");
        }
      }
    };

    window.addEventListener('scroll', loadImagesLazily);
    window.addEventListener('resize', loadImagesLazily);
    loadImagesLazily();
  });
</script>

var numItems = $('#content-front-text #game-media img').length
$('.tablinks:nth-child(3)').text(numItems);

 var bg_url = $('#content-front-text #game-media img:nth-child(3)').data('src').replace(/&w=200&h=300/i, "&w=300&h=175");
 document.querySelector(".tablinks:nth-child(3)").style.backgroundImage = "linear-gradient(0deg, rgb(0 0 0 / 40%), rgb(109 109 109 / 40%)),url('" + bg_url + "')";

   var bg_url = $('#content-front-text #game-media img:nth-child(3)').data('src').replace(/&w=200&h=300/i, "&w=300&h=175");
 document.querySelector("#content-front-text").style.backgroundImage = "linear-gradient(0deg, rgb(0 0 0 / 40%), rgb(109 109 109 / 40%)),url('" + bg_url + "')";

var colorThief = new ColorThief();
$('#content-front-text').each(function() {
    var thumb = $(this);
    thumb.find('img').each(function() {
        thisColor = colorThief.getColor(this);
        thumb.parent().find('#game-description').css({
            background: 'rgb('+ thisColor +')'
         })
    });
});

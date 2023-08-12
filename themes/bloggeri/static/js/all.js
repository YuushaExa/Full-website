$('.game-info a').mouseover(function (event) {
      event.preventDefault(); 
    $('.game-info').append('<div class="link-pre"></div>');
    $('.link-pre').css('top',event.pageY - 25 ).css('left',event.pageX - 10 ).hide().load(this.href + ' .content ', function (data) {
    }).fadeIn(300).css('transform', 'translate(0, -15px)');
});
$('.game-info').mouseleave (function (event) {
  event.preventDefault(); 
  $('.link-pre').css('transform', 'translate(0, +5px)').fadeOut(200, function() {
              $(this).remove();
          });
});
$('.tool-show a').mouseover(function (event) { 
    event.preventDefault();
       $('#content-front-text').load(this.href + ' .post-title, .tab, #game-media, #game-info, #game-description, .game-links ', function (data) {
    });
          $("#content-front").css("z-index", "1").css('background','rgba(0,0,0,.5)');
          $("#content-front-text").css("opacity", "1");
});

$('.card-image img').mouseover(function (event) { 
var bg_url = $(this).prop('src');
document.querySelector("#content-front-text").style.backgroundImage = "linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(255, 0, 150, 0.3)),url('" + bg_url + "')";
});
      
var modal = document.getElementById("content-front");
window.onclick = function(event) {
if (event.target == modal) {
  $("#content-front-text").empty();
       $("#content-front-text").css("opacity", "0");
                              $("#content-front").css("z-index", "-1").css('background','unset');
}
}

$("body").on("click", ".tool-show a", function() {
 $('#content-front-text .game-media img:not(.gallery)').each(function(){
      var img_link =  $(this).attr('data-src').split('&h')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
       $('#content-front-text .game-media img').addClass('gallery');
        var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");
  });
});

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();


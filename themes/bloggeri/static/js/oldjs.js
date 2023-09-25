$('.game-media img').each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&w=260"); 
 var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");
 var img_link = $(this).attr('src').split('&w')[0];
$(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
  })

$("body").on("mouseover", "#content-front-text", function() {
 $('.game-media img:not(.gallery)').each(function(){
      var img_link =  $(this).attr('data-src').split('&h')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
       $('.game-media img').addClass('gallery');
  });
});





$('.game-media img').each(function(){
      var img_link =  $(this).attr('data-src').split('&h')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
  });

$("body").on("click", ".tablinks:nth-child(3)", function() {
 $('#content-front-text #game-media img:not(.gallery)').each(function(){
      var img_link =  $(this).attr('data-src').split('&h')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
       $('#content-front-text #game-media img').addClass('gallery');
        var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");
  });
});


$("body").on("mouseover", "#game-preview a", function(event) {
    event.preventDefault();
       $('#content-front-text').load(this.href + ' .post-title, .tab, .image-first, #game-media, #game-info, #game-description, .game-links, #GBinfo, #Jsontest ', function (data) {
    });
  var url = this;
  history.pushState({}, "", url);
          $("#content-front").css("z-index", "1").css('background','rgba(0,0,0,.5)');
          $("#content-front-text").css("opacity", "1");   
});

$("body").on("mouseover", "#game-preview a", function(event) {
{setTimeout(function(){
    jQuery.getScript("/js/posts-load.js");
}, 300)};
});

var modal = document.getElementById("content-front");
window.onclick = function(event) {
if (event.target == modal) {
  $("#content-front-text").empty();
    var url = "https://yuushaexa.github.io/";
  history.pushState({}, "", url);
       $("#content-front-text").css("opacity", "0");
                              $("#content-front").css("z-index", "-1").css('background','unset');
}
}

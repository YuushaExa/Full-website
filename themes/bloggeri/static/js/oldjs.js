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

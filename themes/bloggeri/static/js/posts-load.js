$('.game-media img').each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&h=200");

      var img_link =  $(this).attr('data-src').split('&h')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')

 var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");

  });

$('.image-reload').click(function(event){
   });

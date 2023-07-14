  $('.game-media img').each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&h=200");
})

 $('.game-media img').each(function() {
      var img_link =  $(this).attr('data-src').split('&h')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
    })
$('.game-media img').each(function(){

 var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");

  })

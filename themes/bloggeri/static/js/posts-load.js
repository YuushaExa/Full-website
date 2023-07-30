  $('.game-media img').each(function(lazy){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&h=200");
})

 $('.game-media img').each(function(lazy1) {
      var img_link =  $(this).attr('data-src').split('&h')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
    })
$('.game-media img').each(function(lazy2){

 var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");

  })

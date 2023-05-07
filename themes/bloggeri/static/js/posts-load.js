  $('.game-media img').each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&w=260"); 
 var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");
  })

 $('.game-media img').each(function() {
      var img_link =  $(this).attr('data-src');
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
    })

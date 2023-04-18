  $('.image-post img').each(function(){
  var $this = $(this); 
    $this.addClass('carousel-cell');
  $this.attr('data-src',$this.attr('data-src') + "&w=260"); 
 var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");
  })

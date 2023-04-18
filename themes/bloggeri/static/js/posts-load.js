  $('.image-post img').each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&w=260");
  $this.attr("src", $this).removeAttr("data-src");
})

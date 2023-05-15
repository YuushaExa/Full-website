  $('article img').slice(1).each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&w=260");
})

 $('.game-media img').each(function() {
      var img_link =  $(this).attr('data-src').split('&w')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
    })

$('.game-info').append('<div id="image-pre"></div>');
$('.game-media img').on('mouseover', function(e){
          var att = $(this).attr('src');  
     e.preventDefault();
    $('.paste').val(att);
 document.getElementById('image-pre').innerHTML = '<img src="'+ document.getElementById('LinkId').value +'" alt="Image" />';
});
$('.game-media img:first').on('load', function(e){
          var att = $(this).attr('src');  
     e.preventDefault();
    $('.paste').val(att);
 document.getElementById('image-pre').innerHTML = '<img src="'+ document.getElementById('LinkId').value +'" alt="Image" />';
});

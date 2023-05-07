  $('article img').slice(1).each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&w=260");
})

 $('article img').slice(1).each(function() {
      var img_link =  $(this).attr('data-src').split('&w')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
    })

$('.game-media img').on('mouseover', function(e){
          var att = $(this).attr('src');  
     e.preventDefault();
    $('.paste').val(att);
 document.getElementById('image-pre').innerHTML = '<img src="'+ document.getElementById('LinkId').value +'" alt="Image" />';
});

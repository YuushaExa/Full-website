  $('article img').slice(1).each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&h=260");
})

 $('.game-media img').each(function() {
      var img_link =  $(this).attr('data-src').split('&h')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
    })

$('.game-info').append('<div id="image-pre"></div>');
$('.game-media').append('<button id="left-button">Left</button>');
$('.game-media').append('<button id="right-button">Right</button>');
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


const rightBtn = document.querySelector('#right-button');
const leftBtn = document.querySelector('#left-button');

rightBtn.addEventListener("click", function(event) {
  const conent = document.querySelector('.game-media p');
  conent.scrollLeft += 300;
  event.preventDefault();
});

leftBtn.addEventListener("click", function(event) {
  const conent = document.querySelector('.game-media p');
  conent.scrollLeft -= 300;
  event.preventDefault();
});

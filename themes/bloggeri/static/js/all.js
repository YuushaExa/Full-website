$('.card-image').hover(function (event) { 
    event.preventDefault(); 
    $(this).append('<div id="game-preview">X</div>');
    }, function() {
    $('#game-preview').remove();
});

$('.game-info a').mouseover(function (event) {
      event.preventDefault(); 
    $('.game-info').append('<div class="link-pre"></div>');
    $('.link-pre').css('top',event.pageY - 25 ).css('left',event.pageX - 10 ).hide().load(this.href + ' .content ', function (data) {
    }).fadeIn(300).css('transform', 'translate(0, -15px)');
});
$('.game-info').mouseleave (function (event) {
  event.preventDefault(); 
  $('.link-pre').css('transform', 'translate(0, +5px)').fadeOut(200, function() {
              $(this).remove();
          });
});
$('#game-preview').mouseover(function (event) { 
    event.preventDefault();
       $('#content-front-text').load(this.href + ' .post-title, .tab, .image-first, #game-media, #game-info, #game-description, .game-links ', function (data) {
    });
          $("#content-front").css("z-index", "1").css('background','rgba(0,0,0,.5)');
          $("#content-front-text").css("opacity", "1");       
});

   $('#game-preview').mouseover(function ()
{setTimeout(function(){
    jQuery.getScript("/js/posts-load.js");
}, 300);

});

var modal = document.getElementById("content-front");
window.onclick = function(event) {
if (event.target == modal) {
  $("#content-front-text").empty();
       $("#content-front-text").css("opacity", "0");
                              $("#content-front").css("z-index", "-1").css('background','unset');
}
}

$("body").on("click", ".tablinks:nth-child(3)", function() {
 $('#content-front-text #game-media img:not(.gallery)').each(function(){
      var img_link =  $(this).attr('data-src').split('&h')[0];
      $(this).wrap('<a href='+ img_link +' data-fancybox="gallery"></a>')
       $('#content-front-text #game-media img').addClass('gallery');
        var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");
  });
});

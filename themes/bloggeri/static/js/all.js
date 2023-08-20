$('.card-image a').hover(function (event) { 
    event.preventDefault(); 
  var link1 =  $(this).attr('href');
    $(this).append('<div id="game-preview"><a href="'+ link1 +'"></a><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="48"><path fill="#fff" d="M484 809q16 0 27-11t11-27-11-27-27-11-27 11-11 27 11 27 27 11zm-35-146h59q0-26 6.5-47.5T555 566q31-26 44-51t13-55q0-53-34.5-85T486 343q-49 0-86.5 24.5T345 435l53 20q11-28 33-43.5t52-15.5q34 0 55 18.5t21 47.5q0 22-13 41.5T508 544q-30 26-44.5 51.5T449 663zm31 313q-82 0-155-31.5t-127.5-86-86-127.5T80 576q0-83 31.5-156t86-127T325 207.5 480 176q83 0 156 31.5T763 293t85.5 127T880 576q0 82-31.5 155T763 858.5t-127 86T480 976zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916zm0-340z"></path></svg></div>');
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

$('#game-preview a').mouseover(function (event) { 
    event.preventDefault();
       $('#content-front-text').load(this.href + ' .post-title, .tab, .image-first, #game-media, #game-info, #game-description, .game-links ', function (data) {
    });
          $("#content-front").css("z-index", "1").css('background','rgba(0,0,0,.5)');
          $("#content-front-text").css("opacity", "1");       
});

   $('#game-preview a').mouseover(function ()
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

$('.tool-show a').mouseover(function (event) { 
    event.preventDefault();
    $('#content-front-text').load(this.href + ' .image-first, .post-title, .category, .content p:first-of-type, .game-info, .game-media ', function (data) {
    });
          $("#content-front").css("z-index", "1");
          $("#content-front-text").css("opacity", "1");
            $.getScript("/js/posts-load.js");
});

var modal = document.getElementById("content-front");

window.onclick = function(event) {
  if (event.target == modal) {
  $("#content-front-text").empty();
       $("#content-front-text").css("opacity", "0");
                              $("#content-front").css("z-index", "-1");
}
}

$('.game-info a').mouseover(function (event) {
      event.preventDefault(); 
    $('.game-info').append('<div class="link-pre"></div>');
    $('.link-pre').css('top',event.pageY + 25 ).css('left',event.pageX + 10 ).hide().load(this.href + ' .content ', function (data) {
    }).fadeIn(300).css('transform', 'translate(0, -15px)');
});

$('.game-info').mouseout(function (event) {
  event.preventDefault(); 
  $('.link-pre').css('transform', 'translate(0, +5px)').fadeOut(200, function() {
              $(this).remove();
          });
});

var colorThief = new ColorThief();

$('.image-first').each(function() {
    var thumb = $(this);
    thumb.find('img').each(function() {
        thisColor = colorThief.getColor(this);
        thumb.parent().find('.game-info').css({
            borderTop: '30px solid rgb('+ thisColor +')'
        })
    });
});

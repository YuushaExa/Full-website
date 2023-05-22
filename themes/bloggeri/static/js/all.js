Fancybox.bind("[data-fancybox]", {
});


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


$('.tool-show a').mouseover(function (event) {
      event.preventDefault(); 
    $(this).append('<div class="link-pre"></div>');
 $('.link-pre').css('top',event.pageY + 25 ).css('left',event.pageX + 10 ).hide().load(this.href + ' .image-first, .post-title, .category, .game-info, .game-media ', function (data) {
    }).fadeIn(300).css('transform', 'translate(0, -15px)');
      });
$('.card').mouseleave(function (event) {
  event.preventDefault(); 
  $('.link-pre').css('transform', 'translate(0, +5px)').fadeOut(200, function() {
              $(this).remove();
          });
});








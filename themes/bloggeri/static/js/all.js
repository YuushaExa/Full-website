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


$('.card-imal').each(function() {
    var thumb = $(this);
    thumb.find('img').each(function() {
        thisColor = colorThief.getColor(this);
        thumb.parent().find('.card-conte').css({
            background: 'rgb('+ thisColor +')'
        })
        thumb.parent().find('.catego').css({
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba('+ thisColor +') 100%)'
         })
    });
});

const cards = document.querySelectorAll(".card");
const colorThief = new ColorThief();

cards.forEach((card) => {
  const wrapper = card.querySelectorAll(".card-image")[0];
  const img = wrapper.querySelectorAll("img")[0];

  wrapper.style.cssText += `background-image: url(${img.src})`;
});

window.onload = () => {
  detectColors();
};

function detectColors() {
  cards.forEach((card) => {
    const wrapper = card.querySelectorAll(".card-image")[0];
    const cta = card.querySelectorAll(".card-content")[0];
    const img = wrapper.querySelectorAll("img")[0];
    const rgb = getColorData(img);
    let lum = tinycolor(rgb).getLuminance();

    card.style.cssText += `background-color: ${rgb}`;
    cta.style.cssText += `background-color: ${rgb}; color: ${
      lum <= 0.4 ? `#FFFFFF` : `#000000`
    }`;
  });
}

function getColorData(img) {
  let rgbArray = colorThief.getColor(img);
  return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
}

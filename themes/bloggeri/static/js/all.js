
$('.btn5').click(function () { 
  $.ajax({
    type: "GET",
    url: "https://www.reddit.com/r/jrpg/search.json?q=Breath of Fire II&restrict_sr=true",
    success: function (results) {
      currText = '';
      for (i=0;i<results.data.children.length;i++) {
        currText = currText+ 
        "<img src='"+results.data.children[i].data["thumbnail"]+"'></img>";
            currText = currText+ 

        "<a href='"+results.data.children[i].data["permalink"]+"'>'"+results.data.children[i].data["title"]+"'</a>";
      }
      
      $('.text5').html(currText);
    }
  });
});

$('.card-image a').hover(function (event) { 
    event.preventDefault(); 
  var link1 =  $(this).attr('href');
    $(this).append('<div id="game-preview"><a href="'+ link1 +'"><svg viewBox="0 0 100 100" class="Preview"><path d="M3.563-.004a3.573 3.573 0 0 0-3.527 4.09l-.004-.02v28.141c0 1.973 1.602 3.57 3.57 3.57s3.57-1.598 3.57-3.57V12.218v.004l22.461 22.461a3.571 3.571 0 0 0 6.093-2.527c0-.988-.398-1.879-1.047-2.523L12.218 7.172h19.989c1.973 0 3.57-1.602 3.57-3.57s-1.598-3.57-3.57-3.57H4.035a3.008 3.008 0 0 0-.473-.035zM96.333 0l-.398.035.02-.004h-28.16a3.569 3.569 0 0 0-3.57 3.57 3.569 3.569 0 0 0 3.57 3.57h19.989L65.323 29.632a3.555 3.555 0 0 0-1.047 2.523 3.571 3.571 0 0 0 6.093 2.527L92.83 12.221v19.985a3.569 3.569 0 0 0 3.57 3.57 3.569 3.569 0 0 0 3.57-3.57V4.034v.004a3.569 3.569 0 0 0-3.539-4.043l-.105.004zM3.548 64.23A3.573 3.573 0 0 0 .029 67.8v28.626-.004l.016.305-.004-.016.004.059v-.012l.039.289-.004-.023.023.121-.004-.023c.074.348.191.656.34.938l-.008-.02.055.098-.008-.02.148.242-.008-.012.055.082-.008-.012c.199.285.43.531.688.742l.008.008.031.027.004.004c.582.461 1.32.742 2.121.762h.004l.078.004h28.61a3.569 3.569 0 0 0 3.57-3.57 3.569 3.569 0 0 0-3.57-3.57H12.224l22.461-22.461a3.569 3.569 0 0 0-2.492-6.125l-.105.004h.008a3.562 3.562 0 0 0-2.453 1.074L7.182 87.778V67.793a3.571 3.571 0 0 0-3.57-3.57h-.055.004zm92.805 0a3.573 3.573 0 0 0-3.519 3.57v19.993-.004L70.373 65.328a3.553 3.553 0 0 0-2.559-1.082h-.004a3.573 3.573 0 0 0-3.566 3.57c0 1.004.414 1.91 1.082 2.555l22.461 22.461H67.802a3.57 3.57 0 1 0 0 7.14h28.606c.375 0 .742-.059 1.082-.168l-.023.008.027-.012-.02.008.352-.129-.023.008.039-.02-.02.008.32-.156-.02.008.023-.016-.008.008c.184-.102.34-.207.488-.32l-.008.008.137-.113-.008.004.223-.211.008-.008c.156-.164.301-.34.422-.535l.008-.016-.008.016.008-.02.164-.285.008-.02-.008.016.008-.02c.098-.188.184-.406.246-.633l.008-.023-.004.008.008-.023a3.44 3.44 0 0 0 .121-.852v-.004l.004-.078V67.804a3.569 3.569 0 0 0-3.57-3.57h-.055.004z"></path></svg></a></div>');
 }, function() {
    $('#game-preview').remove();
});

$('.game-info a').mouseover(function (event) {
      event.preventDefault(); 
    $('.game-info').append('</div><div class="link-pre"></div>');
    $('.link-pre').css('top',event.pageY - 25 ).css('left',event.pageX - 10 ).hide().load(this.href + ' .content ', function (data) {
    }).fadeIn(300).css('transform', 'translate(0, -15px)');
});
$('.game-info').mouseleave (function (event) {
  event.preventDefault(); 
  $('.link-pre, .link-pre1').css('transform', 'translate(0, +5px)').fadeOut(200, function() {
              $(this).remove();
          });
});

$("body").on("mouseover", "#game-preview a", function(event) {
    event.preventDefault();
       $('#content-front-text').load(this.href + ' .post-title, .tab, .image-first, #game-media, #game-info, #game-description, .game-links, #GBinfo, #Jsontest ', function (data) {
    });
          $("#content-front").css("z-index", "1").css('background','rgba(0,0,0,.5)');
          $("#content-front-text").css("opacity", "1");   
});

$("body").on("mouseover", "#game-preview a", function(event) {
{setTimeout(function(){
    jQuery.getScript("/js/posts-load.js");
}, 300)};
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
       $('#content-front-text #game-media img').addClass('gallery').addClass('visible');
        var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");
  });
});

$("body").on("click", "#button1", function() {
    var iframe = $("#GBframe");
    iframe.attr("src", iframe.data("src")); 
});

$('.Platforms a').mouseover(function (event) {
      event.preventDefault(); 
    $('.Platforms').append('</div><div class="link-pre"></div>');
    $('.link-pre').css('top',event.pageY - 25 ).css('left',event.pageX - 10 ).hide().load("/search" + ' #this.location.search ', function (data) {
    }).fadeIn(300).css('transform', 'translate(0, -15px)');
});
$('.Platforms a').mouseleave (function (event) {
  event.preventDefault(); 
  $('.link-pre').css('transform', 'translate(0, +5px)').fadeOut(200, function() {
              $(this).remove();
          });
});

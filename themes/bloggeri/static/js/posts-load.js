var numItems = $('#content-front-text #game-media img').length
$('.tablinks:nth-child(3)').text(numItems);

 var bg_url = $('#content-front-text #game-media img:nth-child(3)').data('src').replace(/&w=200&h=300/i, "&w=300&h=175");
 document.querySelector(".tablinks:nth-child(3)").style.backgroundImage = "linear-gradient(0deg, rgb(0 0 0 / 40%), rgb(109 109 109 / 40%)),url('" + bg_url + "')";

   var bg_url = $('#content-front-text #game-media img:nth-child(3)').data('src').replace(/&w=200&h=300/i, "&w=300&h=175");
 document.querySelector("#content-front-text").style.backgroundImage = "linear-gradient(0deg, rgb(0 0 0 / 40%), rgb(109 109 109 / 40%)),url('" + bg_url + "')";

var colorThief = new ColorThief();
$('#content-front-text').each(function() {
    var thumb = $(this);
    thumb.find('img').each(function() {
        thisColor = colorThief.getColor(this);
        thumb.parent().find('#game-description').css({
            background: 'rgb('+ thisColor +')'
         })
    });
});

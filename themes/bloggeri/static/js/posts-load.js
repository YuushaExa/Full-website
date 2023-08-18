function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

   var bg_url = $('#content-front-text .image-first img').prop('src').replace(/&w=200&h=300/i, "&w=300&h=175");
 document.querySelector("#content-front-text").style.backgroundImage = "linear-gradient(0deg, rgb(0 0 0 / 40%), rgb(109 109 109 / 40%)),url('" + bg_url + "')";

var colorThief = new ColorThief();
$('.image-first').each(function() {
    var thumb = $(this);
    thumb.find('img').each(function() {
        thisColor = colorThief.getColor(this);
        thumb.parent().find('#game-description').css({
            background: 'rgb('+ thisColor +')'
         })
    });
});

var numItems = $('#content-front-text #game-media img').length
$('.tablinks:nth-child(3)').text(numItems);

 
 var bg_url = $('#content-front-text #game-media img:nth-child(3)').data('src').replace(/&w=200&h=300/i, "&w=300&h=175");
 document.querySelector(".tablinks:nth-child(3)").style.backgroundImage = "linear-gradient(0deg, rgb(0 0 0 / 40%), rgb(109 109 109 / 40%)),url('" + bg_url + "')";

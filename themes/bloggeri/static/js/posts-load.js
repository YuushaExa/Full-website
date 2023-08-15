
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
var colorThief = new ColorThief();
$('.image-first').each(function() {
    var thumb = $(this);
    thumb.find('img').each(function() {
        thisColor = colorThief.getColor(this);
        thumb.parent().find('#game-description').css({
            background: 'rgb('+ thisColor +')'
         })
      thumb.parent().find('#content-front-text').css({
            background: 'linear-gradient(0deg, rgba('+ thisColor +', 0.3), rgba('+ thisColor +', 0.3)),url(' + bg_url + ')'
         })
    });
});

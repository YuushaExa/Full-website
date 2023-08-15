
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
document.querySelector("#content-front-text").style.backgroundImage = "linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(255, 0, 150, 0.3)),url('" + bg_url + "')";

const cards = document.querySelectorAll("#content-front-text");
const colorThief = new ColorThief();
cards.forEach((card) => {
  const wrapper = card.querySelectorAll(".image-first")[0];
  const img = wrapper.querySelectorAll("img")[0];
  wrapper.style.cssText += `background-image: url(${img.src})`;
});
window.onload = () => {
  detectColors();
};
function detectColors() {
  cards.forEach((card) => {
    const wrapper = card.querySelectorAll(".image-first")[0];
    const cta = card.querySelectorAll("#game-description")[0];
    const img = wrapper.querySelectorAll("img")[0];
    const rgb = getColorData(img);
    let lum = tinycolor(rgb).getLuminance();
    cta.style.cssText += `background-color: ${rgb}; color: ${
      lum <= 0.4 ? `#FFF` : `#000`
    }; text-shadow: 0px 0px 3px ${
      lum <= 0.4 ? `#000` : `#FFF`
    }`;
  });
}
function getColorData(img) {
  let rgbArray = colorThief.getColor(img);
  return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
}

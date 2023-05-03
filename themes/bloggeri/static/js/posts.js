  $('article img').slice(1).each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&w=260");
})

var Swipes = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
});

class Lightbox{
  constructor(){
   this.init()
  }

  init(){
   this.container = document.createElement('div');
   this.container.id = 'lightbox';
   document.body.appendChild(this.container);

   this.lightboxImg = document.createElement('img');
   this.container.appendChild(this.lightboxImg);

   this.addListeners();
  }

  addListeners(){
   const images = document.querySelectorAll('.game-media img');
   images.forEach(img => {
    img.addEventListener('click', ()=> this.galleryImgClicked(img))
   })

   this.container.addEventListener('click', ()=>{
    this.hideLightbox()
   })

   document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') this.hideLightbox()
   })
  }

  hideLightbox(){
   this.container.classList.remove('active')
  }

  galleryImgClicked = (img) => {
    this.lightboxImg.src = img.src.split('&w')[0];
    this.container.classList.add('active')
  }
}

const lightbox = new Lightbox()

$('.game-media img').on('mouseover', function(e){
          var att = $(this).attr('src');  
     e.preventDefault();
    $('.paste').val(att);
 document.getElementById('image-pre').innerHTML = '<img src="'+ document.getElementById('LinkId').value +'" alt="Image" />';
});

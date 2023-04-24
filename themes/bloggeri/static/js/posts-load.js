  $('.game-media img').each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&w=260"); 
 var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");
  })

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

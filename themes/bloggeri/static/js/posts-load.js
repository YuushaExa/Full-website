  $('.image-post img').each(function(){
  var $this = $(this); 
  $this.attr('data-src',$this.attr('data-src') + "&w=260"); 
 var source = $(this).attr("data-src");
$(this).attr("src", source).removeAttr("data-src");
  })

const images = document.querySelectorAll('[data-src]');
const config = {
  rootMargin: '0px 0px 50px 0px',
  threshold: 0
};
let loaded = 0;

let observer = new IntersectionObserver(function (entries, self) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      preloadImage(entry.target);
      self.unobserve(entry.target);
    }
  });
}, config);

images.forEach(image => {
  observer.observe(image);
});

function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) { return; }
  img.src = src;
}             

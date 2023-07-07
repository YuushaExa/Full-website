const images1 = document.querySelectorAll('[data-src]');
const config1 = {
  rootMargin: '0px 0px 50px 0px',
  threshold: 0
};
let loaded1 = 0;

let observer1 = new IntersectionObserver(function (entries1, self1) {
  entries1.forEach(entry1 => {
    if (entry1.isIntersecting) {
      preloadImage(entry1.target);
      self1.unobserve(entry1.target);
    }
  });
}, config1);

images1.forEach(image1 => {
  observer1.observe(image1);
});

function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) { return; }
  img.src = src;
}               

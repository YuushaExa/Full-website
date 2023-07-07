const images1 = document.querySelectorAll('[data-src]');
const config1 = {
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

images1.forEach(image => {
  observer.observe(image);
});

function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) { return; }
  img.src = src;
}               

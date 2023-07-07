function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) { return; }
  img.src = src;
}              

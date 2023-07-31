const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('Элемент пересёк границу области и всё ещё соприкасается с ней!')

      observer.unobserve(entry.target)
    }
  })
}

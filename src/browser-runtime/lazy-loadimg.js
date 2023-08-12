document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img[data-src]");

  const lazyLoad = () => {
    lazyImages.forEach((img) => {
      // 元素的上边界相对于视口的顶部的距离 && 元素的下边界相对于视口的底部的距离 大于 0
      if (img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) {
        img.src = img.getAttribute("data-src");

        // img.removeAttribute("data-src");
      }
    });
  };

  // 初次加载时触发
  lazyLoad();

  window.addEventListener("scroll", lazyLoad);
});

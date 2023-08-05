const url1 = "https://lh3.googleusercontent.com/a/AAcHTtekQ5cZlrGObUDi9MTbNp3lwCuHM3UZNRwbYwEF8SLgmuU=s192-c-mo";
const url2 = "https://www.bing.com/th?id=OHR.AtlanticPuffin_ZH-CN8523220989_1920x1080.webp&qlt=50";

const loadImg = (src) =>
  new Promise((resolve, reject) => {
    const imgDom = document.createElement("img");
    imgDom.onload = () => {
      resolve(imgDom);
    };

    imgDom.onerror = (err) => {
      const error = new Error(`加载图片失败${err}`);
      reject(error);
    };

    imgDom.src = src;
  });

loadImg(url1)
  .then((img1) => {
    console.log(img1.width);
    return img1;
  })
  .then((img1) => {
    console.log(img1.height);
    return loadImg(url2);
  })
  .then((img2) => {
    console.log(img2.width);
    return img2;
  })
  .then((img2) => {
    console.log(img2.height);
  });

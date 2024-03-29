// 防抖：频繁操作，保持频率触发
const div1 = document.getElementById("div1");

// let timer = null;

// div1.addEventListener("drag", (e) => {
//   if (timer) return;

//   timer = setTimeout(() => {
//     console.log(e.offsetX, e.offsetY);
//     timer = null;
//   }, 500);
// });

function throttle(fn, delay) {
  let timer = null;

  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

div1.addEventListener(
  "drag",
  throttle((e) => {
    console.log(e.offsetX, e.offsetY);
  }, 200)
);

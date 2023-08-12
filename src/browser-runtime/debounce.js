// 防抖：频繁操作，最后触发

const input1 = document.getElementById("input1");
// let timer = null;

// input1.addEventListener("keyup", () => {
//   if (timer) {
//     clearTimeout(timer);
//   }

//   timer = setTimeout(() => {
//     console.log(input1.value);

//     timer = null;
//   }, 500);
// });

function debounce(fn, delay) {
  let timer = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

input1.addEventListener(
  "keyup",
  debounce(() => {
    console.log(input1.value);
  }, 600)
);

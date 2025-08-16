// /* eslint-disable no-use-before-define */
// // 题目 1
// async function async1() {
//   console.log(1);
//   await async2();
//   console.log("AAA");
// }

const MyPromise = require("./myPromise");

// // 关键点：async 函数返回的是一个 Promise 对象
// async function async2() {
//   return Promise.resolve(2);
// }

// // 作为参照，如果没有 async 又会对输出结果有什么影响
// // function async2() {
// //   return Promise.resolve(2);
// // }

// async1();

// Promise.resolve()
//   .then(() => {
//     console.log(3);
//   })
//   .then(() => {
//     console.log(4);
//   })
//   .then(() => {
//     console.log(5);
//   });

// // 请写出结果

const nested = MyPromise.resolve(MyPromise.resolve(1));
nested.then(console.log);

// 形成闭包的两种场景
// // 1、函数作为返回值被返回
// function print() {
//   const a = 100;

//   return function () {
//     console.log(a); // 输出 100，a 是 声明的地方
//   };
// }

// const a = 200;
// const fn = print();
// fn();

// //2、 函数作为参数被传入
// function create(fn) {
//   const a = 100;
//   fn();
// }

// const a = 200;
// function fn() {
//   console.log(a);
// }
// create(fn);

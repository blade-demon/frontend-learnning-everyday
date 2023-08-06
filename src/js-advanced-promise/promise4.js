// const p1 = Promise.resolve().then(() => 100);

// p1.then(() => {
//   console.log("123");
// });

// const p2 = new Promise(() => {
//   throw new Error("then error");
// });

// p2.then(() => console.log("456")).catch((err) => {
//   console.error("err100", err);
// });

const p3 = new Promise((resolve, reject) => reject(new Error("then error")))
  .catch((err) => console.log(err))
  .then(() => console.log(100));

console.log("p3", p3);

// then 正常返回 resolved, 里面有报错则返回 rejected
// catch 正常返回 resolved，里面有报错则返回 rejected

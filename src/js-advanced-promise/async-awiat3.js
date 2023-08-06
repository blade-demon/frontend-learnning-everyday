async function async1() {
  console.log("async1 start");
  await async2();
  // await 后面都是微任务
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
});

async1();

new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise2");
});

console.log("script end");

/*
先看当前是否有剩余微任务需要执行，执行完没有微任务以后，开始
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/

console.log(100);

// 宏任务
setTimeout(() => {
  console.log(200);
});

// 微任务
Promise.resolve().then(() => {
  console.log(300);
});

console.log(400);

// 宏任务： setTimeout setInterval, Ajax, DOM 事件
// 微任务： Promise, asnyc/await
// 微任务执行实际比宏任务要早

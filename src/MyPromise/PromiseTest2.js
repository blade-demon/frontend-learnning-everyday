const p1 = new Promise((resolve) => {
  resolve();
});

const p2 = new Promise((resolve) => {
  resolve(p1);
});

p2.then(() => {
  console.log(1);
})
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });

p1.then(() => {
  console.log(4);
})
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

// 微队列

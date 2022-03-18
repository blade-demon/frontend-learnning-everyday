const basket = ["apples", "oranges", "grapes"];

// 1
for (let i = 0; i < basket.length; i++) {
  console.log(basket[i]);
}

// 2
basket.forEach((item) => {
  console.log(item);
});

// for of
// Iterating - arrays,strings
for (const item of basket) {
  console.log(item);
}

// for in - properties
// enumerating - objects
const detailBaskets = {
  apples: 5,
  oranges: 10,
  grapes: 1000,
};
for (const key in detailBaskets) {
  console.log(key);
}

// for...in 和 for...of的区别
// 1. for...in 用来·枚举·对象
// 2. for...of 用来·迭代··数组

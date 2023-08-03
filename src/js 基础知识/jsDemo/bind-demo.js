function fn1(a, b, c) {
  console.log("this", this);
  console.log(a, b, c);
  return `this is fn1`;
}

// const fn2 = fn1.bind({ x: 100 }, 100, 200, 300);
// const res = fn2();
// console.log(res);

// 模拟 bind
Function.prototype.bind2 = function () {
  // 将所有参数拆解为数组
  const args = Array.prototype.slice.call(arguments);
  // 获取 this（数组第一项）
  const t = args.shift();

  // 注意：此处使用了闭包，fn1.bind(...)中的 fn1
  const self = this;

  // 返回一个函数
  return function () {
    return self.apply(t, args);
  };
};

const fn2 = fn1.bind1({ x: 100 }, 100, 200, 300);
const res = fn2();
console.log(res);

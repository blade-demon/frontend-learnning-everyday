// 数组扁平化
var arr = [1, 2, 3, 4, [5, 6, 7, 8, [9, 10]]];
console.log(flatten(arr)); // 1,2,3,4,5,6,7,8,9,10

// 递归
function flatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

// toString  适用于数组元素都是数字
function flatten(arr) {
  return arr
    .toString()
    .split(",")
    .map((item) => +item);
}

// reduce
function flatten(arr) {
  return arr.reduce(
    (prev, next) => prev.concat(Array.isArray(next) ? flatten(next) : next),
    []
  );
}

// es6 扩展运算符
// var arr = [1, [2, [3, 4]]];
// console.log([].concat(...arr)); // [1, 2, [3, 4]]
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

// 奇技淫巧
function flatten(arr) {
  return arr.join(",").split(",");
}

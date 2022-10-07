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

// reduce + 递归
function flatten(arr) {
  return arr.reduce(
    (prev, next) => prev.concat(Array.isArray(next) ? flatten(next) : next),
    []
  );
}

// 进阶版，通过参数控制“拉平”层数
function flatten(arr, num) {
  return num > 0
    ? arr.reduce(
        (prev, next) =>
          prev.concat(Array.isArray(next) ? flatten(next, num - 1) : next),
        []
      )
    : arr.slice();
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

// 利用栈的思想
function flatten(arr) {
  const res = [];
  // 将数组元素拷贝至栈，直接赋值会改变原数组
  const stack = [].concat(arr);

  //如果栈不为空，则循环遍历
  while (stack.length > 0) {
    const val = stack.pop();
    if (Array.isArray(val)) {
      // 如果元素是数组则再次入栈，并且展开一层
      stack.push(...val);
    } else {
      // 如果不是数组将其取出直接放入结果数组中
      res.unshift(val);
    }
  }

  return res;
}

// 奇技淫巧
function flatten(arr) {
  return arr.join(",").split(",");
}

// 正则和JSON方法共同处理
function flatten(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g, "");
  str = "[" + str + "]";
  return JSON.parse(str);
}

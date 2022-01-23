// 生成0-n的数组
const generateArray = (n) => Array.from({ length: n }).map((k, v) => v);
const generateArray2 = (n) =>
  Array(n)
    .fill()
    .map((k, v) => v);

generateArray(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
generateArray2(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

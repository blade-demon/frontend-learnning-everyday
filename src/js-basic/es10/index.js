// 平铺数组
const array1 = [1, 2, [3, 4, [5]]];
array1.flat(); // [1, 2, 3, 4, 5]

// 多层平铺
const array2 = [1, 2, [3, 4, [5, [6, 7, [8, 9]]]]];
array2.flat(4); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 清空空值
const entries = ["bob", "salyy", , , , , , "condy"];
entries.flat();

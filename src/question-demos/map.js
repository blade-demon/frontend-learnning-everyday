/**
 * map和 object 的区别
 * 1、map 可以以任意类型为 key
 * 2、map 是有序结构
 * 3、map 操作也很快
 */
//

// const m = new Map([
//   ["key1", "hello"],
//   ["key2", "123"],
//   ["key3", { a: 1 }],
// ]);

// // map 常用操作
// m.set("name", "ceshi ");
// m.get("key1");
// m.delete("key2");
// m.has("key3");

// m.forEach((value, key) => {
//   console.log("key", key);
//   console.log("value", value);
// });

// console.log(m.size);
// console.log(m);

// // 1、Map 以任意类型为 key
// const o = { name: "xxxx" };
// m.set(o, "object key");

// const fn = () => {};

// m.set(fn, "fn key");

// console.log(m);

// 2、object 无序
// const obj = { 2: 30, 1: 30, 3: 30 };
// const obj2 = { 1: 30, 2: 30, 3: 30 };
// console.log(Object.keys(obj));
// console.log(Object.keys(obj2));

// 3. 测试对比 Map 和 object 的效率
const obj = {};
for (let i = 0; i < 100 * 10000; i++) {
  obj[`${i}`] = i;
}

console.time("obj find");
obj["5000000"];
console.timeEnd("obj find");
console.time("obj delete");
delete obj["5000000"];
console.timeEnd("obj delete");

const m = new Map();

for (let i = 0; i < 100 * 10000; i++) {
  m.set(`${i}`, i);
}

console.time("map find");
m.get["5000000"];
console.timeEnd("map find");
console.time("map delete");
m.delete("5000000");
console.timeEnd("map delete");

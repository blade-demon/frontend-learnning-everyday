/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 */
function deepClone(obj = {}) {
  let result;
  if (obj == null || typeof obj !== "object") return obj;

  obj instanceof Array ? (result = []) : (result = {});

  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      result[p] = deepClone(obj[p]);
    }
  }

  return result;
}

const obj1 = {
  age: 20,
  name: "xxx",
  address: {
    city: "beijing",
  },
  arr: ["a", "b", "c"],
};

const obj2 = deepClone(obj1);

obj2.address.city = "shanghai";
obj2.arr[0] = "a1";
console.log(obj1.address.city);
console.log(obj1.arr[0]);

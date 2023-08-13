function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

// 全相等
function isEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型比较
    return obj1 === obj2;
  }

  // 对象 1 和对象 2 是同一个对象
  if (obj1 === obj2) return true;

  // 判断属性个数是否相等
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (const key in obj1) {
    if (Object.hasOwnProperty.call(obj1, key)) {
      const res = isEqual(obj1[key], obj2[key]);
      if (!res) {
        return false;
      }
    }
  }

  return true;
}

const obj1 = {
  a: 100,
  b: {
    x: 100,
    y: 200,
    z: [1, 2, 3, 4],
  },
};

const obj2 = {
  a: 100,
  b: {
    x: 100,
    y: 200,
    z: [1, 2, 3],
  },
};

console.log(isEqual(obj1, obj2));

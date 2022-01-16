/**
 * let/const/var
 */
// 考点1. 引用类型和基本数据类型
const obj = {
  teacher: "云影",
  leader: "小可",
};

obj.leader = "步步";

const arr = ["云影", "小可"];
arr[0] = "aaaa";

console.log(obj);
console.log(arr);

// 考点2. 不允许修改对象属性：freeze冻结对象
Object.freeze(obj);

// 考点3. freeze 只能冻结第一层，嵌套引用类型需要遍历递归
const obj2 = {
  teacher: "云影",
  leader: "小可",
  students: ["张三", "李四"],
};

Object.freeze(obj2);
// 冻结成功
obj2.teacher = "";
// 冻结失败
obj2.students[0] = "";

console.log(obj2);

// 考点4. 实战操作，深度冻结，利用循环遍历
function deepFreeze(obj) {
  // 2. 主执行逻辑
  Object.freeze(obj);
  // 3. 逐级深入
  (Object.keys(obj) || []).forEach((key) => {
    let innerObj = obj[key];
    if (typeof innerObj === "object") {
      // 1. 递归模式确定
      deepFreeze(innerObj);
    }
  });
}

deepFreeze(obj2);
obj2.students[0] = "测试";
console.log("冻结成功" + JSON.stringify(obj2));

/**
 * 箭头函数
 * 主要考点：箭头函数和普通函数的区别
 */

// this上下文
const obj2 = {
  teacher: "云影",
  leader: "小可",
  students: ["张三", "李四"],
  getTeacher: function () {
    console.log("teacher is:", this.teacher);
    return this.teacher;
  },
  getLeader: () => {
    console.log("leader is:", this.leader);
    return this.leader;
  },
};

obj2.getTeacher(); // 云影
obj2.getLeader(); // undefined，原因：此时this是指window

/**
 * 场景1: dom操作callback时
 * 注意：浏览器中执行报错！！
 */
const btn = document.querySelector("#btn");
btn.addEventListener("click", function () {
  // 此处this是指btn对应的dom而为window
  this.style.color = "#fff";
});

/**
 * 场景2: 类操作，箭头函数无法完整构造类
 */
function Obj1(teacher, leader) {
  this.teacher = teacher;
  this.leader = leader;
}

const Obj2 = (teacher, leader) => {
  this.teacher = teacher;
  this.leader = leader;
};
// 实例验证
const o1 = new Obj1("zhangsan", "lisi");
// const o2 = new Obj2("zhangsan", "lisi");
console.log(o1); // Obj1 { teacher: 'zhangsan', leader: 'lisi' }
// console.log(o2); // TypeError: Obj2 is not a constructor

// 进一步，原型方法
Obj1.prototype.learn = function () {
  console.log(this.teacher, this.leader);
};

// 上下文
Obj1.prototype.learn = () => {
  console.log(this.teacher, this.leader);
};

o1.learn();

/**
 * 场景3：箭头函数参数特性
 */
const test = function (teacher) {
  console.log(arguments);
};

const test2 = (teacher) => {
  console.log(arguments);
};

test2(); // 浏览器中执行报错！！！：Uncaught ReferenceError: arguments is not defined

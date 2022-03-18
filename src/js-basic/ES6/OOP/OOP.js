/**
 * @desc 面向对象编程/原型及原型链
 * @link http://www.zhaowaedu.com/#/videoPlay?id=893
 * 原因：面向对象 - 逻辑迁移更加灵活、代码复用率高、高度的模块化
 */

/**
 * 1、对象的理解：
 *  对象是对于单个物体的简单抽象
 *  对象是一个容器，封装了属性以及方法。
 *  属性： 对象的状态
 *  方法：对象的行为
 */

// 简单对象
const Course = {
  teacher: "云隐",
  leader: "小可",
  startCourse: function (name) {
    return `开始${name}课`;
  },
};

// 函数对象
function Course() {
  this.teacher = "云隐";
  this.leader = "小可";
  this.startCourse = function (name) {
    return `开始${name}课`;
  };
}

/**
 * 2、构造函数 - 生成对象
 * 需要一个模版 - 表征了一类物体的共同特征，从而生成对象
 * 类即是对象模版
 * js面向对象其实本质并不是基于类，而是基于 ·构造函数 + 原型链·
 */
function Course() {
  this.teacher = "云隐";
  this.leader = "小可";
  this.startCourse = function (name) {
    return `开始${name}课`;
  };
}
const course = new Course("云隐");

// Course本质就是构造函数
// 1. 函数体内使用的this, 指向所要生成的实例
// 2. 生成对象用new来进行实例化
// 3. 可以做初始化传参

// 如果构造函数不初始化，可以使用吗？ - 无法使用
// 如果项目中需要使用，通常（不被外界感知）如何解决？

// 提供方
function Course() {
  // 判断是实例对象还是构造函数
  const _isClass = this instanceof Course;
  if (!_isClass) {
    return new Course();
  }

  this.teacher = "云隐";
  this.leader = "小可";
  this.startCourse = function (name) {
    return `开始${name}课`;
  };
}
// 使用方
const course = Course();
// 启发：如果编写底层的api代码时，尽量做到不需要让外部感知内部类型

// 引发思考: new是什么 / new的原理 / new时候做了些什么
function Course() {}
const course = new Course();
// 1. 创建了一个空对象，作为返回的对象实例
// 2. 将生成的空对象的原型对象指向了构造函数的prototype属性
// 3. 将当前实例对象赋给了内部的this
// 4. 执行构造函数的初始化代码

// 追问：实例属性影响 - 独立
function Course(teacher, leader) {
  this.teacher = teacher;
  this.leader = leader;
}
const course1 = new Course("云隐", "小可");
const course2 = new Course("云隐", "部部");

course2.leader = "aaa"; // 不影响其他实例

// constructor是什么？
function Course(teacher, leader) {
  this.teacher = teacher;
  this.leader = leader;
}
const course = new Course("云隐", "小可");
// 1、每个对象在创建时，会自动拥有一个constructor
// 2、constructor继承自原型对象，指向了构造函数的引用

// 追问：使用构造函数 没有问题么 / 会有什么性能上的问题?
function Course(name) {
  this.teacher = "云隐";
  this.leader = "小可";
  this.startCourse = function (name) {
    return `开始${name}课`;
  };
}

const course1 = new Course("es6");
const course2 = new Course("OOP");
// 构造函数中的方法，会存在于每一个生成的实例里，重复的挂载其实是会导致资源浪费

// 原型对象
function Course() {}
const course1 = new Course();
const course2 = new Course();
// 1. 构造函数：用来初始化创建对象的函数 - Course 自动给构造函数赋予一个prototype属性，该属性等于实例对象的原型对象
// 2. 实例对象：course1是实例对象，根据原型对象创建出来的实例
// 每个对象中都有一个__proto__
// 每个实例对象都有一个constructor
// constructor有继承而来，并指向当前的构造函数
// 3. 原型对象：Course.prototype

function Course() {}
Course.prototype.teacher = "云隐";
const course1 = new Course();
const course2 = new Course();

// 对上篇原型对象做优化
function Course() {
  this.teacher = "云隐";
  this.leader = "小可";
}

// 方法挂载于prototype上
Course.prototype.startCourse = function (name) {
  return `开始${name}课`;
};

const course1 = new Course("es6");
const course2 = new Course("OOP");

/**
 * 继承
 * 1. 在原型对象上的所有属性和方法，都能被实例所共享
 */

// 1、重写原型对象的方式进行继承，将父对象的属性方法，作为子对象原型对象的属性和方法
function Game() {
  this.name = "LOL";
}

Game.prototype.getName = function () {
  return this.name;
};

function LOL() {}
LOL.prototype = new Game();
LOL.prototype.constructor = LOL;
const game = new LOL();
// 追问：原型链继承的缺点
// 1. 父类属性一旦赋值给子类的原型属性，此时属性属于子类的共享属性了
// 2. 实例化子类时，无法像父类传参。
// 例子：
function Game() {
  this.name = "LOL";
  this.skin = ["s", "ss"];
}

Game.prototype.getName = function () {
  return this.name;
};

function LOL() {}
LOL.prototype = new Game();
LOL.prototype.constructor = LOL;
const game1 = new LOL();
const game2 = new LOL();
game1.skin.push("ss");

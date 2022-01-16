// 传统js构建类
function Course1(teacher, course) {
  this.teacher = teacher;
  this.course = course;
}

Course1.prototype.getCourse = function () {
  return `teacher is: ${this.teacher}, course: ${this.course}`;
};

const course1 = new Course1("云隐", "ES6");
course1.getCourse();

// ES6 Class
class Course2 {
  // 初始化实例
  constructor(teacher, course) {
    this.teacher = teacher;
    this.course = course;
  }

  getCourse() {
    return `teacher is: ${this.teacher}, course: ${this.course}`;
  }
}
const course2 = new Course2("云隐", "ES6");
course2.getCourse();

// 1. class类型是啥？ 其实只是语法糖
console.log(typeof Course1); // function
// 2. class的原型是啥？
console.log(Course2.prototype); // 有区分，但是本质相同都是function

/**
 * 函数对象以及属性
 */
console.log(course1.hasOwnProperty("teacher")); // true

/**
 * 属性定义 构造器 & 顶层定义 两种定义方式
 */
class Course {
  constructor(teacher, course) {
    this.teacher = teacher;
    this.course = course;
  }

  getCourse() {
    return `teacher is: ${this.teacher}, course: ${this.course}`;
  }

  get teacher() {
    // 留有空间
    return this.teacher;
  }

  set teacher(val) {
    // 留有空间
    this.teacher = val;
  }
}

// 问题1：js 如何增加只读变量: 只设置get
class Course {
  constructor(teacher, course) {
    this._teacher = teacher;
    this.course = course;
  }

  getCourse() {
    return `teacher is: ${this._teacher}, course: ${this.course}`;
  }

  get teacher() {
    // 留有空间
    return this._teacher;
  }
}

// 问题2：js  如何构造一个私有属性
class Course {
  constructor(teacher, course) {
    this._teacher = teacher;
    this.course = course;

    // constructor 作用域内定义一个局部变量
    let _course = "es6";
    // 内部通过必要的形式去暴露该变量
    this.getCourse = () => {
      return _course;
    };
  }
}

class Course {
  #course = "es6";
  constructor(teacher, course) {
    this._teacher = teacher;
  }

  get course() {
    return this.#course;
  }

  set course(val) {
    if (val) {
      this.#course = val;
    }
  }
}

// 问题3: 封装核心 - 适配器模式
// 封装中台业务core
class Utils {
  constructor(core) {
    this._main = core;
    this._name = "my-utils";
  }

  get name() {
    return {
      ...this._main.name,
      name: `${this._name}`,
    };
  }

  set name(val) {
    // valid safety
    this._name = val;
  }
}

/**
 * 静态方法 - 直接挂载在类上面的方法无需实例化获取
 * 用于解决全局对象的变量问题
 */

function Course() {}

Course.ring = function () {};

class Course {
  constructor() {}

  static ring() {}
}

/**
 * es5和es6的继承
 */

// es5 继承
function Course() {
  // ...
}

Course.ring = function () {};

Couse.prototype.send = function () {};

function Child() {
  Course.call(this, "云隐", "es6");
  // ...
}

Child.prototype = Course.prototype;

// es6 继承
class Course {
  constructor() {
    // ...
  }

  static ring() {}

  send() {}
}
class Child extends Course {
  constructor() {
    super("孔子", "哲学");
  }

  run() {}
}

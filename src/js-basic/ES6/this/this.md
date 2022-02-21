

考察重点
#### 函数直接调用中 - this指向的是window => 函数表达式、匿名函数、嵌套函数
```js
  function foo() {
    console.log('函数内部this', this);
  }
  foo();
```

#### 隐式绑定 - 
```js
  function foo() {

  }

  const obj = {
    a: 1
  }

  obj.func = func;
  obj.fn()
```
#### 面试题：
```js
  const foo = {
    bar: 10,
    fn: function() {
      console.log(this.bar);
      console.log(this);
    }
  }
  // 取出
  let fn1 = foo.fn;
  // 执行
  fn1();
```

### bind原理 / 手写bind
* 原理或者手写类题目，解题思路
* 1. 说明原理，写下注释
* 2. 根据注释，补齐代码
```js
  function sum(a, b, c) {
    console.log('sum', this);
    return a + b + c;
  }
```
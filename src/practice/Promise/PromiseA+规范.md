# PromiseA+ 规范

## 术语

1. promise, 是一个有then方法的对象或者函数，行为遵循本规范
2. thenable, 是一个有then方法的函数或者对象
3. value，promise状态成功时的值， **resolve** 的参数， number boolean undefined promise
4. reason, promise 状态失败时的值，**reject** 的参数，表示各种拒绝的原因
5. exception 异常的值

## 规范

### Promise States

有三种状态，

1. pending
  1.1 初始状态，可改变
  1.2 一个Promise 在resolve/reject之前都处于这个状态
  1.3 resolve: pending -> fulfilled 状态
  1.4 reject: pending -> rejected 状态

2. fulfilled

  2.1 最终态，不可变
  2.2 一个promise被resolve后会变成这个状态
  2.3 必须拥有一个value值

3. rejected

  3.1 最终态，不可变
  3.2 一个promise被reject后会变成这个状态
  3.3 必须拥有一个reason值

pending -> resolve(value) -> fullfilled
pending -> rejected(reason) -> fullfilled

### then

promise 应该有一个then方法，用来访问最终的结果

```js
  promise.then(onFullfilled, onRejected);
```
1. 参数要求

1.1 onFullfilled 必须是一个函数类型，如果不是函数，应该被**忽略**
1.2 onRejected 必须是一个函数类型，如果不是函数，应该被**忽略**

2. onFullfilled 特性

2.1 promise 变成fullfilled时，应该调用onFullfilled, 参数时value
2.2 promise 变成fullfilled之前，不应该被调用
2.3 只能调用一次


3. onRejected 特性

2.1 promise 变成rejected时，应该调用onRejected, 参数时reason
2.2 promise 变成rejected之前，不应该被调用
2.3 只能调用一次

4. onFullfilled 和 onRejected 执行环境应该是在微任务里

浏览器支持：queueMicroTask(() => {})

5. then 方法可以被调用多次

```js
const promise = new Promise();
promise.then(cb1, cb2);
promise.then(cb1, cb2);
promise.then(cb1, cb2);
promise.then(cb1, cb2);
promise.then(cb1, cb2);
```

5.1 promise 状态变成fullfilled以后，所有的onFullfilled 回调都需要按照then的顺序执行
5.2 promise 状态变成rejected以后，所有的onRejected 回调都需要按照then的顺序执行

6. 返回值

then 返回值应该是一个Promise, 是一个新的Promise
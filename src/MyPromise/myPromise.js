class MyPromise {
  static PENDING = "pending";

  static RESOLVED = "resolved";

  static REJECTED = "rejected";

  constructor(fn) {
    // 初始化状态
    this.state = MyPromise.PENDING;
    // 初始化值
    this.value = undefined;
    // 初始化失败原因
    this.reason = undefined;

    // 缓存成功状态的回调
    this.onResolvedCallbacks = [];
    // 缓存失败状态的回调
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === MyPromise.PENDING) {
        this.state = MyPromise.RESOLVED;
        this.value = value;
        this.onResolvedCallbacks.forEach((cb) => cb(value));
      }
    };

    const reject = (reason) => {
      if (this.state === MyPromise.PENDING) {
        this.state = MyPromise.REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb(reason));
      }
    };

    // 解决执行函数中的异常
    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onResolved, onRejected) {
    // 解决回调函数中不是函数的情况
    const resolvedHandler = typeof onResolved === "function" ? onResolved : (v) => v;
    const rejectedHandler =
      typeof onRejected === "function"
        ? onRejected
        : (e) => {
            throw e;
          };

    const promise2 = new MyPromise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      const resolvePromise = (promise, x, resolveNext, rejectNext) => {
        // 防止循环引用
        if (promise === x) {
          return rejectNext(new TypeError("Chaining cycle detected for promise"));
        }

        let called = false;

        try {
          if (x !== null && (typeof x === "object" || typeof x === "function")) {
            const { then } = x;
            if (typeof then === "function") {
              then.call(
                x,
                (y) => {
                  if (called) return;
                  called = true;
                  resolvePromise(promise, y, resolveNext, rejectNext);
                },
                (r) => {
                  if (called) return;
                  called = true;
                  rejectNext(r);
                }
              );
            } else {
              resolveNext(x);
            }
          } else {
            resolveNext(x);
          }
        } catch (e) {
          if (called) return null;
          called = true;
          rejectNext(e);
        }
      };

      if (this.state === MyPromise.RESOLVED) {
        queueMicrotask(() => {
          try {
            const x = resolvedHandler(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === MyPromise.REJECTED) {
        queueMicrotask(() => {
          try {
            const x = rejectedHandler(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      // 缓存成功和失败回调函数
      if (this.state === MyPromise.PENDING) {
        this.onResolvedCallbacks.push((value) =>
          queueMicrotask(() => {
            try {
              const x = resolvedHandler(value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        );
        this.onRejectedCallbacks.push((reason) =>
          queueMicrotask(() => {
            try {
              const x = rejectedHandler(reason);
              // reject(e);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        );
      }
    });

    return promise2;
  }

  // catch 就是 then 的语法糖
  catch(fn) {
    return this.then(null, fn);
  }

  static resolve(value) {
    // 1. 如果是 MyPromise 实例，直接返回
    if (value instanceof MyPromise) {
      return value;
    }

    // 2. 如果是 thenable 对象，转换为 MyPromise 对象
    if (value !== null && (typeof value === "object" || typeof value === "function")) {
      try {
        const { then } = value;
        if (typeof then === "function") {
          return new MyPromise(then.bind(value));
        }
      } catch (error) {
        return new MyPromise((resolve, reject) => reject(error));
      }
    }

    // 3. 其他情况，返回一个以该值解决的新 Promise
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(err) {
    return new MyPromise((_, reject) => reject(err));
  }

  // 添加以下代码到 MyPromise 类的最后
  static deferred() {
    const dfd = {};
    dfd.promise = new MyPromise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }

  finally(callback) {
    if (typeof callback !== "function") {
      callback = () => {};
    }

    return this.then(
      // 成功时
      (value) => MyPromise.resolve(callback()).then(() => value),
      // 失败时
      (error) =>
        MyPromise.resolve(callback()).then(() => {
          throw error;
        })
    );
  }
}

// 添加 Promise A+ 测试接口
MyPromise.prototype[Symbol.toStringTag] = "Promise";

module.exports = MyPromise;
module.exports.deferred = MyPromise.deferred;

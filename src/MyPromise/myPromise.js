class MyPromise {
  state = "pending"; // pending, resolve, rejected

  value = undefined; // 成功后的值

  reason = undefined; // 失败厚的值

  resolveCallbacks = []; // pending 状态下，存储成功的回调

  rejectCallbacks = []; // pending 状态下，存储失败的回调

  constructor(fn) {
    const resolveHandler = (value) => {
      // 只有 pending 状态才能进行状态变化
      if (this.state === "pending") {
        this.state = "resolved";
        this.value = value;
        // 执行成功回调函数
        this.resolveCallbacks.forEach((cb) => cb(this.value));
      }
    };

    const rejectHandler = (reason) => {
      // 只有 pending 状态才能进行状态变化
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        // 执行失败回调函数
        this.rejectCallbacks.forEach((cb) => cb(this.reason));
      }
    };

    try {
      fn(resolveHandler, rejectHandler);
    } catch (error) {
      rejectHandler(error);
    }
  }

  //  then 函数可能有两个函数
  then(fn1, fn2) {
    fn1 = typeof fn1 === "function" ? fn1 : (v) => v;
    fn2 = typeof fn2 === "function" ? fn2 : (e) => e;

    if (this.state === "pending") {
      const p1 = new MyPromise((resolve, reject) => {
        this.resolveCallbacks.push(() => {
          try {
            const newVal = fn1(this.value);
            resolve(newVal);
          } catch (error) {
            reject(error);
          }
        });
        this.rejectCallbacks.push(() => {
          try {
            const newReason = fn2(this.reason);
            reject(newReason);
          } catch (error) {
            reject(error);
          }
        });
      });

      return p1;
    }

    if (this.state === "resolved") {
      const p1 = new MyPromise((resolve, reject) => {
        try {
          const newVal = fn1(this.value);
          resolve(newVal);
        } catch (error) {
          reject(error);
        }
      });

      return p1;
    }

    if (this.state === "rejected") {
      const p1 = new MyPromise((resolve, reject) => {
        try {
          const newReason = fn2(this.reason);
          reject(newReason);
        } catch (error) {
          reject(error);
        }
      });

      return p1;
    }
  }

  // catch 就是 then 的语法糖
  catch(fn) {
    return this.then(null, fn);
  }
}

MyPromise.resolve = (val) => new MyPromise((resolve) => resolve(val));

MyPromise.reject = (err) =>
  new MyPromise((resolve, reject) => {
    reject(err);
  });

MyPromise.all = (promiseList = []) => {
  const p1 = new MyPromise((resolve, reject) => {
    const result = [];
    const { length } = promiseList;
    let resolvedCount = 0;

    promiseList.forEach((p) => {
      p.then((data) => {
        result.push(data);
        resolvedCount += 1;
        if (resolvedCount === length) {
          resolve(result);
        }
      }).catch((err) => reject(err));
    });

    return result;
  });

  return p1;
};

MyPromise.race = (promiseList = []) => {
  let hasResult = false;
  return new MyPromise((resolve, reject) => {
    promiseList.forEach((promise) => {
      promise
        .then((data) => {
          if (!hasResult) {
            resolve(data);
            hasResult = true;
          }
        })
        .catch((e) => reject(e));
    });
  });
};

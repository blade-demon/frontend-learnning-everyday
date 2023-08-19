// 模拟发送请求
function request(url, time = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`请求结束：${url}`);
      if (Math.random() > 0.5) {
        resolve("成功");
      } else {
        reject(new Error("失败"));
      }
    }, time * 1e3);
  });
}

// 发送请求
function sendRequest(requestList, limits, callback) {
  // 取得请求的 list
  const promises = requestList.slice();
  // 获得并发量大小
  const concurrentNum = Math.min(limits, requestList.length);
  let concurrentCount = 0; // 当前并发数

  // 捞起下一个任务
  const picker = () => {
    // 任务队列里还有任务并且此时还有剩余并发数的时候 执行
    if (concurrentCount < limits && promises.length > 0) {
      // 继续执行任务
      runTask();
    } else if (promises.length == 0 && concurrentCount == 0) {
      // 队列为空的时候，并且请求池清空了，就可以执行最后的回调函数了
      // 执行结束
      callback && callback();
    }
  };

  // 执行器
  // 执行任务，同时更新当前并发数
  const exec = async (task) => {
    try {
      // 因为要增加一个并发数了
      concurrentCount++;
      await task();
    } catch (error) {
    } finally {
      // 并发数--，因为已经执行完一个异步任务
      concurrentCount--;
      // 捞起下一个任务
      picker();
    }
  };

  // 执行任务
  const runTask = () => {
    const p = promises.shift();
    if (p) {
      exec(p);
    }
  };

  const runTaskAsNeeded = () => {
    let i = 0;
    while (i < concurrentNum) {
      i++;
      runTask();
    }
  };

  runTaskAsNeeded();
}

sendRequest(
  [() => request("1"), () => request("2"), () => request("3"), () => request("4")],
  2, // 并发数
  (res) => {
    console.log(res);
  }
);

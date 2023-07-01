function request(url, time = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("请求结束：", url);
      if (Math.random() > 0.5) {
        resolve("成功");
      } else {
        reject(new Error("错误;"));
      }
    }, time * 1e3);
  });
}

function sendRequest(requestList, limits, cb) {
  // 浅拷贝请求数据列表
  const promises = requestList.slice();
  // 得到开始时的并发数
  const cocurrentNum = Math.min(limits, requestList.length);
  // 当前并发数
  let cocurrentCount = 0;

  // 捞起下一个任务
  function picker() {
    // 任务队列里面还有任务并且还有剩余并发数空的时候，执行
    if (promises.length > 0 && cocurrentCount < limits) {
      // eslint-disable-next-line no-use-before-define
      runTask();
    } else if (promises.length === 0 && cocurrentCount === 0) {
      // eslint-disable-next-line no-unused-expressions
      cb && cb();
    }
  }

  // 执行任务，同时更新当前的并发数
  async function runner(task) {
    try {
      // eslint-disable-next-line no-plusplus
      cocurrentCount++;
      await task();
    } finally {
      // 并发数--
      // eslint-disable-next-line no-plusplus
      cocurrentCount--;
      // 捞起下一个任务
      picker();
    }
  }

  // 取出任务并执行
  function runTask() {
    const task = promises.shift();
    // eslint-disable-next-line no-unused-expressions
    task && runner(task);
  }

  // 第一次可以先跑起可以并发的任务
  function runTaskNeeded() {
    let i = 0;
    while (i < cocurrentNum) {
      // eslint-disable-next-line no-plusplus
      i++;
      runTask();
    }
  }

  runTaskNeeded();
}

sendRequest(
  [
    () => request("1"),
    () => request("2"),
    () => request("3"),
    () => request("4"),
  ],
  1, // 并发数
  (res) => {
    console.log(res);
  }
);

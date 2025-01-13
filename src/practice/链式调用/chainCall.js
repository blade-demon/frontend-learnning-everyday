function arrange(name) {
  const tasks = [];

  tasks.push(() => {
    console.log(`${name} is notified!`);
  });

  return {
    wait(number) {
      tasks.push(
        () =>
          new Promise((resolve) => {
            setTimeout(resolve, number * 1000);
          })
      );
      return this;
    },
    do(task) {
      tasks.push(() => {
        // 这里的name是从上一个函数传递过来的
        console.log(`${name} is ${task}!`);
      });
      return this;
    },
    waitFirst(number) {
      tasks.unshift(
        () =>
          new Promise((resolve) => {
            setTimeout(resolve, number * 1000);
          })
      );
      return this;
    },
    execute() {
      (async () => {
        await tasks.reduce((promise, task) => promise.then(task), Promise.resolve());
      })();

      return this;
    },
  };
}

arrange("William").wait(5).do("commit").waitFirst(3).execute();

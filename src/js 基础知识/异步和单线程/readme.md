# 单线程、异步

js 单线程，同一时间只能做一件事情

浏览器/node 已经支持多进程，web worker

在Node.js中，可以使用多种方法来启动多进程以充分利用多核CPU的性能。以下是一些常用的方法：

1. **Child Processes（子进程）模块：** Node.js内置了`child_process`模块，它允许你创建和控制子进程。你可以使用这个模块来启动多个子进程，从而在多个核心上执行任务。常见的方法包括`fork()`和`spawn()`。

   ```javascript
   const { fork } = require('child_process');

   // 启动多个子进程
   const child1 = fork('script1.js');
   const child2 = fork('script2.js');
   ```

2. **Cluster（集群）模块：** Node.js的`cluster`模块是构建在`child_process`之上的抽象，专门用于创建多进程的服务器。它可以帮助你更容易地在多个CPU核心上创建多个工作进程，共同处理网络请求。

   ```javascript
   const cluster = require('cluster');
   const http = require('http');
   const numCPUs = require('os').cpus().length;

   if (cluster.isMaster) {
     // 主进程，创建子进程
     for (let i = 0; i < numCPUs; i++) {
       cluster.fork();
     }
   } else {
     // 子进程，创建HTTP服务器
     http.createServer((req, res) => {
       res.writeHead(200);
       res.end('Hello, World!');
     }).listen(8000);
   }
   ```

3. **使用外部工具如pm2：** pm2是一个流行的Node.js进程管理工具，它可以帮助你管理和监控多个Node.js进程。它能够自动处理进程的启动、重启、日志记录等。

   安装pm2：

   ```sh
   npm install -g pm2
   ```

   使用pm2启动多个进程：

   ```sh
   pm2 start app.js -i max
   ```

上述方法可以根据你的需求来选择。使用`child_process`模块可以让你更精细地控制每个子进程，而`cluster`模块则更适合在服务器场景中创建多个工作进程。使用pm2则是一种更方便的方式，它还提供了一些监控和管理功能，适用于部署和运维。

无论你选择哪种方法，多进程的目标是提高Node.js应用程序的性能和可伸缩性，使其能够更好地利用多核CPU的优势。

# 应用场景

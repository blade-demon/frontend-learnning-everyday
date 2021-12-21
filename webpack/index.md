# Webpack

## 1. Webpack 中的 module 指的是什么？

webpack 支持 ESModule、CommonJS、AMD、Assets（image,font,audio,json,video）

### Chunk 和 Bundle 的区别

1. Chunk
   Chunk 是 webpack 打包过程中 Modules 的集合，是打包过程中的概念。
   webpack 的打包是从一个入口模块开始，从入口模块引入其他模块...
   webpack 通过引用关系逐个打包模块，这些 module 最终形成一个 chunk
2. Bundle
   最终形成一个或者多个打包好的文件
3. Chunk 和 Bundle 的关系
   大多数 Chunk 和 Bundle，一个 chunk 会产生一个 bundle，但是也有例外。
   但是如果加了 sourcemap，一个 entry，一个 Chunk，会出现两个 bundle 的情况。
   Chunk 是过程中的代码块，Bundle 是打包结果输出的代码块，Chunk 在构建完成就呈现的 Bundle。
4. Split Chunk
5. 这配置会产生几个 chunk

### Plugin 和 Loader 分别是做什么的？怎么工作的？

1. Loader
   模块转换器，将非 js 模块转化为 webpack 能识别的 js 模块。
   本质上，webpack loader 将所有类型的文件，转换为应用程序的**依赖图**可以直接引用的模块。
2. Plugin
   扩展插件，webpack 运行的各个阶段，都会广播对应的事件。插件去监听对应的事件。
3. Complier
   对象，包含了 webpack 环境的所有配置信息，包含了 options，loader，plugins。
   webpack 启动的时候实例化，他是全局唯一的，可以把它理解为 webpack 的实例。
4. Compilation
   包含了当前的模块资源，编译生成资源。
   webpack 在开发模式下运行的时候，每当监测到一个文件变化，就会创建一次新的 Compilation

### 能简单描述一下 webpack 的打包过程吗？

1. 初始化参数：shell webpack.config.js
2. 开始编译：初始化一个 Complier 对象，加载所有的配置，开始执行编译
3. 确定入口：根据 entry 中的配置，找出所有的入口文件
4. 编译模块：从入口文件开始，调用所有的 loader，再去递归找依赖
5. 完成模块编译：得到每个模块被翻译后的最终内容以及他们之间的依赖关系
6. 输出资源：根据得到的依赖关系，组装成一个个包含多个 module 的 chunk
7. 输出完成：根据配置确定要输出的文件名以及文件路径

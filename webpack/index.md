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

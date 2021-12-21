# 实现一个自己的打包工具

webpack

本质上，webpack 是一个现代的 js 应用程序的静态模块打包器。
当 webpack 处理应用程序的时候，它会递归的构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或者多个 bundle。

1. ESModule

```js
import axios from 'axios'

export default axios
```

## 概览

1. 找到一个入口文件
2. 解析这个入口文件，提取他的依赖
3. 解析入口文件依赖的依赖，递归地去创建一个文件的依赖图，描述所有文件的依赖关系
4. 把所有文件打包成一个文件

## 开始开发！！！！

1. 新建几个 js 源文件

name.js
message.js
entry.js

2. 肉眼观察三个文件的依赖关系
   entry 依赖 message，message 依赖 name

3. 开始编写自己的打包工具，mywebpack.js

```js
const fs = require('fs')

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  console.log(content)
}

createAsset('./source/entry.js')
```

4. 分析 ast，思考如何能干解析出 entry.js 的依赖
   4.1 File -> program
   4.2 program -> body 里面是我们各种语法的描述
   4.3 ImportantDeclaration 引入的声明
   4.4 ImportantDeclaration source 属性，source.value 就是引入文件的地址 './message.js'

5. 生成 entry.js 的 ast

babylon 一个基于 babel 的 js 解析工具

```js
const fs = require('fs')
const babylon = require('babylon')

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = babylon.parse(content, {
    sourceType: 'module',
  })
  console.log(ast)
}

createAsset('./source/entry.js')
```

6. 基于 AST，找到 entry.js 的 ImportDeclaration Node

```js
const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = babylon.parse(content, {
    sourceType: 'module',
  })

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      console.log(node)
    },
  })
  // console.log(ast)
}

createAsset('./source/entry.js')
```

7. 获取 entries.js 的依赖

```js
const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = babylon.parse(content, {
    sourceType: 'module',
  })

  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      console.log(node)
      dependencies.push(node.source.value)
    },
  })
  console.log(dependencies)
}

createAsset('./source/entry.js')
```

8. 优化 createAsset，使其能够区分文件

因为要获取所有文件的依赖，所以咱们需要一个 id 来标识所有文件。

这里咱们用一个简单的字增 number，这样遍历每个文件 id 就为唯一了。

```js
const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default

let ID = 0

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = babylon.parse(content, {
    sourceType: 'module',
  })

  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    },
  })

  const id = ID++

  return {
    id,
    filename,
    dependencies,
  }
}

console.log(createAsset('./source/entry.js'))
```

9. 我们获取到单个文件的依赖了，接下来尝试建立依赖图

新增一个函数 createGraph，把 createAsset 调用移入 createGraph。
entry 的路径需要是动态的，所以 createGraph，接受一个参数 entry

```js
function createGraph(entry) {
  const mainAsset = createAsset(entry)
  return mainAsset
}

const graph = createGraph('./source/entry.js')

console.log(graph)
```

10. 上面的存储都是相对路径，想办法把他们转换为绝对路径
    有了绝对路径，我们才能获取各个文件的 asset

```js
function createGraph(entry) {
  const mainAsset = createAsset(entry)
  const allAsset = [mainAsset]

  for (let asset of allAsset) {
    const dirname = path.dirname(asset.filename)

    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath)
      const childAsset = createAsset(absolutePath)
    })
  }
}
```

11. 我们需要一个 map，记录的 depend 中的相对路径和 childAsset 的对应关系。

```js
function createGraph(entry) {
  const mainAsset = createAsset(entry)
  const allAsset = [mainAsset]

  for (let asset of allAsset) {
    const dirname = path.dirname(asset.filename)

    asset.mapping = {}

    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath)
      const childAsset = createAsset(absolutePath)
      asset.mapping[relativePath] = childAsset.id
    })
  }
}
```

12. 开始遍历所有文件

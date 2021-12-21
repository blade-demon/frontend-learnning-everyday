// 1. 找到一个入口文件
// 2. 解析这个入口文件，提取他的依赖
// 3. 解析入口文件依赖的依赖，递归地去创建一个文件的依赖图，描述所有文件的依赖关系
// 4. 把所有文件打包成一个文件

const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const path = require('path')

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
      allAsset.push(childAsset)
    })
  }
  return allAsset
}

const graph = createGraph('./source/entry.js')

console.log(graph)

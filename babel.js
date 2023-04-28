const babelCore = require("@babel/core")
const fs = require('node:fs')
const path = require('node:path')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse')
const template = require('@babel/template')
const generate = require('@babel/generator')
const t = require('@babel/types')
const { v4: uuidv4 } = require('uuid');

const filePath = path.resolve('controller.js')
const flag = isTarget(filePath)
if (flag) {
  // 导入
  const importName = uuidv4().replace(/-/g, '_')
  const importContent = `import ${importName} from '${filePath}'\n`
  // 导出
  const exportContent = `export default [${importName}]`
  const fileContent = importContent + exportContent
  fs.writeFileSync('./import.js', fileContent)
  console.log(fileContent)
}

function isTarget(filePath) {
  // 读取文档内容，找到元数据、生成新内容
  const content = fs.readFileSync(filePath, 'utf8')

  // 编译生成 ast
  const ast = babelParser.parse(content, {
    sourceType: "module",
    plugins: ["decorators"]
  })

  // 判断是否存在默认导出的具有特定注解的类
  // 如果有的话则聚合该类
  let target
  ast.program.body.forEach(b => {
    const { type, declaration } = b
    // 带有注解的默认导出类
    if (type === 'ExportDefaultDeclaration' && declaration.type === 'ClassDeclaration' && declaration.decorators?.length) {
      decorators = declaration.decorators
      decorators.some(decorator => {
        const { type, expression } = decorator
        if (type === 'Decorator' && expression.type === 'CallExpression' && expression.callee.name === 'isTestable') {
          target = b
          console.log("找到想要的注解了")
        }
      })
    }
  })

  if (target) {
    return true
  }
}

function extract(filePath) {
  // 读取文档内容，找到元数据、生成新内容
  const content = fs.readFileSync(filePath, 'utf8')

  // 编译生成 ast
  const ast = babelParser.parse(content, {
    sourceType: "module",
    plugins: ["decorators"]
  })

  // 判断是否存在默认导出的具有特定注解的类
  // 如果有的话则聚合该类
  let target
  ast.program.body.forEach(b => {
    const { type, declaration } = b
    // 带有注解的默认导出类
    if (type === 'ExportDefaultDeclaration' && declaration.type === 'ClassDeclaration' && declaration.decorators?.length) {
      decorators = declaration.decorators
      decorators.some(decorator => {
        const { type, expression } = decorator
        if (type === 'Decorator' && expression.type === 'CallExpression' && expression.callee.name === 'isTestable') {
          target = b
          console.log("找到想要的注解了")
        }
      })
    }
  })

  if (target) {
    // 构建模板
    const buildRequire = template.default(`
      import %%importName%% from %%source%%
    `)
    const importName = uuidv4().replace(/-/g, '_')
    const ast = buildRequire({
      importName: t.identifier(importName),
      source: t.stringLiteral(filePath),
    });

    importList.push(generate.default(ast).code)

    return importName
  }
}

// 遍历节点
// traverse.default(ast, {
//   enter(nodePath) {
//     list.push(nodePath)
//   }
// })


/**
 * import ArticleController from './ArticleController'
 * import ComputerController from './ComputerController'
 * const pathMap = {}
 * [ArticleController, ComputerController].forEach(Controller => {
 *  const path = Reflect.getMetadata('path', Controller)
 *  const controller = new Controller()
 *  pathMap[path] = controller
 * })
 * let controller
 * if (controller = pathMap[location.pathname]) {
 *  const content = controller.ui()
 *  document.querySelector('#app') = content
 * }
 */
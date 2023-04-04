import http from 'node:http'
import { readFile } from 'node:fs/promises'
import chalk from 'chalk'
import Koa from 'koa'
import Router from 'koa-router'

// 基于 Koa 创建 http 服务器
export function createServer() {
  const port = 3000
  const app = new Koa()
  const router = new Router()

  router.get('/', async (ctx, next) => {
    const htmlContent = await readFile('src/client/index.html', {
      encoding: 'utf-8'
    })

    ctx.body = htmlContent
    ctx.set('content-type', 'text/html')
  })

  app
  .use(router.routes())

  app.listen(port, 'localhost', () => {
    console.log(chalk.yellow(`开启 http 服务: ${port}`))
  })
}

// 创建 http 服务器
// export function createServer() {
//   const httpPort = 3000
//   const httpServer = http.createServer()

//   httpServer.on('request', async (req, res) => {
//     res.writeHead(200, {
//       'content-type': 'text/html'
//     })
//     const htmlContent = await readFile('src/client/index.html', {
//       encoding: 'utf-8'
//     })
//     res.end(htmlContent)
//   })

//   httpServer.listen(httpPort, 'localhost', () => {
//     console.log(chalk.yellow(`开启 http 服务: ${httpPort}`))
//   })
// }
import { readFile } from 'node:fs/promises'
import chalk from 'chalk'
import Koa from 'koa'
import Router from 'koa-router'

// 基于 Koa 创建 http 服务器
export function startHttpServer() {
  const port = 3000
  const app = new Koa()
  const router = new Router()

  router.get('/index.js', async (ctx, next) => {
    const indexContent = await readFile('src/client/index.js', {
      encoding: 'utf-8'
    })

    ctx.body = indexContent
    ctx.set('content-type', 'application/javascript')
  })

  router.get('/:path*', async (ctx, next) => {
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
import http from 'node:http'
import { readFile } from 'node:fs/promises'

// 创建 http 服务器
const httpPort = 3000
const httpServer = http.createServer()

console.log(1)

httpServer.on('request', async (req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html'
  })
  const htmlContent = await readFile('./index.html', {
    encoding: 'utf-8'
  })
  res.end(htmlContent)
})

httpServer.listen(httpPort, 'localhost', () => {
  console.log(`开启 http 服务: ${httpPort}`)
})
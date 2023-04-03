import http from 'node:http'
import { WebSocketServer } from 'ws'
import { readFile } from 'node:fs/promises'
import chokidar from 'chokidar'


// 创建 http 服务器
const httpPort = 3000
const httpServer = http.createServer()

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

// 创建 websocket 服务器
const wsPort = 3001
const wsServer = new WebSocketServer({ port: wsPort })

wsServer.on('connection', ws => {
  console.log(`连接 websocket 服务：${wsPort}`)
  ws.send(JSON.stringify({type: 'reload'}))
})

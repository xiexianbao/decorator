import { WebSocketServer } from 'ws'

// 创建 websocket 服务器
const wsPort = 3001
const wsServer = new WebSocketServer({ port: wsPort })

wsServer.on('connection', ws => {
  console.log(`连接 websocket 服务：${wsPort}`)
  ws.send(JSON.stringify({type: 'reload'}))
})

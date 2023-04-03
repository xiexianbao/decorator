import { WebSocketServer } from 'ws'
import chokidar from 'chokidar'

let ws = null

// 创建 websocket 服务器
function createWsServer() {
  const wsPort = 3001
  const wsServer = new WebSocketServer({ port: wsPort })
  wsServer.on('connection', _ => {
    console.log(`连接 websocket 服务：${wsPort}`)
    wx = _
    ws.send(JSON.stringify({type: 'reload'}))
  })
}

// 重新加载浏览器
function reloadBrowser() {
  if (ws) {
    ws.send(JSON.stringify({type: 'reload'}))
  }
}

// 监视文件
function watch() {
  chokidar.watch('./index.html').on('all', () => {
    reloadBrowser()
  })
}

// 开启客户端热重载
export function startHotReload() {
  createWsServer()
  watch()
}

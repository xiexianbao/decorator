import { WebSocketServer } from 'ws'
import chokidar from 'chokidar'
import chalk from 'chalk'

let ws = null

// 创建 websocket 服务器
function createWsServer() {
  const wsPort = 3001
  const wsServer = new WebSocketServer({ port: wsPort })
  wsServer.on('connection', _ => {
    console.log(chalk.yellow(`连接 websocket 服务：${wsPort}`))
    ws = _
  })
}

// 重新加载浏览器
export function reloadBrowser() {
  if (ws) {
    ws.send(JSON.stringify({type: 'reload'}))
  }
}

// 监视文件
function startWatch() {
  chokidar.watch('src/client/index.html').on('change', () => {
    reloadBrowser()
  })
}

// 开启客户端热重载
export function startHotReload() {
  createWsServer()
  startWatch()
}
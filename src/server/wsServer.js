import { WebSocketServer } from 'ws'
import chalk from 'chalk'

const wsPort = 3001
let wsServer

// 创建 websocket 服务器
export function startWsServer() {
  wsServer = new WebSocketServer({ port: wsPort })
  wsServer.on('connection', () => {
    console.log(chalk.yellow(`连接 websocket 服务：${wsPort}`))
  })
  return wsServer
}

// 获取 websocket 服务器实例
export function getWsServer() {
  return wsServer
}

import { startWsServer } from './server/wsServer.js'
import chokidar from 'chokidar'
import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import { createRollupWatcher } from './server/clientBundle.js'

let httpServerProcess = spawn('node', [resolve('src/server/httpServerProcess.js')], {
  stdio: [process.stdin, process.stdout, process.stderr]
})
const wsServer = startWsServer()


// 监听 httpServer 源码改变
chokidar.watch('src/server/httpServer.js').on('change', () => {
  httpServerProcess && httpServerProcess.kill()
  httpServerProcess = spawn('node', [resolve('src/server/httpServerProcess.js')], {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
  reloadBrowser()
})

// 监听 index.html 源码改变
chokidar.watch('src/client/index.html').on('change', () => {
  reloadBrowser()
})

// 开启 rollup 监听
createRollupWatcher().on('event', event => {
  if (event.code === 'END') {
    reloadBrowser()
  }
})

// 通知浏览器重新加载
function reloadBrowser() {
  wsServer.clients.forEach(client => {
    client.send(JSON.stringify({
      type: 'reload'
    }))
  })
}
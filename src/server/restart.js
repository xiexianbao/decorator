import chokidar from 'chokidar'
import { spawn } from 'node:child_process'
import process from 'node:process'


chokidar.watch('./httpServer.js').on('all', () => {
  restartServer()
  reloadBrowser()
})

// 重启服务器
let childProcess = null
function restartServer() {
  // 关闭之前的进程
  childProcess && childProcess.kill()

  // 启动新进程
  childProcess = spawn('node', ['dev.js'], {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
}

// 重新加载浏览器
function reloadBrowser() {}

// 更新哪些文件需要重新加载浏览器
/**
 * 服务端文件：
 *  1. httpServer.js
 * 客户端文件：
 *  1. index.html
 */
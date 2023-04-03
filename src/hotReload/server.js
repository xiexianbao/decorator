import chokidar from 'chokidar'
import { spawn } from 'node:child_process'
import process from 'node:process'

// 更新 httpServer.js 时重启服务器，重新加载浏览器
chokidar.watch('./server/httpServer.js').on('all', () => {
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
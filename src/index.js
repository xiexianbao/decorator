import chokidar from 'chokidar'
import { spawn } from 'node:child_process'
import process from 'node:process'


chokidar.watch('dev.js').on('all', () => {
  restartServer()
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

// 更新浏览器
function browser() {}
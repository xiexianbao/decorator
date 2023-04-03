import chokidar from 'chokidar'
import { spawn } from 'node:child_process'
import process from 'node:process'

let childProcess = null

// 重启服务器进程
function restartProcess() {
  childProcess && childProcess.kill()
  childProcess = spawn('node', ['./server.js'], {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
}

// 启动服务器
export function startServer() {
  chokidar.watch('./server.js').on('all', () => {
    restartProcess()
  })
}
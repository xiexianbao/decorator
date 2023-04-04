import chokidar from 'chokidar'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { reloadBrowser } from '../client/reload.js'

let serverProcess = null

// 重启服务器进程
function restartServerProcess() {
  serverProcess && serverProcess.kill()
  serverProcess = spawn('node', ['src/server/server.js'], {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
}

// 启动服务器
export function startWatch() {
  chokidar.watch('src/server/server.js').on('change', () => {
    restartServerProcess()
    reloadBrowser()
  })
}
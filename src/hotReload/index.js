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
import chokidar from 'chokidar'

// 更新 index.html 时，重新加载浏览器
chokidar.watch('./client/index.html').on('all', () => {
  reloadBrowser()
})

// 重新加载浏览器
function reloadBrowser() {}
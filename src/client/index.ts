import "reflect-metadata"
import { ArticleController } from "./controller/ArticleController"
import { ComputerController } from "./controller/ComputerController"

const articlePath = Reflect.getMetadata('path', ArticleController)
const computerPath = Reflect.getMetadata('path', ComputerController)
const pathList = [articlePath, computerPath]

window.addEventListener('DOMContentLoaded', () => {
  let content
  const path = location.pathname.replace(/^\//, '')
  if (pathList.includes(path)) {
    if (path === 'article') {
      const articleController =  new ArticleController()
      content = articleController.ui()
    } else if (path === 'computer') {
      content = 'computer'
      const computerController = new ComputerController()
      content = computerController.ui()
    }
  } else {
    content = '408'
  }
  document.getElementById('app').innerHTML = content
})

console.log("index")
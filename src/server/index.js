import { startWatch } from './restart.js'
import { createServer } from './server.js'

export function createDevServer() {
  createServer()
  startWatch()
}

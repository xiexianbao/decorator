import * as rollup from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'


export function createRollupWatcher() {
  const watchOptions = {
    input: 'src/client/index.ts',
    plugins: [
      typescript(),
      nodeResolve()
    ],
    output: {
      file: 'src/client/index.js',
      format: 'esm',
    }
  }
  return rollup.watch(watchOptions)
}
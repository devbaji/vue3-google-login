import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import css from 'rollup-plugin-import-css'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/plugin/index.js',
    output: [
      {
        format: 'cjs',
        file: 'dist/library.js',
        plugins: [terser()]
      }
    ],
    plugins: [
      vue(), peerDepsExternal(), css({ minify: true })
    ]
  }
]
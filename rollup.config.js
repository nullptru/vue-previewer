import vue from 'rollup-plugin-vue'
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import { terser } from 'rollup-plugin-terser'
import resolve from "rollup-plugin-node-resolve"

const ENV = process.env.NODE_ENV;

const fileMap = {
  cjs: 'vue-preview-common',
  esm: 'vue-preview-esm',
  umd: 'vue-preview'
}
console.log(process.env.NODE_ENV)

export default [{
  input: 'src/index.js',
  output: Object.keys(fileMap).map(type => ({
    file: `dist/${fileMap[type]}${ENV === 'production' ? '.min' : ''}.js`,
    format: type,
    name: type === 'umd' ? 'VuePreview' : undefined
  })),
  plugins: [
    resolve(),
    vue(),
    commonjs(),
    babel(),
    ENV === 'production' && terser()
  ]
}]

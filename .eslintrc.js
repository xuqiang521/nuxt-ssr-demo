module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: 'standard',
  // 校验 .vue 文件
  plugins: [
    'html'
  ],
  // 自定义规则
  rules: {
    "no-return-await": 0
  },
  globals: {}
}

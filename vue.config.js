const path = require('path');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');


module.exports = {
  // 修改 src 为 examples
  publicPath: "./",
  outputDir: "docs/docs/.vuepress/public/dist",
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    plugins: [
      new AntdDayjsWebpackPlugin({
        preset: 'antdv3'
      })
    ]
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .exclude.add(path.resolve('lib'))
      .end()
      .exclude.add(path.resolve('examples/docs'))
      .end();
  }
}

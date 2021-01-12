module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  "plugins": [
    ["@ant-design-vue/babel-plugin-jsx", {
      "transformOn": true,
      "compatibleProps": true
    }],
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
  ]
}
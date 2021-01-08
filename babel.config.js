module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  "plugins": [
    ["@ant-design-vue/babel-plugin-jsx", {
      "transformOn": true,
      "compatibleProps": true
    }]
  ]
}
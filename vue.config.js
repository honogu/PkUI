const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/PkUI/',
  transpileDependencies: true
})
module.exports = {
  devServer: {
    proxy: 'https://localhost:7086/api/'
  }
}

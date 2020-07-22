/* eslint-disable indent */
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://140.143.128.100:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
       }
      }
    }
  }
}

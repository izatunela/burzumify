module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/burzumify/'
    : '/',
    devServer: {
    //   proxy: 'http://127.0.0.1:7777/'
      // proxy: {
      //   '^/': {
      //     target: 'http://localhost:7777/',
      //     secure: false,
      //     changeOrigin: true,
      //   }
      // }
    }
  }
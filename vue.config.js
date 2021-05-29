module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warning: false,
      errors: false
    },
    port: '8080',
    open: true,
    proxy: {
      '/service': {
        target: 'http://localhost:8000',
      }
    }
  }
}

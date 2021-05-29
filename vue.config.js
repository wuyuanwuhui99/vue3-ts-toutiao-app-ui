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
      '/api': {
        // /api 的意义在于，声明axios中url已/api开头的请求都适用于该规则，
        // 注意是以/api开头，即：axios.post({url: '/api/xxx/xxx'})
        target: 'https://localhost:8081',
        // 此处target的意义在于：造成跨域是因为访
        // 问的host与我们的请求头里的origin不一致，所以我们要设置成一致，这个具体请看下文
        changeOrigin: true,
        pathRewrite: {'^/api': 'http://localhost:8081/api'}
        // 此处是大部分文章都不会明说的的地方，
        // 既然我们设置了代理，则所有请求url都已写成/api/xxx/xxx，那请求如何知道我们到底请求的是哪个服务器的数据呢
        // 因此这里的意义在于， 以 /api开头的url请求，代理都会知道实际上应该请求那里，
        // ‘http://localhost:8081/api’，后面的/api根据实际请求地址决定，即我的请求url：/api/test/test，被代理后请求的则是
        // https://localhost:8081/api/test/test
      }
    }
  }
}

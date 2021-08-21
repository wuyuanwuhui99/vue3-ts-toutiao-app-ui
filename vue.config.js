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
            '^/service/toutiao': {
                target: 'http://localhost:8000',
            },
            '^/service/video': {
                target: 'http://localhost:8001',
            },
            '^/service/movie': {
                target: 'http://localhost:5000',
            },
            '/static': {
                target: 'http://localhost:5001',
            }
        }
    }
}

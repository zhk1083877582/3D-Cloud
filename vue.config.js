const PostCompilePlugin = require('webpack-post-compile-plugin')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')
const path = require("path");
const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
    css: [],
    js: [
        'https://cdn.staticfile.org/vue/2.6.11/vue.min.js',
        'https://cdn.staticfile.org/vue-router/3.2.0/vue-router.min.js',
        'https://libs.cdnjs.net/axios/0.19.2/axios.min.js',
    ]
}

function resolve(dir) {
    return path.join(__dirname, dir)
}
console.log(process.env.NODE_ENV)
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        disableHostCheck: true,
        port: 8080, // 端口号
        host: '0.0.0.0',
        https: false,
        proxy: {
            '/api': {
                target: 'http://172.16.9.58:9501', // 开发版接口
                // target: 'https://tcwgwdev.tospur.com',  // 开发版本接口
                // target: 'https://tcwgwtest.tospur.com', // 测试版接口
                //  target: 'https://tcwgwstag.tospur.com', // 预发布接口
                // target: 'https://tcstag.tospur.com',
                // target: 'https://tcwgwprod.tospurhf.com', // 正式环境接口
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/baiduApi': {
                target: 'https://aip.baidubce.com', //访问地址
                changeOrigin: true,
                secure: false, //只有代理https 地址需要次选项
                pathRewrite: {
                    '^/baiduApi': ''
                }
            }
        }, // 配置多个代理
    },
    chainWebpack: config => {
        // // 配置别名
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@img", resolve("src/assets/img"))
            // 生产环境配置
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        if (isProduction) {
            //压缩代码
            config.optimization.minimize(true);
            //分割代码
            config.optimization.splitChunks({
                    chunks: 'all'
                })
                // 生产环境注入cdn
            config.plugin('html')
                .tap(args => {
                    args[0].cdn = cdn;
                    return args;
                });
        }
        const conf = config.toConfig()
        config
            .plugin('post-compile')
            .use(PostCompilePlugin, [{
                config: {
                    module: {
                        rules: [...conf.module.rules]
                    }
                }
            }])
            .end()
            .plugin('transform-modules')
            .use(TransformModulesPlugin)
    },

    configureWebpack: config => {
        if (isProduction) {
            // 用cdn方式引入
            config.externals = {
                    'vue': 'Vue',
                    'vue-router': 'VueRouter',
                    'axios': 'axios'
                }
                //生产环境自动删除console
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
            config.optimization.minimizer[0].options.sourceMap = false;
            config.optimization.minimizer[0].options.parallel = true;
        }
    },
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true
                    // 自定义主题场景
                    // import: [path.resolve(__dirname, './src/theme')]
            }
        },
        // 是否使用css分离插件 ExtractTextPlugin
        //extract: true,
        // 开启 CSS source maps?
        // sourceMap: false,
        // requireModuleExtension: false,
    }
}
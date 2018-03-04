// node内置模块
let path = require('path');
// 把当前路径解析出一个绝对路径
console.log(path.resolve('./dist'));

// 插件要首先 在webpack.config.js 中引入,这是一个 类,在 plugins 中调用
let HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack-dev-server
// 内置一个服务,可以帮我们启动一个端口号,当代码更新时,可以自动打包(内存中打包,省去I/O读写,节省性能资源),代码有变化就重新执行,在package.json的脚本中配置指令

module.exports = {
    // entry:{
    //     main:'./main.js',
    //     main1:'./main.js',
    // },
    entry:'./src/main.js',
    output:{
        filename:'bundle.js',
        // filename:'[name].js', //多入口打包
        path:path.resolve('./dist')
    },
    // 模块的解析规律
    // -js 匹配所以的js, 用babel-loader 转译 排除掉node_modules
    module:{
        rules:[
            {   
                // 匹配的内容
                test:/\.js$/,
                use:'babel-loader',
                // 排除的内容
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                // use顺序是 先执行右边 然后到左边,所以css-loader要先执行
                use:['style-loader','css-loader']           
            },
            {   
                // less,sass,stylus 都要另外配置
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']    
            },
            {
                // url-loader是依赖于file-loader,所以只要引用 url-loader就行了
                test:/\.(jpg|png|gif)$/,
                // 参数 ?limit=字节 : base64只在 8192字节以下转换,其他情况输出图片
                use:'url-loader?limit=8192'
            },
            {
                test:/\.vue$/,
                use:'vue-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({ // 自动插入 dist 目录中
            // 我们自己使用的模板
            template:'./src/index.html',
            // 假如想更改名字,就添加 filename 属性
            // filename:'login.html'
        })
    ]

}
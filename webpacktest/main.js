// babel-preset-es2015 --save-dev
let str = require('./src/a.js');
console.log(str);

// babel-preset-stage-0 --save-dev
import xxx from './src/b.js';
console.log(xxx)

// css-loader style-loader --save-dev
// css-loader 把 css 解析成模块插入 style标签(style-loader),所以要先引用css-loader 再到 style-loader
import './src/index.css';
import './src/style.less';

// 引用图片
// 要用 import 导入 图片进来打包
import imageSrc1 from './src/images/saber0.jpg';
console.log(imageSrc1);
let newImg = new Image();
newImg.src = imageSrc1;
document.body.appendChild(newImg);

// 需要解析 html插件 html-webpack-plugin
// 插件作用是以为我们自己的html为模板将打包后的结果,自动引入html中产出dist目录下
/* 插件要首先 在webpack.config.js 中引入
let HtmlWebpackPlugin = require('html-webpack-plugin')
*/

/*
编译vue文件需要vue-loader vue-template-compiler,webpack.config.js只要配置 vue-loader(依赖于 vue-template-compiler)
*/
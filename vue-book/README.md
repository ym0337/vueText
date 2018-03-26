## 项目用到less
```
npm install less less-loader axios vuex 
```
- mock 模拟数据
- api 接口
- base 基础组件
- components 页面组件

## 热门图书的功能
- 先写服务端,确保数据返回正常
- 增加api方法,实现调取数据的功能
- 在哪个组件中应用这个api,如果是一个基础组件需要用这些数据,在使用这个组件的父级中调用这个方法,将数据传递给基础组件
- 写一个基础组件
  - 1.创建一个.vue文件
  - 2.在需要使用这个组件的父级中引用这个组件
  - 3.在组件中注册
  - 4.以标签的形式引入

## 路由元信息

## 下拉加载
- 默认给5条,前端告诉后台现在要从第几条开始给
- 如:/page?offset=0,0条开始给
- 后端还要告诉前端是否还有更多数据 hasMore

## 代码分割 coding split
- 在component:()=>import('组件路径')

## 项目上线
- 1. fs.stat('路径',function(err,stats){...})
- 2. 把服务器跨域相关的代码去掉,防止别人恶意访问
- 3. 在路由中添加 mode:'history'
- 4. config/index.js 中的 productionSourceMap: false
- 4. npm run build ,把生成的文件放到一个文件夹中
- 5. 部署服务器

## 启动项目
- 先在mock文件夹中:node server
- 然后在根目录: npm run dev

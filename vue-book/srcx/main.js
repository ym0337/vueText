// 在build/webpack.base.conf.js 中更改打包路径,src==>srcx
// 平级组件交互,找到共同的父级解决,跨组件交互,eventBus(发布订阅)容易混乱
// vuex 借鉴了(flux,redux),vuex只能在vue中使用(单独为vue开发的)
// vuex 为了大型项目,主要是状态(数据)管理,将数据统一管理

import Vue from 'vue';
import App from './App.vue';

// 引入store/index.js文件
import store from './store'

// 计数器
new Vue({
    el:'#app',
    ...App,
    store
})
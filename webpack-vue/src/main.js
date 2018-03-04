import Vue from 'vue';
/* vue.js = runtime + compiler
上面的引用方法是只引用了 runtime, compiler约6kb
*/

import App from './App.vue';
// console.log(App)
import router from './router'

import notify from './plugin/notify.js'
// notify.install(中的2个参数)
Vue.use(notify,{ // 使用自带的install的对象
    delay:5000
})

new Vue({
    
    // 渲染函数,createElement('标签','[内容(可以是嵌套')])
    // render函数会把虚拟dom渲染成真是dom
    // createElement 返回虚拟dom
    /*render:function(createElement){
        return createElement('h1',[
            'h1的内容',
            createElement('span','span内容')
        ])
    }*/
    /* 配置好vue-loader,vue-template-compiler后,可以接受.vue文件,由上面演变简化而来
    render:function(createElement){
        return createElement(App)
    }*/
    // 最终简化版
    router,
    render:h=>h(App)
}).$mount('#app');
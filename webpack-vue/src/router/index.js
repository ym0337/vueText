import Vue from 'vue';
import Home from '../components/Home.vue';
import List from '../components/List.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter) // 和以前不同的地方就是引入router之后要use;注册一些全局内容,如:<router-view>,<router-link>

let router = new VueRouter({
    routes:[
        {path:'/home',component:Home},
        {path:'/list',component:List},
    ]
});

export default router;

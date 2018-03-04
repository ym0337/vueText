import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/*
import Home from '@/components/Home'
import List from '@/components/List'
import Collect from '@/components/Collect'
import Detail from '@/components/Detail'
import Add from '@/components/Add'
*/
export default new Router({
  mode:'history', // 上线的时候加上
  routes: [
    {
      path: '/',
      redirect:'/home',
    },
    {
      path: '/home',
      // component: Home,
      component:()=>import('@/components/Home'), // 高级语法,代码分割,需要的时候才加载
      meta: {keepAlive:true} // meta路由元信息,keepAlive表示是否缓存,不写默认false;  this.$route.meta.keepAlive 能获取值
    },
    {
      path: '/list',
      // component: List
      component:()=>import('@/components/List')
    },
    {
      path: '/collect',
      // component: Collect
      component:()=>import('@/components/Collect')
    },
    // /detail/1, {bid:1} 路径参数,必须要有,可以随机
    {
      path: '/detail/:bid',
      // component: Detail,
      component:()=>import('@/components/Detail'),
      name:'detail'
    },
    {
      path: '/add',
      // component: Add
      component:()=>import('@/components/Add')
    }
  ]
})

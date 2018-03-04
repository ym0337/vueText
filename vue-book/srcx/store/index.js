import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger'; // 由于在文件夹vuex中,所以只能用原路径

Vue.use(Vuex); // 需要use

//容器是唯一的,state, store, mutations都是固定的,不要随便改
const state = {count:0} // 需要在 store 上注册

// 类似computed,是一个对象,里面的函数都是返回一个值
const getters = {
    // 原本的写法,返回一个值 val(){return ...},
    val:(state)=>state.count%2?'奇数':'偶数',
    num(state){
        return state.count>10?10:state.count
    }
}

import mutations from './mutations';
import actions from './actions';
/* 把 mutations 分离出来,独立引入
const mutations = {
    add(state,params2){ // state是自动放入,默认指的就是当前的state
        if(isNaN(parseInt(params2)))return
        state.count += params2;
    },
    minus(state){
        state.count -= 1;
    }
}
*/

const store = new Vuex.Store({ // 需要在实例上注册
    state,
    mutations,
    actions,
    getters,
    plugins:[logger()], // vuex文件夹中自带的 日志插件,
    strict:true // 严格模式,只能通过mutation(管理员)来更改状态(其他方法会报错),mutation不支持异步
})

export default store

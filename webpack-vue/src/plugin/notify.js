// 简单的插件写法
import modal from './notify.vue';
let notify = {};
// 当前对象需要有一个 install(可带2个参数) 方法
// 给 options 一个默认值
notify.install = function(Vue,options={delay:2000}){
    // 给Vue添加全局方法
    Vue.say = function(){alert('notify')};
    // 注册全局组件
    Vue.component('aaa',modal);
    Vue.prototype.$notify = function(message,opt={}){
        //  给notify添加一个自定义 el 属性,判断是否存在
         if(notify.el)return;
        // 用自己调用插件时传递过来的属性覆盖掉默认属性的值
        options = {...options,...opt};
        let V = Vue.extend(modal); // 返回的是一个构造函数的子类,参数是包含组件选项的对象
        let vm = new V;
        let oDiv = document.createElement('div'); // 先创建一个div,将实例挂载到元素上       
        document.body.appendChild(oDiv);
        vm.$mount(oDiv);
        // 给notify添加一个自定义 el 属性
        notify.el= vm.$el;
        vm.value = message; // 挂载之后,vm可以给value属性赋值
        setTimeout(()=>{ // 延迟多少秒把dom元素移除
            notify.el = null; // 清空 el属性
            document.body.removeChild(vm.$el); // 将实例的元素删除掉,这里不能是oDiv,必须是 vm.$el
        },options.delay);
    }
};
// 导出包含 install的对象,供 Vue.use(notify,options)调用install方法
export default notify;
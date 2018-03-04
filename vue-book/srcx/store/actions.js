// 异步操作,需要同步操作建议用 mutations
const actions = {
    addIncrement({commit,dispatch}){ // es6解构赋值传参{},对比下面的,把用到的属性直接传进了,就可以不用写context了
        setTimeout(()=>{
            commit('add',3)
            dispatch('textAction',{msg:'我触发了textAction'})
        },500)
    },
    // addIncrement(context){ // 默认传参
    //     setTimeout(()=>{
    //         // 改变状态,必须提交 mutations
    //         context.commit('add',3)
    //         context.dispatch('textAction',{msg:'我触发了textAction'}) // 触发第二个ajax
    //     },1000)
    //     // console.log(context)
    // },
    // 假如有上面的ajax完成之后要触发另一个ajax(textAction),就需要用到context的dispatch()方法
    textAction(context,obj){
        console.log(obj.msg)
    }
}

export default actions
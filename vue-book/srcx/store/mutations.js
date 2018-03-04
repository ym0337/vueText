// 同步操作,需要异步操作是要配合 actions,例子,add方法,配合actions 的 addIncrement
const mutations = {
    add(state,payload){ // state是自动放入,默认指的就是当前的state
        if(isNaN(parseInt(payload)))return
        state.count += payload;
    },
    minus(state,payload){
        state.count -= payload.de;
    }
}

export default mutations
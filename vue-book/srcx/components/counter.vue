<template>
  <div class="sum">
      <button @click="minus">-</button>{{$store.state.count}}<button @click="add">+</button>
      <h3>{{$store.getters.val}}</h3>
      <h3>{{$store.getters.num}}</h3>
  </div>
</template>
<script>
export default {

  methods:{
      add(){ // 这个add跟mutations的是不一样的
            // commit('add',payload) 荷载payload(可以是对象或者单个参数), payload 是传参的
          // this.$store.commit('add',3) // 同步操作. commit('add')指的是mutations里面的add
          this.$store.dispatch('addIncrement') // 异步操作,需要用到 dispatch(派发),addIncrement:actions的方法
      },
      minus(){
          this.$store.commit({ // 也可以{type:'minus',参数2}
              type:'minus',
              de:2
          });
      }
  }
}
</script>
<style scoped>
.sum{
    display: inline;
}
</style>


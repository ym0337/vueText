<template>
  <div>
    <span>{{msg}}</span>
    <!-- 插件注册的组件 -->
    <!-- <aaa></aaa> -->
    <button @click="show">notify</button>
  </div>
</template>
<script>
import Vue from 'vue';
export default {  
  data(){
    return{
      msg:'hello'
    }
  },
  methods:{
    show(){
      this.$notify('我好帅',{delay:1000});
      // 插件把方法挂载到Vue实例上
      // Vue.say()
    }
  }
}
</script>
<style scoped>

</style>



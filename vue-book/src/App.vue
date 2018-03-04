<template>
  <div id="app">
    <transition name="fadeIn">
      <keep-alive>
        <!-- 需要缓存页面 -->
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive> 
    </transition>
    <!-- 不需要缓存 -->
    <transition name="fadeIn">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Tab></Tab>    
  </div>
</template>

<script>

import Tab from '@/base/Tab.vue';
export default {
  name: 'App',
  components:{
    Tab,
  }
}
</script>

<style>
/* 清除默认样式 */
*{margin:0;padding:0;}
ul,ol,li{list-style: none;}
a{text-decoration:none;}
input,button{-webkit-appearance: none;}
.content{position:fixed;top:40px;bottom: 50px;width:100%;overflow: auto;}

.fadeIn-enter{
  opacity: 0;
}
.fadeIn-enter-active{
  transition: all 0.3s linear;
}
.fadeIn-leave-active{
  transition: all 0.3s linear;
  opacity: 0;
}
</style>

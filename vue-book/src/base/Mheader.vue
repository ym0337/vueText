<template>
  <div class="header">
      <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
      <!-- slot接受传参 -->
      <slot></slot>
  </div>
</template>

<script>
export default {
    props:{
        back:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
    }
}
</script>

<style scoped lang="less">
.header{
    width: 100%;
    background-color: #3f8dd6;
    height: 40px;
    text-align:center;
    // justify-content: center;
    line-height: 40px;
    position: fixed;
    left:0;
    top:0;
    i{
        position: absolute;
        left: 15px;
        top:0;
    }
}
</style>
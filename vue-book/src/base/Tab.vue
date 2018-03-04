<template>
  <div class="footer">
  <router-link to='/home' tag="a">
  <i class="iconfont icon-weibiaoti1"></i>
  <span>首页</span>  
  </router-link>
  <router-link to='/list'>
  <i class="iconfont icon-liebiao"></i>
  <span>列表页</span>
  </router-link>
  <router-link to='/collect'>
  <i class="iconfont icon-shoucang"></i>
  <span>收藏</span>
  </router-link>
  <router-link to='/add'>
  <i class="iconfont icon-tianjia"></i>
  <span>添加</span>
  </router-link>
  </div>
</template>

<script>
export default {

}
</script>
<!--
display:flex;
flex-direction:row / column;
justify-content:center; 垂直居中
align-items:center; 横向居中
flex:1;
router-link-exact-active 确切激活的 
router-link-active
-->
<style scoped lang="less">
.footer{
  position: fixed;
  bottom:0;
  left:0;
  width:100%;
  height:50px;
  display:flex;
  border-top:1px solid #ccc;
  a{
    display:flex;
    flex-direction: column;
    flex:1;
    align-items:center;
    justify-content:center;
  }
  a.router-link-active{
    color: #c2c;
    }
}
</style>
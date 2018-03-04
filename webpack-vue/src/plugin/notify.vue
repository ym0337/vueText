<template>
  <div class="notify">
      {{value}}
  </div>
</template>
<script>
export default {
  data(){
    return {value:'我很丑'}
  }
}
</script>
<style scoped>
  .notify{
    font-size: 50px;
    color:chocolate;
    background: black;
    width: 300px;
    height: 150px;
  }
</style>
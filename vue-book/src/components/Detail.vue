<template>
  <div class="detail">
    <Mheader :back="true">详细信息</Mheader>
    <ul>
      <li>
        <label for="bookName">书的名字:</label>
        <input type="text" v-model="book.bookName" id="bookName">
      </li>
      <li>
        <label for="bookInfo">书的详情:</label>
        <input type="text" v-model="book.bookInfo" id="bookInfo">
      </li>
      <li>
        <label for="bookPrice">书的名字:</label>
        <input type="text" v-model.number="book.bookPrice" id="bookPrice">
      </li>
      <li>
         <label for="bookCover">书的封面链接:</label>
        <input type="text" v-model="book.bookCover" id="bookCover">
      </li>
      <li>
        <button @click="update">确认修改</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Mheader from '@/base/Mheader.vue';
import {findOneBook,updateBook} from '@/api';
export default {
  data(){
    return {book : {}}
  },
  components:{Mheader},
  created(){
    this.getData(this.bid);
  },
  watch:{
    $route(){ // 监控route的变化,只要变化了就马上调用下面的方法
      this.getData(this.bid);
    }
  },
  computed:{
    bid(){
      return this.$route.params.bid;
    }
  },
  methods:{
    async getData(id){
      this.book = await findOneBook(id);
      // 如果是空对象,需要跳转回到列表页
      /*
      对象转成数组 Object.keys(obj)
      */ 
      Object.keys(this.book).length > 0?void 0:this.$router.push('/list'); // void 0 表示什么都不干
    },
    async update(){
      await updateBook(this.bid,this.book);
      this.$router.push('/list'); // 修改完跳转页面
    }
  }
}
</script>

<style scoped lang="less">
.detail{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: #fff;
  z-index: 99;
  ul{
    margin:50px 20px 0;
    li{
      margin:10px 0;
      label{
        display: block;
        font-size: 25px;
      }
      input{
        height: 25px;
        width: 100%;
      }
      button {
          width: 80px;
          height: 35px;
          border: none;
          border-radius: 5px;
          color:#fff;
          background: rgb(48, 129, 156);
          outline: none;
        }
    }
  }
}

</style>
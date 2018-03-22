<template>
  <div>
  <Mheader>添加</Mheader>
  <div class="content">
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
        <label for="bookPrice">书的价格:</label>
        <input type="text" v-model.number="book.bookPrice" id="bookPrice">
      </li>
      <li>
        <label for="bookCover">书的封面链接:</label>
        <input type="text" v-model="book.bookCover" id="bookCover">
      </li>
      <li>
        <button @click="add">添加</button>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
import Mheader from "@/base/Mheader.vue";
import {addBook} from '@/api';
export default {
  data(){
    return {book : {}}
  },
  created(){

  },
  methods:{
    async add(){
      console.log(this.book)
      await addBook(this.book);
      this.$router.push('./list');
    }
  },
  components: { Mheader }
};
</script>

<style scoped lang="less">
ul {
  margin: 50px 20px 0;
  li {
    margin: 10px 0;
    label {
      display: block;
      font-size: 25px;
    }
    input {
      height: 25px;
      width: 100%;
    }
    button {
      width: 80px;
      height: 35px;
      border: none;
      border-radius: 5px;
      color: #fff;
      background: rgb(48, 129, 156);
      outline: none;
    }
  }
}
</style>
<template>
  <div>
    <mheader>收藏</Mheader>
    <div class="content">
       <ul>
        <!-- :to 用到路径参数的时候,必须给组件起一个 name属性,来区分,然后传入params 参数, key值(bid)跟路由定义的要一致-->
        <router-link v-for="(book,key) in collectBook" :key="key" :to="{name:'detail',params:{bid:book.bookId}}" tag="li">
          <img :src="book.bookCover">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>价格: {{book.bookPrice}}</b>
            <button @click.stop="update(book.bookId)">取消收藏</button>
          </div>        
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Mheader from "@/base/Mheader.vue";
import { getCollect,updateBook } from "@/api";
export default {
  data() {
    return {
      collectBook: []
    };
  },
  created() {
    this.getCol();
  },
  methods: {
    async getCol() {
      this.collectBook = await getCollect();
    },
    async update(){
      await updateBook(this.bid,this.book);
      this.$router.push('/list'); // 修改完跳转页面
    }
  },
  components: { Mheader }
};
</script>

<style scoped lang="less">
.content {
  ul {
    padding: 10px;
    li {
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      display: flex;
      img {
        width: 130px;
        height: 150px;
      }
      div {
        position: relative;
        h4 {
          font-size: 20px;
          line-height: 35px;
        }
        p {
          line-height: 25px;
        }
        b {
          color: #991111;
          position: absolute;
          left: 0;
          bottom: 45px;
        }
        button {
          display: block;
          width: 60px;
          height: 35px;
          border: none;
          border-radius: 15px;
          position: absolute;
          bottom: 5px;
          left: 0;
          color: #fff;
          background: orangered;
          outline: none;
        }
      }
    }
  }
  .more {
    width: 100%;
    height: 35px;
    line-height: 35px;
    border: none;
    font-size: 20px;
    background: rgb(233, 233, 233);
  }
}
</style>
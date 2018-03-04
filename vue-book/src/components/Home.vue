<template>
  <div>
    <Mheader>首页</Mheader>
    <div class="content">
      <loading v-if="isLoad" ></loading>
      <template v-else>
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="(hot,key) in hotBooks" :key="key">
              <img :src="hot.bookCover"/>
              <b>{{hot.bookName}}</b>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Mheader from "@/base/Mheader.vue";
import Swiper from "@/base/Swiper.vue";
import loading from "@/base/loading.vue";
// import { getSliders, getHotBooks } from "@/api";
import { getAll } from "@/api"; // getAll 包括了上面2个api,所以只要引用getAll就行了
export default {
  components: { Mheader, Swiper, loading },
  // axios返回promise对象,可以用async,await来获取返回值
  /*async created(){
    // 给data起别名(对象解构),对象的属性名字必须和得到的结果名字一致
    // let {data:sliders} = await getSliders();

    // 这里是通过axios拦截器,把res直接处理成res.data,所以不用对象解构
    // let sliders = await getSliders();
    // this.sliders = sliders;
  },*/
  created() {
    /*this.getSlider();
    this.getBook();*/
    this.getData();
  },
  data() {
    return {
      sliders: [],
      hotBooks: [],
      isLoad: true
    };
  },
  methods: {
    /*async getSlider() {
      // 这里是通过axios拦截器,把res直接处理成res.data,所以不用对象解构
      this.sliders = await getSliders();
    },
    async getBook() {
      this.hotBooks = await getHotBooks();
    }*/
    async getData() {
      let [sliders, hotBooks] = await getAll();
      this.sliders = sliders;
      this.hotBooks = hotBooks;
      this.isLoad = false;
    }
  }
};
</script>

<style scoped lang="less">
.container {
  width: 90%;
  margin: 0 auto;
  h3 {
    color: #333;
    padding: 5px 0;
  }
  ul {
    display: flex;
    /* display flex默认是不换行的,所以需要换行的时候用添加wrap*/
    flex-wrap: wrap;
    li {
      width: 50%;
      text-align: center;
      margin: 5px 0;
      img {
        width: 100%;
      }
    }
  }
}
</style>
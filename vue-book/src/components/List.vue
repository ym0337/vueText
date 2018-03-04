<template>
  <div>
    <Mheader>列表</Mheader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <ul>
        <!-- :to 用到路径参数的时候,必须给组件起一个 name属性,来区分,然后传入params 参数, key值(bid)跟路由定义的要一致-->
        <router-link v-for="(book,key) in books" :key="key" :to="{name:'detail',params:{bid:book.bookId}}" tag="li">
          <img :src="book.bookCover">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>价格: {{book.bookPrice}}</b>
            <button @click.stop="remove(book.bookId)">删除</button>
          </div>        
        </router-link>
      </ul>
      <button class="more" @click="getData">{{hasMore?'加载更多':'没有更多'}}</button>
    </div>
  </div>
</template>

<script>
import Mheader from "@/base/Mheader.vue";
// import { getBooks, removeBook } from "@/api";
import { pagination, removeBook } from "@/api";
export default {
  created() {
    this.getData();
  },
  mounted(){
    /* dom事件可以等元素挂载后再绑定, 所以可以不必在 标签上面写,写在这里也一样
    this.$refs.scroll.addEventListener('scroll',this.loadMore)*/
    // 下拉刷新
    let scroll = this.$refs.scroll; // 获取到元素  
    let top = scroll.offsetTop;  
    let distance = 0;
    scroll.addEventListener('touchstart',(e)=>{    
      if(scroll.scrollTop != 0&&scroll.offsetTop == top) return 
      // console.log(e.touches)
      let start = e.touches[0].pageY; // 手指点击开始的位置
      let move = e=>{        
        let current = e.touches[0].pageY;
        distance = current - start;
        if(distance > 0){
        /*if(distance <= 50){ // 最大下拉距离设置为 50px;
            scroll.style.top = distance + top + 'px';
          }else{
            distance = 50;
            scroll.style.top = top + distance + 'px';
          }*/
          distance = distance <=50?distance:50;
          scroll.style.top = top + distance + 'px';
        }else{
          // 当distance小于0(上划的时候),移除move,end事件
          scroll.removeEventListener('touchmove',move);
          scroll.removeEventListener('touchend',end)
        }      
      };
      let end = e=>{
        clearInterval(this.timer); // 必须先清除以前的定时器
        this.timer = setInterval(()=>{
          distance -=1;
          if(distance <=0 ){
            clearInterval(this.timer) // 同样是清除定时器
            distance = 0;
            this.books = []; // 清空 books 的数据
            this.offset = 0; // offset 归零
            this.getData();
          }
          scroll.style.top = top + distance + 'px';
        },3)
      };
      scroll.addEventListener('touchmove',move);
      scroll.addEventListener('touchend',end)
    },false)
  },
  data() {
    return {
      books: [],
      offset: 0,
      hasMore: true,
      isLoading: false,
      timer:null,
      timerI:null
    };
  },
  components: { Mheader },
  methods: {
    loadMore(){
      clearTimeout(this.timer);
      // 防抖,节流
      this.timer = setTimeout(()=>{ // 这里不能用 function(){},因为是 this是指向vm,所以要用 ()=>{} 来把this指向给vm
        // 解构赋值
        let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
        if(scrollTop + clientHeight + 20 >= scrollHeight){ // 一般都是多 20px ,自己修改的
          this.getData();     
        }
      },60)
    },
    async getData() {
      // this.books = await getBooks();   
      if(this.hasMore && !this.isLoading){ // isLoading 防止短时间内重复点击,发送请求
        this.isLoading = true;
        let { hasMore, books } = await pagination(this.offset); // 因为pagination返回的对象{hasMOre:hasMOre,books:result}
        this.books = [...this.books,...books];
        this.offset = this.books.length;
        this.hasMore = hasMore;
        this.isLoading = false;   
      }   
    },
    async remove(id) {
      await removeBook(id);
      this.books = this.books.filter(item => item.bookId !== id);
    }
  }
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
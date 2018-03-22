<template>
  <div>
    <swiper :options="swiperOption">
    <swiper-slide v-for="(slide,key) in swiperSlides" :key="key">
      <img :src="slide">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
export default {
  name: "carrousel",
  props: ["swiperSlides"],
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay:true,
        setWrapperSize:true
      }
    };
  }
};
</script>
<style scoped>
img {
  width: 100%;
}
</style>

<template>
    <div>

        <swiper :options="swiperOption">

            <swiper-slide v-for="item in bannerList" :key="item.id">

                <img :src="item.pic" />

            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>

        </swiper>

    </div>
</template>
<script>
export default {
  name: 'banner',
  data () {
    return {
      bannerList: [],
      swiperOption: {
        loop: true,
        autoplay: {
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  methods: {
    getBanner () {
      this.$axios.get('/api/banner?type=1').then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.bannerList = res.data.banners
        }
      })
    }
  },
  mounted () {
    this.getBanner()
  }
}
</script>
<style lang='stylus' scoped>
img
  width 100%
</style>

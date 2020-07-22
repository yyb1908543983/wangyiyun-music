<template>
    <ul>

        <li v-for="(item, index) in menuList" :key="item.id" @click="handlerEventA(index)">

            <div class="bg">

                <i class="iconfont" :class="item.iconClass"></i>

                <span :class="{date:index == 0 ? true : false}" v-if="index == 0">{{day}}</span>

            </div>

            <p class="title">{{item.title}}</p>

        </li>

    </ul>
</template>
<script>
export default {
  name: 'navMenu',
  data () {
    return {
      menuList: [{
        title: '每日推荐',
        iconClass: 'icon-rili'
      }, {
        title: '歌单',
        iconClass: 'icon-gedan'
      }, {
        title: '排行榜',
        iconClass: 'icon-paixingbang'
      }, {
        title: '电台',
        iconClass: 'icon-yinle'
      }, {
        title: '私人FM',
        iconClass: 'icon-diantai'
      }]
    }
  },
  methods: {
    handlerEventA (index) {
      if (index === 1) {
        this.$router.push({ name: 'center' })
      }
      if (index === 2) {
        this.$router.push({ name: 'top' })
      }
      if (index === 0) {
        this.$router.push({ name: 'date' })
      }
    }
  },
  computed: {
    day () {
      return new Date().getDate()
    }
  }
}
</script>
<style lang='stylus' scoped>
ul
  display flex
  padding .3rem 0
  li
    flex 1
    text-align center
    height 1.7rem
    display flex
    flex-direction column
    justify-content space-around
    .bg
      width 0.8rem
      height .8rem
      align-self center
      line-height .8rem
      border-radius 50%
      color #ffffff
      background linear-gradient(to right, #ff5a4c,#ff1d11)
      position relative
      .iconfont
        font-size .54rem
      .date
        position absolute
        left 50%
        width .4rem
        line-height .4rem
        margin-left -(@width/2)
        top .3rem
</style>

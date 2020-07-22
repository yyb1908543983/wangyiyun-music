<template>
    <div class='container'>

        <div class='pos-f'>

            <div class='head'>

                <i class='iconfont left' @click='goBack'>&#xe620;</i>

                <span class='title'>歌单广场</span>

            </div>

            <ul class='item'>

                <router-link tag="li" :to="{ name: 'tuijian'}" active-class='active'>推荐</router-link>

                <router-link tag="li" :to="{ name: 'jingpin'}" active-class='active'>精品</router-link>

                <router-link tag="li" :to="{ name: 'oumei'}" active-class='active'>欧美</router-link>

                <router-link tag="li" :to="{ name: 'dianzi'}" active-class='active'>电子</router-link>

                <router-link tag="li" :to="{ name: 'minyao'}" active-class='active'>民谣</router-link>

                <router-link tag="li" :to="{ name: 'qingyinyue'}" active-class='active'>轻音乐</router-link>

                <router-link tag="li" :to="{ name: 'hanyu'}" active-class='active'>韩语</router-link>

            </ul>

        </div>

        <keep-alive>

            <router-view></router-view>

        </keep-alive>

    </div>
</template>
<script>
export default {
  name: 'songCenter',
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="stylus" scoped>
.pos-f
  position fixed
  background #fff
  top 0
  left 0
  width 100%
  height 2.2rem
  z-index 10
.container
  position relative
  padding 0 .3rem
  .head
    padding .3rem 0
    font-size .4rem
    .left
      font-size .4rem
      margin-right .1rem
.item
  display flex
  border-bottom 1px solid #ccc
  overflow scroll
  li
    flex 1
    min-width 1.4rem
    text-align center
    line-height 1rem
.active
  color red
  border-bottom 1px solid red
</style>

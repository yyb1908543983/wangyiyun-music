<template>
   <div class='container'>

        <div class="head">

            <header>

                <i class="iconfont" @click="goBack">&#xe620;</i>

                <span class="name">每日推荐</span>

            </header>

            <div class="inneer-content">

                <div class="dt">

                    <span class="day">{{day}}</span>

                    <span class="mouth">/{{m}}</span>

                    <p class="title">查收属于你的今日推荐</p>

                </div>

            </div>

        </div>

        <div class="noLogin" v-if="!loginState">

        <p>当前未登陆</p>

        <p @click="toLogin">请先登录</p>

        </div>

        <div class="user" v-else>

        <div class="all">

            <i class="iconfont">&#xe63a;</i>

            <span class="alin">播放全部</span>

            <span class="allnum">(共{{songDeatil.length}}首歌)</span>

        </div>

        <div class="song-list">

            <div class="list-item" v-for="(item, index) in

      songDeatil" :key="index" @click="fullPlay(index, songDeatil, item.id)">

                <div class="left-item">

                <img :src="item.album.picUrl" alt="">

                </div>

                <div class="right-item">

                    <p class="name ell">{{item.name}}

                        <i class="iconfont bofang">&#xe63a;</i>

                    </p>

                    <p class="name ar ell">

                        <span v-for="(val, index) in item.artists" :key="index">{{val.name}}/</span>-

                        <span class="ell">{{item.album.name}}</span>

                    </p>

                </div>

            </div>

        </div>

      </div>

    </div>
</template>
<script>
import bus from '@/bus.js'
export default {
  name: 'date',
  data () {
    return {
      // 对象
      songDeatil: [],
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      loginState: 0
    }
  },
  computed: {
    m () {
      const m = this.month < 10 ? '0' + this.month : this.month
      return m
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/phone')
    },
    fullPlay (index, allList, id) {
      this.$store.commit('fullPlayer', { index, allList }) // 数据存仓
      // 点击某一首歌，需要点击的索引与歌曲，在全屏播放器中部分当前点击的这首歌
      localStorage.setItem('list', allList)
      const that = this
      this.$store.dispatch('getUrl', { that, id })
      bus.$emit('show')
    },
    getDeatil () {
      this.axios.get('/api/recommend/songs').then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.songDeatil = res.data.recommend
          res.data.recommend.map((val, index) => {
            const a = val.album
            val.al = a
            const s = val.artists
            val.ar = s
          })
          this.songDeatil = res.data.recommend
        }
      })
    },
    goBack () {
      this.$router.push('/')
    }
  },
  mounted () {
    if (localStorage.user) {
      this.loginState = 1
      this.getDeatil()
    } else {
      this.loginState = 0
    }
  }
}
</script>
<style lang="stylus" scoped>
.noLogin
  padding 0 .3rem
  height 2rem
  background #ccc
  text-align center
  p
    line-height 3
.container
  .dt
    color #fff
    margin-top .5rem
    .day
      font-size .6rem
    .month
      font-size .4rem
      color #ccc
      &:before
        content "/"
    .title
      margin-top .5rem
    h3
      line-height 1rem
      font-size .32rem
.bofang
  font-size .32rem
  color #999
  float right
.ell
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
.ar
  font-size .22rem
  color #999
.song-list
  padding 0 .3rem
  .list-item
    height 1.2rem
    width 100%
    display flex
    .left-item
      margin 0 auto
      padding .2rem .2rem
      line-height 1
      img
        width 1rem
        height 1rem
    .right-item
      flex 1
      overflow hidden
      .name
        line-height 2
.all
  padding 0 .3rem
  height 1rem
  line-height 1rem
  font-size .3rem
  .allnum
    font-size .22rem
    margin-left .1rem
    color #999
.inneer-content
  height 2.5rem
  background #ee5253
  display flex
  flex-wrap wrap
  box-sizing: border-box;
  padding: 0 0.23rem;
.head
  background-color #ee5253
  header
    line-height 2rem
    color #ffffff
    .iconfont
      font-size .7rem
      color #ffffff
      margin-right .3125rem
    .name
      font-size: 0.4rem;
      vertical-align: 5px;
      width: 8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height 1rem
</style>

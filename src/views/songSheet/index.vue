<template>
    <div class='container'>

        <div class="head">

            <header>

                <i class="iconfont" @click="goBack">&#xe620;</i>

                <span class="name">{{songDeatil.name}}</span>

            </header>

            <div class="inneer-content">

                <div class="left">

                    <img :src="songDeatil.coverImgUrl" alt="">

                    <div class="paly-count">

                        <i class="iconfont">&#xe60a;</i>

                        <span class="count">{{songDeatil.playCount > 99999999 ? parseInt(songDeatil.playCount/100000000) + '亿' :

      parseInt(songDeatil.playCount/10000) + '万'}}</span>

                    </div>

                </div>

                <div class="right">

                    <p class="name">{{songDeatil.name}}</p>

                    <div class="desc">{{songDeatil.description}}</div>

                </div>

                <div class="bottom">

                    <ul class="icon-list">

                        <li class="icon">

                            <i class="el-icon-chat-line-round"></i>

                            <p class="exact-desc">{{songDeatil.commentCount > 9999 ? (songDeatil.commentCount/10000).toFixed(1) + '万' : songDeatil.commentCount}}</p>

                        </li>

                        <li class="icon">

                            <i class="el-icon-share"></i>

                            <p class="exact-desc">{{songDeatil.shareCount}}</p>

                        </li>

                        <li class="icon">

                            <i class="el-icon-upload"></i>

                            <p class="exact-desc">下载</p>

                        </li>

                        <li class="icon">

                            <i class="el-icon-copy-document"></i>

                            <p class="exact-desc">多选</p>

                        </li>

                    </ul>

                </div>

            </div>

        </div>

        <div class="all">

            <i class="iconfont">&#xe63a;</i>

            <span class="alin">播放全部</span>

            <span class="allnum">(共{{songDeatil.trackCount}}首歌)</span>

        </div>

        <div class="song-list">

            <div class="list-item" v-for="(item, index) in

      songDeatil.tracks" :key="index" @click="fullPlay(index, songDeatil.tracks, item.id)">

                <div class="left-item">

                    {{index + 1}}

                </div>

                <div class="right-item">

                    <p class="name ell">{{item.name}}

                        <i class="iconfont bofang">&#xe63a;</i>

                    </p>

                    <p class="name ar ell">

                        <span v-for="(val, index) in item.ar" :key="index">{{val.name}}/</span>-

                        <span>{{item.al.name}}</span>

                    </p>

                </div>

            </div>

        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
import bus from '@/bus.js'
export default {
  name: 'songSheet',
  data () {
    return {
      // 对象
      songDeatil: {}
    }
  },
  computed: {
    ...mapState({
      idx: 'idx'
    })
  },
  methods: {
    fullPlay (index, allList, id) {
      this.$store.commit('fullPlayer', { index, allList }) // 数据存仓
      // 点击某一首歌，需要点击的索引与歌曲，在全屏播放器中部分当前点击的这首歌
      localStorage.setItem('list', allList)
      const that = this
      this.$store.dispatch('getUrl', { that, id })
      bus.$emit('show')
    },
    getDeatil () {
      this.axios.get('/api/top/list?idx=' + this.idx).then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.songDeatil = res.data.playlist
        }
      })
    },
    goBack () {
      this.$router.push('/top')
    }
  },
  mounted () {
    if (this.$route.params.list) {
      this.songDeatil = this.$route.params.list
    } else {
      this.getDeatil()
    }
  }
}
</script>
<style lang="stylus" scoped>
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
      width 1rem
      line-height 1.2rem
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
  height 5rem
  background #ee5253
  display flex
  flex-wrap wrap
  box-sizing: border-box;
  padding: 0 0.23rem;
  .left
    width 2.6rem
    width: 2.6rem;
    height: 0;
    position: relative;
    padding-bottom: 2.6rem;
    border-radius: 0.11rem;
    overflow: hidden;
    img
      width 100%
    .paly-count
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      color #ffffff
      font-size .24rem
   .right
     width 3.6rem
     height: 2.6rem;
     color #ffffff
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -webkit-box-orient: vertical;
     -webkit-box-direction: normal;
     -ms-flex-direction: column;
     flex-direction: column;
     overflow: hidden;
     margin-left .8rem
    .name
         font-size: 0.36rem;
         line-height: 1.5;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 2;
         overflow: hidden;
         -webkit-box-orient: vertical;
     .desc
       width 3rem
       margin-top .5rem
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: 2;
       overflow: hidden;
       -webkit-box-orient: vertical;
       align-items: center;
       font-size .26rem
       line-height .4rem
       color: #ccc;
   .bottom
     width 100%
     margin-top: 8px;
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -ms-flex-pack: distribute;
     justify-content: space-around;
     ul li
       display: -webkit-box;
       display: -ms-flexbox;
       display: flex;
       -webkit-box-pack: center;
       -ms-flex-pack: center;
       justify-content: center;
       -webkit-box-align: center;
       -ms-flex-align: center;
       align-items: center;
       -webkit-box-orient: vertical;
       -webkit-box-direction: normal;
       -ms-flex-direction: column;
       flex-direction: column;
       float left
       margin-right .5rem
       padding-left .5rem
       color #ffffff
       i
         font-size: 0.4rem;
         margin-bottom: 5px;
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

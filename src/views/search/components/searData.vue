<template>
    <div class="wrapper">

        <div class="item">

            <h4>单曲</h4>

            <ul v-if="result">

                <li v-for="(item, index) in result.song.songs" :key="item.id" @click="play(index, result.song.songs, item.id)">

                    <p class="name">{{item.name}}</p>

                    <p class="art">

                        <span v-for="(val, index) in item.ar" :key="index">{{val.name}}</span>-<span>{{item.al.name}}</span>

                    </p>

                </li>

            </ul>

        </div>

        <div class="item songs" v-if="result">

            <h4>歌单</h4>

            <div class="list" v-for="(item, index)

      in result.playList.playLists" :key="index" @click="toSongSheet(item.id)">

                <div class="left">

                    <img :src="item.coverImgUrl" alt="">

                </div>

                <div class="right">

                    <p class="songname">{{item.name}}</p>

                </div>

            </div>

        </div>

        <div class="item sim" v-if="result">

            <h4>相关搜索</h4>

            <div class="list" v-for="(item, index) in result.sim_query.sim_querys" :key="index">

                {{item.keyword}}

            </div>

        </div>

    </div>
</template>
<script>
import bus from '@/bus.js'
export default {
  name: 'searData',
  data () {
    return {
      result: null
    }
  },
  methods: {
    toSongSheet (id) {
      this.axios.get('/api/playlist/detail?id=' + id).then((res) => {
        if (res.data.code === 200) {
          const list = res.data.playlist
          this.$router.push({ name: 'songSheet', params: { list } })
        }
      })
    },
    play (index, allList, id) {
      this.$store.commit('fullPlayer', { index, allList }) // 数据存仓
      // 点击某一首歌，需要点击的索引与歌曲，在全屏播放器中部分当前点击的这首歌
      localStorage.setItem('list', allList)
      const that = this
      this.$store.dispatch('getUrl', { that, id })
      bus.$emit('show')
    },
    getSite (val) {
      this.axios.get(`/api/search?keywords=
      ${val}&limit=30&offset=0&type=1018`).then((res) => {
        if (res.data.code === 200) {
          this.result = res.data.result
        }
      })
    }
  },
  mounted () {
    this.getSite(this.$route.params.val)
    bus.$on('changeSearch', val => {
      this.getSite(val)
    })
  }
}
</script>
<style lang="stylus" scoped>
.sim
  .list
    float left
    height .5rem
    display flex
    box-pack center
    box-align center
    align-items center
    font-size .24rem
    box-sizing border-box
    padding 0.2rem
    background-color #ddd
    border-radius 0.3rem
    margin-right .3rem
    margin-top .2rem
.songs
  .list
    display flex
    margin 0.4rem 0
    .left
      width 1.7rem
      height 1.7rem
      img
        width 100%
    .right
      padding-left .3rem
      flex 1
      width 0.3rem
.item
  padding 0 .3rem
  ul
    li
      height 1.2rem
      display flex
      flex-direction column
      border-bottom 1px soild #ccc
      line-height .2rem
    p
      line-height 2
h4
  padding-bottom .3rem
</style>

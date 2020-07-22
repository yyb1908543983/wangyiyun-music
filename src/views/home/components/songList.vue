<template>
    <div class="wrap">

        <el-row>

            <el-col :span="6">

                <h2 class="list">推荐歌单</h2>

            </el-col>

            <el-col :span="6" :offset="12">

                <router-link tag="h2" :to="{ name: 'center' }" class="list gedangc">歌单广场</router-link>

            </el-col>

        </el-row>

        <el-row :gutter="10">

            <el-col :span="8" class="inner" v-for="item in length" :key="item.id" @click.native="toSongSheet(item.id)">

                <img :src="item.coverImgUrl || item.picUrl" />

                <p class="desc">{{item.name}}</p>

                <div class="pos">

                    <i class="iconfont">&#xe60a;</i>

                    <span>{{item.playCount || item.playcount}}</span>

                </div>

            </el-col>

        </el-row>

        <h1>新歌新碟</h1>

        <el-row class="center-list">

            <el-col :span="6">

                <h2 class="list">

                    <span class="item" :class="{select: number == 1}" @click="changeNum1">新碟</span> &nbsp;|&nbsp;

                    <span class="item" :class="{select: number == 0}" @click="changeNum0">新歌</span>

                </h2>

            </el-col>

            <el-col :span="6" :offset="12">

                <p class="center gedangc" v-show="number == 1">更多新碟</p>

                <p class="center gedangc" v-show="number == 0">新歌推荐</p>

            </el-col>

        </el-row>

        <el-row :gutter="10" v-show="number == 1">

            <el-col :span="8" class="inner" v-for="item in blumsList" :key="item.id">

                <img :src="item.picUrl" />

                <p class="desc">{{item.name}}</p>

            </el-col>

        </el-row>

        <el-row :gutter="10" v-show="number == 0">

            <el-col :span="8" class="inner" v-for="item in newSongList" :key="item.id">

                <img :src="item.album.picUrl" />

                <p class="desc">{{item.album.name}}</p>

            </el-col>

        </el-row>

    </div>
</template>
<script>
export default {
  name: 'songList',
  data () {
    return {
      number: 1,
      songList: [],
      blumsList: [], // 新碟
      newSongList: [] // 新歌
    }
  },
  computed: {
    length () {
      const arr = this.songList
      arr.map((val, index) => {
        if (val.playCount > 9999) {
          val.playCount = Math.floor(val.playCount / 1000) + '万'
        }
        if (val.playcount > 9999) {
          val.playcount = Math.floor(val.playcount / 1000) + '万'
        }
      })
      return arr
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
    getList () { // 没有登录
      this.$axios.get('/api/top/playlist?limit=30').then(
        (result) => {
          console.log(result.data)
          if (result.data.code === 200) {
            for (let i = 0; i < 6; i++) {
              const index = result.data.playlists[Math.floor(Math.random() * 30)]
              if (this.songList.indexOf(index) < 0) {
                this.songList.push(index)
              } else {
                i--
              }
            }
          }
        })
    },
    getLoginList () { // 登录情况下
      this.axios.get('/api/recommend/resource').then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.songList = res.data.recommend
        }
      })
    },
    getBlumsList () {
      this.axios.get('/api/top/album?limit=3').then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.blumsList = res.data.albums
        }
      })
    },
    getnewSongList () {
      this.axios.get('/api/top/song').then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.newSongList = res.data.data.splice(0, 3)
        }
      })
    },
    changeNum0 () {
      this.number = 0
    },
    changeNum1 () {
      this.number = 1
    }
  },
  mounted () {
    if (localStorage.getItem('user')) {
      this.getLoginList()
    } else {
      this.getList()
    }
    this.getBlumsList()
    this.getnewSongList()
  }
}
</script>
<style lang='stylus' scoped>
h1
  margin-top .3rem
.wrap
  img
    margin-top .2rem
    height: 2.1rem;
    width: 100%;
    box-shadow: 0 15px 10px -9px #777 inset;
    border-radius: .3rem;
    margin-left .1rem
    margin-right .1rem
.gedangc
    width 1.2rem
    height 0.44rem
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 0.2rem;
    border-radius: 1rem;
    letter-spacing: 0.05rem;
    text-align: center;
    border: 1px solid #ccc;
    margin-left .4rem
    margin-top .3rem
    padding-left .1rem
.desc
    height: 0.6rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    overflow: hidden;
    font-size: 0.23rem;
    line-height: 0.3rem;
    letter-spacing: 1px;
.inner
  position relative
  .pos
    position absolute
    z-index: 1;
    top: -0.1rem;
    right: 0.11rem;
    font-size: 0.2rem;
    color: #fff;
.item
  color #333
  font-size .24rem
.select
  color #111
  font-size .32rem
</style>

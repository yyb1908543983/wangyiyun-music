<template>
    <div>

        <div class="list-inner">

            <el-row :gutter="20">

                <el-col :span="8" class="inner" v-for="item in list" :key="item.id" @click.native="toSongSheet(item.id)">

                    <img :src="item.coverImgUrl" />

                    <p class="desc">{{item.name}}</p>

                    <div class="pos">

                        <i class="iconfont">&#xe60a;</i>

                        <span>{{item.playCount > 9999 ? parseInt(item.playCount/10000)+'万' :

        item.playCount}}</span>

                    </div>

                </el-col>

            </el-row>

        </div>

    </div>
</template>
<script>
export default {
  name: 'tuijian',
  data () {
    return {
      list: []
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
    getList () {
      this.axios.get('/api/top/playList?limit=30').then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.list = res.data.playlists
        }
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/css/catgery.styl'
</style>

<template>
    <div class="wrapper">

        <div class="head">

            <i class='iconfont left' @click='goBack'>&#xe620;</i>

            <span class='title'>排行榜</span>

        </div>

        <div class="list">

            <div class="item">

                <h3>官方榜</h3>

                <el-row :gutter="20" class="row-1" v-for="(item, index) in topList.slice(0, 4)" :key="item.id">

                    <el-col :span="8">

                        <img :src="item.coverImgUrl" @click="bangDan(index)" alt="" />

                    </el-col>

                    <el-col :span="16">

                        <div class="line ell" @click="bangDan(index)" v-for="(val, index) in item.tracks" :key="index">

                            {{index + 1}}. {{val.first}}-{{val.second}}

                        </div>

                    </el-col>

                </el-row>

            </div>

            <div class="item">

                <h3>推荐榜</h3>

                <el-row :gutter="20" class="row-1">

                    <el-col :span="8" v-for="(item, index) in topList.slice(4, 10)" :key="item.id" class="inner-list">

                        <img :src="item.coverImgUrl" @click="bangDan(index + 23)" alt="" />

                        <p class="desc ell" @click="bangDan(index + 23)">{{item.name}}</p>

                    </el-col>

                </el-row>

            </div>

            <div class="item">

                <h3>更多榜单</h3>

                <el-row :gutter="20" class="row-1">

                    <el-col :span="8" v-for="(item, index) in topList.slice(10, 100)" :key="item.id" class="inner-list">

                        <img :src="item.coverImgUrl" @click="bangDan(index + 28)" alt="" />

                        <p class="desc ell" @click="bangDan(index + 28)">{{item.name}}</p>

                    </el-col>

                </el-row>

            </div>

        </div>

    </div>
</template>
<script>
export default {
  name: 'top',
  data () {
    return {
      topList: []
    }
  },
  methods: {
    getTopList () {
      this.axios.get('/api/toplist/detail').then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.topList = res.data.list
        }
      })
    },
    goBack () {
      this.$router.push('/')
    },
    bangDan (index) {
      // 路由携参跳转
      this.$router.push({ name: 'songSheet', params: { id: index } })
      this.$store.commit('idx', index) // 点击排行榜后，需要把当前点击的索引存在仓库中
    }
  },
  mounted () {
    this.getTopList()
  }
}
</script>
<style lang="stylus" scoped>
.head
  position: sticky;
  width: 100vw;
  top: .4rem;
  background-color: #fff;
  z-index: 99;
img
  border-radius: 0.13rem;
.inner-list
  margin-bottom .3rem
  .desc
    padding .2rem 0
.line
  line-height .4rem
.ell
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
.list
  margin-top .4rem
  h3
    padding .3rem 0
    font-size .32rem
  .row-1
    height 2rem
    margin  .2rem 0
    img
      width 100%
.wrapper
  position relative
  padding 0 .3rem
  .head
    padding .3rem 0
    font-size .4rem
    .left
      font-size .4rem
      margin-right .1rem
</style>

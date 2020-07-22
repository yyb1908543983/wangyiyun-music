<template>
    <div>

        <div class="histList" v-if="searches_list.length>0">

            <h4>历史记录</h4>

            <span @click="clearhis">删除</span>

            <div class="list">

                <div class="item" v-for="(item, index) in searches_list" :key="index" @click="historysearch(item)">{{item}}</div>

            </div>

        </div>

        <h2><b>热搜榜</b></h2>

        <div class="song-list">

            <div class="list-item" v-for="(item, index) in hotList" :key="index" @click="toSide(item.searchWord)">

                <div class="left-item">{{index + 1}}</div>

                <div class="right-item">

                    <p class="name ell">

                        <span><b>{{item.searchWord}}</b></span>

                        <img :src="item.iconUrl" class="name-img" v-if="item.iconUrl" alt="">

                        <span class="score">{{item.score}}</span>

                    </p>

                    <p class="name ar ell">

                        <span class="ell">{{item.content}}</span>

                    </p>

                </div>

            </div>

        </div>

    </div>
</template>
<script>
import { saveSearch } from '@/cache.js' // 引用本地存储js
import storage from 'good-storage' // 引入good-storage包
export default {
  name: 'hotList',
  data () {
    return {
      hotList: [],
      isFocus: true,
      searches_list: [] // 历史搜索记录列表
    }
  },
  // computed: {
  //   keysList () {
  //     let arr = []
  //     if (localStorage.keys) {
  //       arr = JSON.parse(localStorage.keys)
  //     }
  //     return arr
  //   }
  // },
  methods: {
    // remove () {
    //   this.loc = false
    //   localStorage.removeItem('keys')
    // },
    clearhis () {
      storage.remove('_search_')
      this.searches_list = []
      this.historyxs = false
    },
    toSide (val) {
      this.historyxs = true
      this.$router.push({ name: 'site', params: { val } })
      this.show = false
      this.inpVal = val
      this.isFocus = true
      if (this.inpVal !== '') {
        // 搜索框不为空
        saveSearch(this.inpVal) // 本地存储搜索的内容
        const params = {
          majorInfo: this.inpVal // 流程类型或者流程名称
        }
        this.$emit('handleSearch', params)
        this.isFocus = true
      }
      this.$emit('showSearchList')
      // 为避免重复先清空再添加
      this.searches_list = []
      const searches = storage.get('_search_')
      this.searches_list = searches || []
      if (this.searches_list.length > 0) {
        this.historyxs = true
      } else {
        this.historyxs = false
      }
      // if (this.$route.name === 'site') {
      //   bus.$emit('changeSearch', val)
      // } else {
      //   this.$router.push({
      //     name: 'site',
      //     params: { val }
      //   })
      // }
      //   if (!localStorage.keys) {
      //     const arr = []
      //     arr.unshift(val)
      //     localStorage.keys = JSON.stringify(arr)
      //   } else {
      //     let arr = JSON.parse(localStorage.keys)
      //     arr.unshift(val) // 处理数组
      //     if (arr.length > 5) {
      //       arr = arr.slice(0, 5)
      //     }
      //     localStorage.keys = JSON.stringify(arr)
      //   }
    },
    getHotList () {
      this.$axios.get('/api/search/hot/detail').then(res => {
        if (res.data.code === 200) {
          this.hotList = res.data.data
        }
      })
    }
  },
  mounted () {
    this.getHotList()
  }
}
</script>
<style lang="stylus" scoped>
// .histList
//   margin-bottom 1rem
//   .list
//     display flex
//     flex-wrap wrap
//     .item
//       padding 0 .1rem
//       float left
//       height .5rem
//       display flex
//       box-pack center
//       box-align center
//       align-items center
//       font-size .24rem
//       box-sizing border-box
//       padding 0.2rem
//       background-color #ddd
//       border-radius 0.3rem
//       margin-right .3rem
//       margin-top .2rem
.name-img
  margin-left: .4rem;
  height: 0.2rem;
  vertical-align: middle;
.ell
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
.ar
  font-size: 0.22rem;
  color: #999;
.song-list
  padding: 0 0.3rem;
  .list-item
    height: 1.2rem;
    width: 100%;
    display: flex;
    .left-item
      width: 1rem;
      line-height: 1.2rem;
      color: red;
    .right-item
      flex: 1;
      overflow: hidden;
      .name
        line-height: 2;
        .score
          float right;
          color #999;
</style>

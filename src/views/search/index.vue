<template>
    <div class="container">

        <div class="head">

            <i class="iconfont icon-zuojiantou" @click="goBack"></i>

            <input type="text" v-model="inpVal" :placeholder="deftSearch"
            @input="search(inpVal)" @focus="showList" @blur="hideList"
            ref="inputchange" @keyup.enter="onSearch(true)" @keyup.tab="onSearch(true)">

            <div class="pos" v-show="show">

                <h4 @click="toSite(inpVal)">搜索 "{{inpVal}}"</h4>

                <ul class="sear-list">

                    <li v-for="item in allMatch" :key="item.id" @click="toSite(inpVal)">

                        <i class="iconfont">&#xe62b;</i>

                        <p class="title">{{item.keyword}}</p>

                    </li>

                </ul>

            </div>

        </div>

        <div class="histList" v-if="searches_list.length>0">

            <h4>历史记录</h4>

            <span @click="clearhis">删除</span>

            <div class="list">

                <div class="item" v-for="(item, index) in searches_list" :key="index" @click="historysearch(item)">{{item}}</div>

            </div>

        </div>

        <router-view></router-view>

    </div>
</template>
<script>
import { saveSearch } from '@/cache.js' // 引用本地存储js
import storage from 'good-storage' // 引入good-storage包
import bus from '@/bus.js'
export default {
  name: 'search',
  data () {
    return {
      inpVal: '',
      allMatch: [],
      deftSearch: '',
      timer: null,
      show: false,
      isFocus: true,
      searches_list: [] // 历史搜索记录列表
    }
  },
  methods: {
    // 清空历史记录
    clearhis () {
      storage.remove('_search_')
      this.searches_list = []
      this.historyxs = false
    },
    onSearch (isFirst) {
      this.isFocus = true
      if (!this.inpVal) {
        // 搜索框不为空
        saveSearch(this.inpVal) // 本地存储搜索的内容
        const params = {
          majorInfo: this.inpVal // 流程类型或者流程名称
        }
        this.$emit('handleSearch', params)
        this.isFocus = true
      }
    },
    hideList () {
      this.show = true
    },
    showList () {
      if (this.inpVal) {
        this.show = true
      } else {
        this.show = false
      }
      this.isFocus = false
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
    },
    toSite (val) {
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
      // if (!localStorage.keys) {
      //   const arr = []
      //   arr.unshift(val)
      //   localStorage.keys = JSON.stringify(arr)
      // } else {
      //   let arr = JSON.parse(localStorage.keys)
      //   arr.unshift(val) // 处理数组
      //   if (arr.length > 5) {
      //     arr = arr.slice(0, 5)
      //   }
      //   localStorage.keys = JSON.stringify(arr)
      // }
      if (this.$route.name === 'site') {
        bus.$emit('changeSearch', val)
      } else {
        this.$router.push({
          name: 'site',
          params: { val }
        })
      }
    },
    search (val) {
      const that = this
      if (val) {
        this.show = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          that.axios.get(`/api/search/suggest?keywords=${val}&type=mobile`).then((res) => {
            if (res.data.code === 200) {
              this.allMatch = res.data.result.allMatch
            }
          })
        }, 300)
      } else {
        this.show = false
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    getDeft () {
      this.$axios.get('/api/search/default').then(res => {
        if (res.data.code === 200) {
          this.deftSearch = res.data.data.showKeyword
        }
      })
    }
  },
  mounted () {
    this.getDeft()
  }
}
</script>
<style lang="stylus" scoped>
.histList
  margin-bottom 1rem
  .list
    display flex
    flex-wrap wrap
    .item
      padding 0 .1rem
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
.sear-list
  width 100%
  li
    line-height .8rem
    display flex
    border-bottom 1px soild #ccc
    .iconfont
      font-size .4rem
      width 1rem
      margin-left .3rem
      color #555
    .title
      flex 1
      color red
      margin-left -.9rem
      margin-top .1rem
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
.container
  padding: 0 0.3rem;

.head
  height: 1rem;
  position: relative;
  padding-bottom 1.3rem
  .iconfont
    font-size: 0.36rem;
    margin-right: 0.6rem;
    line-height: 1rem;
  input
    width: 80%;
    border: none;
    border-bottom: 1.5px solid #aaa;
    outline: 0 none;
    line-height: .8rem;
  .pos
    position: absolute;
    width: 80%;
    background-color: pink;
    left: 12%;
    h4
      line-height: 0.6rem;
      color blue
</style>

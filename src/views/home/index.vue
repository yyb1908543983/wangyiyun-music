<template>
    <div>

        <el-row class='wrap'>

            <el-col :span='4'>

                <i class='iconfont' @click="showDrawer">&#xeaf1;</i>

            </el-col>

            <el-col :span='16'>音乐</el-col>

            <el-col :span='4'>

                <router-link tag="i" :to="{ name: 'search' }" class="iconfont">&#xe819;</router-link>

            </el-col>

        </el-row>

        <banner></banner>

        <nav-Menu></nav-Menu>

        <song-list></song-list>

        <el-drawer :visible.sync='drawer' :with-header='false' :direction='direction' :size="'70%'">

            <div class="innerbox">

                <div class="login" v-if="info">

                    <img :src="info.picUrl" alt="">

                    <p class="nickname">{{info.nickname}}</p>

                </div>

                <div class="noLogin" v-else>

                    <p @click="login">请先登录</p>

                </div>

                <div class="out" @click="out">退出登录</div>

            </div>

        </el-drawer>

    </div>
</template>
<script>
import banner from './components/banner'
import navMenu from './components/navMenu'
import songList from './components/songList'
export default {
  name: 'index',
  data () {
    return {
      drawer: false,
      direction: 'ltr'
    }
  },
  components: {
    banner,
    navMenu,
    songList
  },
  computed: {
    info () {
      let info = null
      if (localStorage.user) {
        info = JSON.parse(localStorage.user)
      }
      return info
    }
  },
  methods: {
    out () {
      if (localStorage.user) {
        localStorage.removeItem('user')
        this.$router.go(0)
      }
    },
    login () {
      this.$router.push('/phone')
    },
    showDrawer () {
      this.drawer = true
    }
  }
}
</script>
<style lang="stylus" scoped>
.login
  height 5rem
  background-color red
  text-align center
  margin 0 auto
  img
    margin-top 1rem
    margin-bottom 1rem
    width 2rem
    height 2rem
.noLogin
  background-color red
  height 8rem
  p
    line-height 8rem
    width 100%
    border-radius 25%
    text-align center
    color #ffffff
.out
  position absolute
  color red
  right 0.2rem
  bottom 2rem
.container
  padding 0 .3rem
.wrap
  line-height 1rem
  text-align center
</style>

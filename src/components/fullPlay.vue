<template>
    <div v-show="show">

        <div class="mask"></div>

        <div class="full" v-if="isShowFullPlayer">

            <div class="head">

                <i class="iconfont" @click="fadeBack">&#xe669;</i>

                <div class="title">

                    <p>

                        <span>{{ player.list[player.index].name }}</span>-

                        <span v-for="(val, index) in player.list[player.index].ar" :key="index" class="geshou">{{val.name}}/</span>

                    </p>

                </div>

            </div>

            <div class="inner-box">

                <div class="great" v-bind:class="{ 'en': bofang, 'rotate':pauser}" @click="rotate"></div>

                <div class="circle-bg">

                    <div class="img-box">

                        <img class="an" :style="obj" :src="player.list[player.index].al.picUrl" />

                    </div>

                </div>

            </div>

            <div class="lrc" ref="lrcwrapper">

                <div>

                    <div class="line">

                        <p :style="{color: currentLineNum === index ? 'red': ''}" ref='lines' v-for="(item, index) in currentLyric.lines" :key="index">{{item.txt}}</p>

                    </div>

                </div>

            </div>

            <div class="icon">

                <i class="iconfont icon-zan1"></i>

                <i class="iconfont icon-xiazai"></i>

                <i class="iconfont icon-caidan"></i>

            </div>

            <div class='line-box'>

                <span class="start">{{curTime}}</span>

                <div class="bar-bg">

                    <div class="bar-line" :style="{width: audioInit.progress}"></div>

                    <div class="bar-point" :style="{left: audioInit.progress}"></div>

                </div>

                <span class="end">{{endTime}}</span>

            </div>

            <div class="cont-icon">

                <div class="icons">

                    <i class="iconfont" v-bind:class="{ 'icon-weimingmingwenjianjia_xunhuan': quanbuxunhuan,

    'icon-xunhuan': xunhuan, 'icon-xunhuan1': xunhuan1 }" @click="xun"></i>

                </div>

                <div class="icons">

                    <i class="iconfont icon-zuojiantou" @click="preSong"></i>

                </div>

                <div class="icons">

                    <i class="iconfont" v-bind:class="{ 'icon-pause': pauser, 'icon-bofang': bofang }" @click="pause"></i>

                </div>

                <div class="icons">

                    <i class="iconfont icon-youjiantou" @click="nextSong"></i>

                </div>

                <div class="icons">

                    <i class="iconfont icon-gedan" @click='showList'></i>

                </div>

            </div>

            <el-drawer :visible.sync='drawer' :direction='direction' :modal='false' :modal-append-to-body='false' :show-close='false' :withHeader='false' :size="'50%'">

                <div class="d-wrap">

                    <header>

                        歌曲列表

                    </header>

                    <div class="inner" ref="inner">

                        <ul class="drawer-list">

                            <li class="list-item" v-for="(item, index) in player.list" :key="index" @click="changeSong(index, item.id)">

                                <span class="name">{{item.name}}</span> -

                                <span class="art" v-for="val in item.ar" :key="val.id">{{val.name}}</span>

                            </li>

                        </ul>

                    </div>

                </div>

            </el-drawer>

        </div>

    </div>
</template>
<script>
import Lyric from 'lyric-parser'
import BScroll from 'better-scroll'
import bus from '@/bus.js'
import { mapState } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'fullPlay',
  data () {
    return {
      show: false,
      timer: null,
      drawer: false,
      direction: 'btt',
      obj: {
        animationPlayState: 'running'
      },
      quanbuxunhuan: true,
      xunhuan: false,
      xunhuan1: false,
      bofang: false,
      pauser: true,
      isPause: true,
      progress: '0%',
      lrc: null, // 歌词数据
      currentLyric: {
        lines: null
      }, // 设置一个歌词维护属性
      currentLineNum: 0, // 当前播放第几行
      playingLyric: null // 正在播放行的歌词
      // t: 0,
      // startS: '00',
      // startM: '00',
      // timer: null // 清定时器
    }
  },
  methods: {
    preSong () {
      clearTimeout(this.timer)
      this.isPause = true
      const that = this
      this.timer = setTimeout(function () {
        let index = that.$store.state.player.index - 1
        if (index < 0) {
          index = that.$store.state.player.list.length - 1
        }
        const info = that.$store.state.player.list[index]
        const id = info.id
        that.changeSong(index, id)
        that.timer = null
      }, 200)
      that.pause()
    },
    nextSong () {
      // 函数防抖，函数节流
      clearTimeout(this.timer)
      this.isPause = true
      const that = this
      this.timer = setTimeout(function () {
        let index = that.$store.state.player.index + 1
        if (index > that.$store.state.player.list.length - 1) {
          index = 0
        }
        const info = that.$store.state.player.list[index]
        const id = info.id
        that.changeSong(index, id)
        that.timer = null
      }, 200)
      that.pause()
    },
    changeSong (index, id) {
      const that = this
      this.$store.dispatch('getUrl', { that, id })
      this.$store.commit('fullPlayer', { index })
      this.lrc = null
      this.currentLyric.stop()
      this.currentLineNum = 0
      this.playingLyric = null
      this.getLyc()
    },
    xun () {
      this.quanbuxunhuan = !this.quanbuxunhuan
      this.xunhuan1 = !this.xunhuan1
      this.xunhuan = !this.xunhuan
      if (this.xunhuan === false && this.xunhuan1 === false) {
        this.quanbuxunhuan = false
        this.xunhuan1 = true
      }
      if (this.quanbuxunhuan === false && this.xunhuan1 === true) {
        this.xunhuan1 = false
        this.xunhuan = true
      } else {
        this.xunhuan = false && this.xunhuan1 === false
        this.quanbuxunhuan = true
      }
    },
    rotate () {
      this.isPause = !this.isPause
      this.obj.animationPlayState === 'running'
        ? (this.obj.animationPlayState = 'paused')
        : (this.obj.animationPlayState = 'running')
      bus.$emit('pause', this.isPause)
      this.bofang === true ? (this.bofang = false) : (this.bofang = true)
      this.pauser === false ? (this.pauser = true) : (this.pauser = false)
    },
    showList () {
      this.drawer = true
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.inner, {
          click: true
        })
      })
    },
    pause () {
      this.isPause = !this.isPause
      this.obj.animationPlayState === 'running'
        ? (this.obj.animationPlayState = 'paused')
        : (this.obj.animationPlayState = 'running')
      bus.$emit('pause', this.isPause)
      this.bofang === true ? (this.bofang = false) : (this.bofang = true)
      this.pauser === false ? (this.pauser = true) : (this.pauser = false)
    },
    fadeBack () {
      // 点击左箭头后，让全屏播放器消失，让mini播放器出现
      this.show = false
      this.$store.commit('changeIsShow')
      const img = this.player.list[this.player.index].al.picUrl
      const name = this.player.list[this.player.index].name
      const lyc = this.playingLyric
      bus.$emit('minData', { img, name, lyc })
    },
    getLyc () {
      const that = this
      this.axios
        .get('/api/lyric?id=' + this.player.list[this.player.index].id)
        .then(res => {
          if (res.data.code === 200) {
            this.lrc = res.data.lrc.lyric
            this.currentLyric = new Lyric(that.lrc, that.handleLyric) // this.handleLyric回调函数
            this.scroll = new BScroll(this.$refs.lrcwrapper, {})
            this.currentLyric.play() // 设置玩歌词信息后，播放歌词
          }
        })
      console.log(this.player.list[this.player.index])
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > 1) {
        const lineEl = this.$refs.lines[lineNum - 1]
        this.scroll.scrollToElement(lineEl, 300) // 滚动到元素
      } else {
        this.scroll.scrollTo(0, 0, 1000) // 滚动到顶部
      }
      this.playingLyric = txt
      this.$store.commit('palyLrc', txt)
    }
    // startTime () {
    //   this.t++
    //   this.startS = parseInt(this.t % 60)
    //   if (this.startS < 10) {
    //     this.startS = '0' + parseInt(this.startS % 60)
    //   }
    //   this.startM = '0' + parseInt(this.t / 60)
    //   const p = this.t / parseInt(this.player.list[this.player.index].dt / 1000)
    //   this.progress = p * 100 + '%'
    //   if (this.t === parseInt(this.player.list[this.player.index].dt / 1000)) {
    //     clearInterval(this.timer)
    //   }
    //   // console.log(this.t)
    // }
  },
  mounted () {
    if (this.$store.state.isShowFullPlayer) {
      this.getLyc()
    }
    // this.currentLyric = new Lyric(this.lrc, this.handleLyric)
    // this.timer = setInterval(this.startTime, 1000)
    bus.$on('end', () => {
      this.nextSong()
    })
    bus.$on('show', () => {
      this.show = true
    })
  },
  watch: {
    drawer () {},
    isShowFullPlayer (newData, oldData) {
      if (newData) {
        this.show = true
        if (this.lrc === null) {
          this.getLyc() // Bug
        }
      }
    }
  },
  updated () {},
  computed: {
    ...mapState({
      isShowFullPlayer: 'isShowFullPlayer',
      player: 'player',
      audioInit: 'audioInit'
    }),
    endTime () {
      const time = parseInt(this.audioInit.duration) // 221s
      let m = parseInt(time / 60) // 得到min
      if (m < 10) {
        m = '0' + m
      }
      let s = time % 60 // 得到秒数
      if (s < 10) {
        s = '0' + s
      }
      return `${m}:${s}` // 03:41
    },
    curTime () {
      const time = parseInt(this.audioInit.currentTime) // 221s
      let m = parseInt(time / 60) // 得到min
      if (m < 10) {
        m = '0' + m
      }
      let s = time % 60 // 得到秒数
      if (s < 10) {
        s = '0' + s
      }
      return `${m}:${s}`
    }
  }
}
</script>
<style lang='stylus' scoped>
.d-wrap {
  padding: 0 0.3rem;

  header {
    line-height: 0.6rem;
  }

  .inner {
    position: absolute;
    top: 0.7rem;
    bottom: 0;
    overflow: hidden;
  }

  .list-item {
    line-height: 0.5rem;
  }
}

.lrc {
  height: 1.2rem;
  position: absolute;
  left: 5%;
  right: 5%;
  overflow: hidden;
  text-align: center;
  margin-top: -0.5rem;

  p {
    line-height: 0.5rem;
    color: #235652;
  }
}

@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}

.an {
  -webkit-transform: rotate(360deg);
  animation: rotation 24s linear infinite;
  -moz-animation: rotation 24s linear infinite;
  -webkit-animation: rotation 24s linear infinite;
  -o-animation: rotation 24s linear infinite;
}

.cont-icon {
  display: flex;
  margin-top: 0.6rem;

  .icons {
    flex: 1;
    text-align: center;

    .iconfont {
      font-size: 0.5rem;
      color: #bdc3c7;
    }
  }
}

.title {
  line-height: 1rem;
}

.geshou {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.2rem;
  white-space: nowrap;
}

.line-box {
  margin: 0.2rem 0;
  display: flex;
  justify-content: space-between;

  .bar-bg {
    flex: 1;
    height: 2px;
    margin-top: 0.1rem;
    position: relative;
    background-color: #95a5a6;

    .bar-line {
      width: 20%;
      height: 2px;
      background-color: #ecf0f1;
    }

    .bar-point {
      width: 0.2rem;
      height: 0.2rem;
      left: 20%;
      border-radius: 50%;
      margin-top: -2.7px;
      background-color: #ecf0f1;
    }

    .bar-line, .bar-point {
      position: absolute;
    }
  }

  span {
    text-align: center;
    width: 1rem;
    color: #ffffff;
  }
}

.inner-box {
  height: 7.6rem;
  margin: 0.6rem 0;
  position: relative;
  overflow: hidden;
}

.en {
  -webkit-transform: rotate(-16deg);
  transform: translate(-50%) rotate(-16deg);
}

.rotate {
  transform: translate(-25%) rotate(-2deg);
}

.great {
  position: absolute;
  z-index: 1;
  left: 50%;
  transform-origin: top left;
  transition: transform 0.2s, -webkit-transform 0.2s;
  width: 2rem;
  height: 0;
  padding-bottom: 2.5rem;
  background-image: url('https://icon.qiantucdn.com/20200509/cad9247361c2677cb1287c6fd8f866c92'); // icon.qiantucdn.com/20200509/cad9247361c2677cb1287c6fd8f866c92)
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.circle-bg {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  width: 80vw;
  margin: 1.4rem auto;
  height: 0;
  padding-bottom: 80vw;
  background-image: url('https://icon.qiantucdn.com/20200509/55828113a162610d404cf3a52c1344492'); // icon.qiantucdn.com/20200509/55828113a162610d404cf3a52c1344492)
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: rotating-data-v-a2f5b698 24s linear infinite;
  transform-origin: center;
}

.img-box {
  border: 1px solid #000;
  width: 3.7rem;
  height: 0;
  padding-bottom: 3.6rem;
  border-radius: 50%;
  margin-top: 1.18rem;
  overflow: hidden;

  img {
    width: 3.7rem;
    height: 3.7rem;
  }
}

.icon {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1.7rem;
}

.icon i {
  font-size: 0.5rem;
  color: #bdc3c7;
  margin-right: 0.1rem;
  margin-left: 0.2rem;
}

.icon {
  p {
    margin-top: 0.1rem;
    margin-left: 0.1rem;
  }

  span {
    font-size: 0.24rem;
    color: #bdc3c7;
    line-height: 1.5;
  }
}

.head {
  display: flex;
  line-height: 1rem;
  color: #ffffff;
}

.full {
  padding: 0 0.3rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #7f8c8d;
}

.mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}
</style>

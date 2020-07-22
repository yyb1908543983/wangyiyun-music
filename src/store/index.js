/* eslint-disable no-undef */
/* eslint-disable space-before-blocks */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    idx: 12, // 歌单页面根据idx的值获取对应的排行榜的歌单数据
    player: {
      list: []
    }, // 存储全部歌曲与索引
    isShowFullPlayer: false,
    isShowMiniPlayer: false,
    audioInit: {
      isPlay: true,
      ended: null,
      duration: 0,
      currentTime: 0,
      url: '',
      progress: '0%'
    },
    playingLyric: null
  },
  mutations: {
    palyLrc (state, t) {
      state.playingLyric = t
    },
    sendDt (state, d){
      state.audioInit.duration = d
    }, // 总时间
    showFull (state) {
      state.isShowFullPlayer = true
      state.isShowMiniPlayer = false
    },
    sendCurT (state, c){
      state.audioInit.currentTime = c
      state.audioInit.progress = (c /
        state.audioInit.duration * 100).toFixed(2) + '%'
    }, // 播放时间
    idx (state, index) {
      state.idx = index
    },
    fullPlayer (state, obj) {
      state.player.index = obj.index
      if (obj.allList) {
        state.player.list = obj.allList
      }
      state.isShowFullPlayer = true
    },
    changeIsShow (state) {
      // state.isShowFullPlayer = false
      state.isShowMiniPlayer = true
    },
    sendUrl (state, url){
      state.audioInit.url = url
    }
    // audioInfo (state, info){
    //   state.audioInit.time = info.duration
    //   state.audioInit.time = info.currentTime
    //   state.audioInit.time = info.ended
    // }
  },
  actions: {
    getUrl (ctx, obj) {
      obj.that.axios.get('/api/song/url?id=' + obj.id).then((res) => {
        console.log(res.data)
        if (res.data.code === 200){
          ctx.commit('sendUrl', res.data.data[0].url)
        }
      })
    }
  },
  modules: {
  }
})

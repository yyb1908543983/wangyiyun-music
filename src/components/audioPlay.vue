<template>
    <div>

        <audio controls :src="audioInit.url" ref="abc" autoplay>

      </audio>

    </div>
</template>
<script>
import bus from '@/bus.js'
import { mapState } from 'vuex'
export default {
  name: 'audioPlay',
  computed: {
    ...mapState({
      audioInit: 'audioInit'
    })
  },
  methods: {
    addEveA () {
      const that = this
      this.$refs.abc.addEventListener('canplay', function () {
        that.$store.commit('sendDt', this.duration) // 在仓库中存总时长
      })
      this.$refs.abc.addEventListener('timeupdate', function () {
        that.$store.commit('sendCurT', this.currentTime) // 在仓库中存播放时间
      })
      this.$refs.abc.addEventListener('ended', () => {
        console.log('当前播放完毕')
        bus.$emit('end')
      })
    }
  },
  mounted () {
    this.addEveA()
    bus.$on('pause', (p) => {
      if (p) {
        this.$refs.abc.play()
      } else {
        this.$refs.abc.pause()
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
audio
  visibility hidden
</style>

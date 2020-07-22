<template>
    <div id="app">
            <router-view></router-view>
        <full-play v-show="isShowFull"></full-play>
        <mini-play v-show="isShowMini"></mini-play>
        <audio-play></audio-play>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import fullPlay from '@/components/fullPlay'
import miniPlay from '@/components/miniPlay'
import audioPlay from '@/components/audioPlay'
export default {
  name: 'app',
  components: {
    fullPlay,
    miniPlay,
    audioPlay
  },
  computed: {
    ...mapState({
      isShowFull: 'isShowFullPlayer',
      isShowMini: 'isShowMiniPlayer'
    })
  }
}
</script>

<style lang="stylus">
</style>

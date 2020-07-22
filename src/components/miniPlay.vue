<template>
    <div>

        <div class="box" @click="showFull">

            <ul class="list">

                <li>

                    <img v-if='isShowMiniPlayer' :src="this.$store.state.player

        .list[this.$store.state.player.index].al.picUrl" alt="">

                </li>

                <li class="list-first">

                    <p class="name" v-if='isShowMiniPlayer'>{{this.$store.state.player .list[this.$store.state.player.index].name}}

                    </p>

                    <p class="lyc">{{this.$store.state.playingLyric}}</p>

                </li>

                <li class="icon">

                    <i class="iconfont icon-gedan"></i>

                </li>

            </ul>

        </div>

    </div>
</template>
<script>
import bus from '@/bus.js'
import { mapState } from 'vuex'
export default {
  name: 'miniPlay',
  methods: {
    showFull () {
      this.$store.commit('showFull')
      bus.$emit('show')
    }
  },
  data () {
    return {
      img: '',
      name: '',
      lyc: ''
    }
  },
  computed: {
    ...mapState({
      isShowMiniPlayer: 'isShowMiniPlayer'
    })
  },
  mounted () {
    bus.$on('minData', (obj) => {
      this.img = obj.img
      this.name = obj.name
      this.lyc = obj.lyc
    })
  }
}
</script>
<style lang='stylus' scoped>
.box {
  position: fixed;
  padding-bottom .2rem
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1rem;
  background-color #fff
}
.list
  display flex
  justify-content space-between
  .name
    margin-top .2rem
    font-size .28rem
  .lyc
    color #888
    font-size .2rem
    margin-top .2rem
  .list-first
    width 1rem
    flex 1
    float left
    margin-left .3rem
    overflow hidden
  li
    &:last-child
      width 1rem
    img
      float left
      width .8rem
      border-radius 50%
      height .8rem
      margin-top .2rem
      margin-left .2rem
    .iconfont
      font-size .7rem
      color #666
  .icon
    margin-top .2rem
</style>

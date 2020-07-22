<template>
    <div class='phone'>

        <h3>输入手机号登录</h3>

        <div class="inp">

            <span>+186</span>

            <input type="text" v-model="inpVal" @keyup.enter="checkNum(inpVal)" @keyup.tab="checkNum(inpVal)">

        </div>

        <div class="next" @click="checkNum(inpVal)">下一步</div>

    </div>
</template>
<script>
export default {
  name: 'phone',
  data () {
    return {
      inpVal: null
    }
  },
  methods: {
    checkNum (inpVal) {
      const exp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (exp.test(inpVal)) {
        this.axios.get(`/api/cellphone/existence/check?phone=${inpVal}`).then(
          (res) => {
            if (res.data.code === 200) {
              if (res.data.nickname) {
                this.$router.push({
                  name: 'pwd',
                  params: { phone: inpVal }
                })
              } else {
                this.axios.get(`/api/captche/set?phone=${inpVal}`)
                  .then((res) => {
                    if (res.data.code === 200) {
                      this.$router.push({
                        path: '/vd',
                        query: { phone: inpVal }
                      })
                    }
                  })
              }
            }
          })
      } else {
        alert('请输入正确的手机号')
      }
    }
  }
}
</script>
<style lang="stylus" scope>
</style>

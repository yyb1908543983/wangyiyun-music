<template>
    <div>

        <h3>输入四位验证码</h3>

        <div class="inp">

            <input type="text" v-model="inpVal" @keyup.enter="checkNum(inpVal)" @keyup.tab="checkNum(inpVal)">

        </div>

        <div class="next" @click="checkNum(inpVal)">下一步</div>

    </div>
</template>
<script>
export default {
  name: 'vd',
  data () {
    return {
      inpVal: null
    }
  },
  methods: {
    checkNum (val) {
      this.axios.get(`/api/captche/verify?phone=
      ${this.$route.query.phone}&captche=${val}`)
        .then((res) => {
          if (res.data.code === 200) {
            alert('注册成功')
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

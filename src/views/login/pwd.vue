<template>
  <div>
  <h3>输入密码</h3>
  <div class="inp">
  <input type="password" v-model="inpVal" @keyup.enter="checkNum(inpVal)"
  @keyup.tab="checkNum(inpVal)"
  >
  </div>
  <div class="text" @click="checkNum(inpVal)">登录</div>
  </div>
</template>
<script>
export default {
  name: 'pwd',
  data () {
    return {
      inpVal: null
    }
  },
  methods: {
    checkNum (val) {
      this.axios.get(`/api/login/cellphone?phone=${this.$route.params.phone
      }&password=${val}`).then(
        (res) => {
          console.log(res.data)
          if (res.data.code === 200) {
            const info = {
              picUrl: res.data.profile.avatarUrl,
              nickname: res.data.profile.nickname,
              token: res.data.token
            }
            localStorage.user = JSON.stringify(info)
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

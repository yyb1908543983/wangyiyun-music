import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import rem from '@/assets/js/rem'
import '@/assets/css/reset.css'
import '@/assets/font/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
Vue.use(rem)
Vue.use(ElementUI)
Vue.use(vueSwiper)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

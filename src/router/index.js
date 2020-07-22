import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/home/index.vue'
import center from '@/views/center/index.vue'
import top from '@/views/top/index.vue'
import date from '@/views/date/index'
import phone from '@/views/login/phone'
import vd from '@/views/login/vd'
import pwd from '@/views/login/pwd'
import search from '@/views/search/index.vue'
import tuijian from '@/views/center/components/tuijian'
import jingpin from '@/views/center/components/jingpin'
import minyao from '@/views/center/components/minyao'
import qingyinyue from '@/views/center/components/qingyinyue'
import oumei from '@/views/center/components/oumei'
import hanyu from '@/views/center/components/hanyu'
import dianzi from '@/views/center/components/dianzi'
import hotList from '@/views/search/components/hotList'
import searData from '@/views/search/components/searData'
import songSheet from '@/views/songSheet/index.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: index
}, {
  path: '/date',
  name: 'date',
  component: date
}, {
  path: '/phone',
  name: 'phone',
  component: phone
}, {
  path: '/vd',
  name: 'vd',
  component: vd,
  beforeEnter: (to, from, next) => {
    // ...
    if (from.name === 'phone' && to.name === 'vd') {
      next()
    } else {
      alert('臣妾实在做不到！！！！！！！')
      next('/phone')
    }
  }
}, {
  path: '/pwd',
  name: 'pwd',
  component: pwd,
  beforeEnter: (to, from, next) => {
    // ...
    if (from.name === 'phone' && to.name === 'pwd') {
      next()
    } else {
      alert('臣妾实在做不到！！！！！！！')
      next('/phone')
    }
  }
}, {
  path: '/center',
  name: 'center',
  component: center,
  redirect: {
    name: 'tuijian'
  }, // 路由重定向
  children: [{
    path: 'tuijian',
    name: 'tuijian',
    component: tuijian
  }, {
    path: 'dianzi',
    name: 'dianzi',
    component: dianzi
  }, {
    path: 'jingpin',
    name: 'jingpin',
    component: jingpin
  }, {
    path: 'minyao',
    name: 'minyao',
    component: minyao
  }, {
    path: 'hanyu',
    name: 'hanyu',
    component: hanyu
  }, {
    path: 'qingyinyue',
    name: 'qingyinyue',
    component: qingyinyue
  }, {
    path: 'oumei',
    name: 'oumei',
    component: oumei
  }]
}, {
  path: '/top',
  name: 'top',
  component: top
}, {
  path: '/search',
  name: 'search',
  component: search,
  redirect: { name: 'hotList' },
  children: [{
    path: '',
    name: 'hotList',
    component: hotList
  }, {
    path: 'site',
    name: 'site',
    component: searData,
    beforeEnter: (to, from, next) => {
      // ...
      if (from.name) {
        next()
      } else {
        next(router.go(-1))
      }
    }
  }]
}, {
  path: '/songSheet',
  name: 'songSheet',
  component: songSheet,
  beforeEnter: (to, from, next) => {
    // ...
    if (from.name) {
      next()
    } else {
      next(router.go(-1))
    }
  }
}]

const router = new VueRouter({
  routes
})

export default router

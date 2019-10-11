import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
      // component: () => import('@/views/login/index.vue')
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index.vue'
import Tabbar from '@/views/tabbar/index.vue'
import Home from '@/views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'tabbar',
      path: '/tabbar',
      component: Tabbar,
      children: [
        {
          path: 'home',
          component: Home
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
      // component: () => import('@/views/login/index.vue')
    }
  ]
})

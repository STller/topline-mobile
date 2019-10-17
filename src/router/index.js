import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index.vue'
import Tabbar from '@/views/tabbar/index.vue'
import Home from '@/views/home/index.vue'
import Search from '@/views/search/index.vue'
import SearchResult from '@/views/search-result/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Tabbar,
      children: [
        {
          name: 'home',
          path: '', // 默认子路由
          component: Home
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
      // component: () => import('@/views/login/index.vue')
    },
    {
      name: 'search',
      path: '/search',
      component: Search
    },
    {
      name: 'search-result',
      path: '/search/:q',
      component: SearchResult
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index.vue'
import Tabbar from '@/views/tabbar/index.vue'
import Home from '@/views/home/index.vue'
import Search from '@/views/search/index.vue'
import SearchResult from '@/views/search-result/index.vue'
import Article from '@/views/article/index.vue'
import My from '@/views/my/index.vue'
import User from '@/views/user/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Tabbar,
      children: [
        /**
         * 主页
         */
        {
          name: 'home',
          path: '', // 默认子路由
          component: Home
        },
        /**
         * 我的页面
         */
        {
          name: 'my',
          path: 'my',
          component: My
        }
      ]
    },
    /**
     * 登录页
     */
    {
      name: 'login',
      path: '/login',
      component: Login
      // component: () => import('@/views/login/index.vue')
    },
    /**
     * 搜索页
     */
    {
      name: 'search',
      path: '/search',
      component: Search
    },
    /**
     * 搜索结果页
     */
    {
      name: 'search-result',
      path: '/search/:q',
      component: SearchResult
    },
    /**
     * 文章详情页
     */
    {
      name: 'article',
      path: '/article/:articleId',
      component: Article
    },
    /**
     * 用户个人信息设置页
     */
    {
      name: 'user',
      path: '/user',
      component: User
    }
  ]
})

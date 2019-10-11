import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// 按需导入需要的组件
import { Button, NavBar } from 'vant'
// 导入样式后就全局应用了
import './styles/index.css'
Vue.use(Button).use(NavBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

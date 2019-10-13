import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// 按需导入需要的组件
import {
  Button,
  NavBar,
  Field,
  CellGroup,
  Toast
} from 'vant'
// 导入样式后就全局应用了
import './styles/index.css'
/**
 * 导入validate插件
 */
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
/**
 * use按需导入的组件
 */
Vue.use(Button).use(NavBar).use(Field).use(CellGroup).use(Toast)
/**
 *
 */
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

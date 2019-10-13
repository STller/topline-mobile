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
  Toast,
  Tabbar,
  TabbarItem
} from 'vant'
// 导入样式后就全局应用了
import './styles/index.css'
/**
 * 导入validate插件
 */
import {
  ValidationProvider,
  ValidationObserver,
  extend
} from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 加载验证插件的语言包
import * as rules from 'vee-validate/dist/rules'
extend('phone', {
  validate: function (value) {
    return /^1\d{10}$/.test(value)
  },
  message: '请输入有效的手机号'
})
// 配置使用中文语言
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
}
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
/**
 * use按需导入的组件
 */
Vue
  .use(Button)
  .use(NavBar)
  .use(Field)
  .use(CellGroup)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
/**
 *
 */
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

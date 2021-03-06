import Vue from 'vue'
import Vuex from 'vuex'
import { getItem } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getItem('token'),
    user: []
  },
  mutations: {
    /**
     * 存储token
     * @param {默认参数} state
     * @param {自定义参数} user
     */
    setToken (state, token) {
      state.token = token
    },
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {

  }
})

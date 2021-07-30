import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: localStorage.getItem('user_id'),
    admin: localStorage.getItem('admin')
  },
  mutations: {
    updateLocalStorage (state) {
      state.userId = localStorage.getItem('user_id');
      state.admin = localStorage.getItem('admin');
    }
  },
  actions: {
  },
  modules: {
  }
})

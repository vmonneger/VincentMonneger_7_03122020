import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    userId: null,
    admin: null
  },
  mutations: {
    updateState (state) {
      state.token = null;
      state.userId = null;
      state.admin = null;
    }
  },
  actions: {
  },
  modules: {
  }
})

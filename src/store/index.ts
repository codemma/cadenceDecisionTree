import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    routeId: ''
  },
  mutations: {
    change(state, route) {
      state.routeId = route
    }
  },
  getters: {
    routeId: state => state.routeId
  }
})

export default store

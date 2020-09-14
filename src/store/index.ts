import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    childRouteId: '',
    newExecutionId: '',
    childBtn: false,
  },
  mutations: {
    childRoute(state, route) {
      state.childRouteId = route;
      state.childBtn = !state.childBtn
    },
    newExecutionRoute(state, route) {
      state.newExecutionId = route,
        state.childBtn = !state.childBtn
    },
    toggleChildBtn(state) {
      state.childBtn = false
    }
  },
  getters: {
    childRouteId: state => state.childRouteId,
    newExecutionId: state => state.newExecutionId,
    childBtn: state => state.childBtn
  }
})

export default store

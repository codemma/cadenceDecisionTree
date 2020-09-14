import Vue from 'vue'
import Vuex from 'vuex'

const getDefaultState = () => {
  return {
    childRouteId: '',
    newExecutionId: '',
    parentRouteId: '',
    childBtn: false,
  }
}
// initial state
const state = getDefaultState()

Vue.use(Vuex)

const store = new Vuex.Store({
  state: state,
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
    },
    parentRoute(state, route) {
      console.log(route)
      state.parentRouteId = route
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  getters: {
    childRouteId: state => state.childRouteId,
    newExecutionId: state => state.newExecutionId,
    childBtn: state => state.childBtn,
    parentRoute: state => state.parentRouteId
  }
})

export default store

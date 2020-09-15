import Vue from 'vue'
import Vuex from 'vuex'

const getDefaultState = () => {
  return {
    childRouteId: '',
    newExecutionId: '',
    parentRouteId: '',
    childBtn: false,
    btnText: ''
  }
}
// initial state
const state = getDefaultState()

Vue.use(Vuex)

const store = new Vuex.Store({
  state: state,
  mutations: {
    childRoute(state, param) {
      state.childRouteId = param.routeId;
      state.childBtn = !state.childBtn;
      state.btnText = param.btnText;
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
    btnText: state => state.btnText,
    parentRoute: state => state.parentRouteId
  }
})

export default store

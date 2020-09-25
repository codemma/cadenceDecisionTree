import Vue from 'vue'
import Vuex from 'vuex'

const getDefaultState = () => {
  return {
    childRouteId: '',
    newExecutionId: '',
    parentRouteId: '',
    childBtn: false,
    btnText: '',
    selectedNodeInfo: {
      id: 1,
      input: 'test',
      initiator: 'test',
      newExecutionRunId: 'test',
      workflowType: 'test',
      taskList: 'test',
    }
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
      state.childBtn = true;
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
    parentRoute: state => state.parentRouteId,
    selectedNodeInfo: state => state.selectedNodeInfo,
  }
})

export default store

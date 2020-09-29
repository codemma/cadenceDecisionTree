import Vue from 'vue'
import Vuex from 'vuex'

const getDefaultState = () => {
  return {
    childRouteId: '',
    newExecutionId: '',
    parentRouteId: '',
    childBtn: false,
    btnText: '',
    selectedNodeInfo: {},
    renderedNodes: [{
      data: {
        id: 3,
        name: 'Test',
        timeStamp: '99050533'
      },
    },
    {
      data: {
        id: 8,
        name: 'Test2',
        timeStamp: '99050533'
      },
    }]
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
    displayNodeInformation(state, info) {
      state.selectedNodeInfo = info
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
    renderedNodes: state => state.renderedNodes,
  }
})

export default store

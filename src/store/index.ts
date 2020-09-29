import Vue from 'vue'
import Vuex from 'vuex'

const getDefaultState = () => {
  return {
    childRouteId: null,
    newExecutionId: null,
    parentRouteId: null,
    childBtn: false,
    btnText: null,
    selectedNode: null,
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
        name: 'Test 8',
        timeStamp: '99050533'
      },
    },
    {
      data: {
        id: 100,
        name: 'Test 100',
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
    setSelectedNode(state, node) {
      state.selectedNode = node
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
    selectedNode: state => state.selectedNode,
    renderedNodes: state => state.renderedNodes,
  }
})

export default store

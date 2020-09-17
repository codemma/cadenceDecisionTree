import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Tree from '../components/Tree.vue'
import Cytoscape from '../components/Cytoscape.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/tree/:runId',
    name: 'tree',
    props: true,
    component: Tree
  },
  {
    path: '/',
    name: 'cytoscape',
    component: Cytoscape
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

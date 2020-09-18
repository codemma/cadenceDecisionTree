import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Tree from '../components/Tree.vue'
import Vis from '../components/Vis.vue'

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
    name: 'vis',
    component: Vis
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Tree from '../components/Tree.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/tree/:runId',
    name: 'Tree',
    props: true,
    component: Tree
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

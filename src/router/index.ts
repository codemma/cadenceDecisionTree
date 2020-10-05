import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Tree from '../components/Tree.vue'
import Home from '../components/Home.vue'

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
    name: 'home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import GraphContainer from '../components/GraphContainer.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/graphcontainer/:runId',
    name: 'graphcontainer',
    props: true,
    component: GraphContainer
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

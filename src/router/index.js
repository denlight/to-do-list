

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "category" */ '../views/Dashboard.vue')
  },
  {
    path: '/category/:categoryKey',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


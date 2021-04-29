import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Register from '@/views/register'
import Home from '@/views/home'
import Demo from '@/views/demo'
import { getItem } from '@/utils/storage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/demo',
    component: Demo
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/test') {
    return next()
  }
  if (getItem('token')) {
    return next()
  }
  return next('/')
})

export default router

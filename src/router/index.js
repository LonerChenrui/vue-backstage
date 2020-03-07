import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Login = () => import('@/views/login/Login.vue')
const Home = () => import('@/views/home/Home.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

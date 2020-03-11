import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/login/Login.vue')
const Home = () => import('@/views/home/Home.vue')
const HomeMain = () => import('@/views/home/children/HomeMain.vue')

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
    component: Home,
    redirect: '/homemain',
    children: [
      { path: '/homemain',  component: HomeMain }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 通过导航守卫控制访问权限（全局导航守卫、路由独享守卫、组件内守卫）
// 如果用户没有登录，是通过URL访问指定页面，需要重新导航到登录页

router.beforeEach((to, from, next) => {
  // 如果用户访问的是登录页，就直接放行
  if (to.path === '/login') return next();
  // 如果用户访问的不是登录页 并且没有进行登录，就直接导航到登录页
  let token = sessionStorage.getItem('token');
  if (!token) {
    router.push('/login')
  }
  next()
})

export default router

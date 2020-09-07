import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/login/Login.vue')
const Home = () => import('@/views/home/Home.vue')
const HomeMain = () => import('@/views/home/children/HomeMain.vue')
const Users = () => import('@/views/users/userList/UserList.vue')
const PowerList = () => import('@/views/power/powerList/PowerList.vue')
const Roles = () => import('@/views/power/roles/Roles.vue')
const Categories = () => import('@/views/cate/categories/categories.vue')
const ClassifyParams = () => import('@/views/cate/classifyparams/classifyparams.vue')
const GoodsList = () => import('@/views/cate/goodsList/goodsList.vue')
const AddGoodsList = () => import('@/views/cate/goodsList/addGoodsList.vue')
const Orders = () => import('@/views/orders/orders')
const Reports = () => import('@/views/reports/reports')


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
      { path: '/homemain', name: 'homemain', component: HomeMain },
      { path: '/users', name: 'users', component: Users },
      { path: '/rights', name: 'rights', component: PowerList },
      { path: '/roles', name: 'roles', component: Roles },
      { path: '/categories', name: 'categories', component: Categories },
      { path: '/params', name: 'classifyparams', component: ClassifyParams },
      { path: '/goods', name: 'goods', component: GoodsList },
      { path: '/addgoodslist', name: 'addgoodslist', component: AddGoodsList },
      { path: '/orders', name: 'orders', component: Orders },
      { path: '/reports', name: 'reports', component: Reports },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 问题收集
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

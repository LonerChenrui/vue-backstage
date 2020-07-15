import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import 'element-ui/lib/theme-chalk/display.css';

import '@/assets/css/base.css'
import animated from 'animate.css' 
Vue.use(animated)

import ZkTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', ZkTable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

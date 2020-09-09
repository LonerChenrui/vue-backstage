import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import './plugins/element.js'
// import 'element-ui/lib/theme-chalk/display.css';

import '@/assets/css/base.css'
// import animated from 'animate.css'
// Vue.use(animated)

// 引入自定义过滤器
import "@/common/js/filters.js";

// 树结构table插件
import ZkTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', ZkTable)

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)

// 省市县三级联动
import Distpicker from 'v-distpicker'
Vue.component('v-distpicker', Distpicker)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

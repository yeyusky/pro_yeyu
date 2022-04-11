// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import * as echarts from 'echarts'
import ElementUI from 'element-ui'
import VueContextMenu from 'vue-contextmenu'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts
axios.defaults.baseURL = '/api'
ElementUI.Dialog.props.closeOnClickModal.default = false
Vue.use(ElementUI)
Vue.use(VueContextMenu)
Vue.use(new VueSocketIO({
  debug: true,
  // 服务器端地址
  connection: SocketIO('ws://127.0.0.1:3066'),
  // options: { path: '/node' },
  vuex: {
  }
}))
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  echarts,
  components: { App },
  template: '<App/>'
})

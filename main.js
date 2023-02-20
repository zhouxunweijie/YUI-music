import Vue from 'vue'
import App from './App'
import store from '@/store/index.js'
import {http} from '@/apis/service.js'

import api from '@/apis/index.js'

import H from '@/apis/music.js'

// import vconsole from 'vconsole';
// Vue.prototype.$vconsole = new vconsole()
Vue.config.productionTip = false

// HTTP请求组件
Vue.prototype.$http = http;
Vue.prototype.$api = api;
Vue.prototype.$H = H;

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

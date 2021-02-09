import Vue from 'vue'
import App from './App'
import {myRequest1,myRequest2} from './network/request.js'






Vue.config.productionTip = false
//将发送请求注册到原型
Vue.prototype.$myRequest1=myRequest1;
Vue.prototype.$myRequest2=myRequest2;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

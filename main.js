
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入store实例对象
import store from './store/store.js'
import { $http } from '@escook/request-miniprogram'
//从网络请求包中引入$http请求对象
uni.$http = $http
//因为在其他的页面或组件中也要使用，所以要将$http对象挂载到全局对象下，在uni-app中，uni是全局对象
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1/'
//配置网络请求基础地址，因为uni.$http为$http的引用，所以可以直接修改$http对象下的属性
$http.beforeRequest = function() {
    //配置发起网络请求前的拦截功能
    uni.showLoading({
        title: '加载中...'
    })
}
$http.afterRequest = function() {
    //配置网络请求完毕后的拦截功能
    uni.hideLoading()
}



// 封装请求失败提示信息
uni.$showMsg = function(title='数据加载失败',duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}


Vue.config.productionTip = false

App.mpType = 'app'
// 2把store挂载到vue实例上
const app = new Vue({
    store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
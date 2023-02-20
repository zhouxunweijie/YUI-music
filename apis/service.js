import Request from '@/common/luch-request/index.js'
const http = new Request()
const api = new Request()
export {http,api}

/**
 * 此文件为request请求封装
 */

http.setConfig((config) => { /* config 为默认全局配置*/
     // config.baseURL = 'http://api.music.canace.cn'; /* 根域名 */
	config.baseURL = 'http://api.uniquestfq.ltd';
    config.header = {
		'content-type':'application/x-www-form-urlencoded'
    }
    return config
})
//请求前拦截
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  config.header = {
    ...config.header,
  }
  //获取存储的token
  // const token = uni.getStorageSync('token');
  // config.header.token=token;
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})


// 请求后拦截器
http.interceptors.response.use((response) => {
  return response
}, (response) => {
  //未登录时清空缓存跳转
  if(response.statusCode ==401){
	  uni.clearStorageSync();
	  uni.navigateTo({
	  	url:"/pages/login/wechat"
	  })
  }
  return Promise.reject(response)
})
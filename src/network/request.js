import axios from 'axios'
import { Loading } from 'element-ui';
class HttpRequest {
  constructor (baseUrl) {
    // 接口基准地址
    this.baseUrl = 'https://www.liulongbin.top:8888/api/private/v1/'												
  }
  // 基础配置
  getInsideConfig () {														
    const config = {													
      baseURL: this.baseUrl,
      timeout: 3000
    }
    return config
  }
  // 请求和响应拦截
  interceptors (instance, url) {											
    // 请求拦截
    let loadingInstance = null;
    instance.interceptors.request.use(config => {							
      // 添加全局的loading...
      // loadingInstance = Loading.service();
      //需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      // config.headers['Authorization'] = token 
      
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {	
      // 这里根据状态码解决响应
      // if (res.status !== 200 && res.status !== 201 && res.status !== 202 && res.status !== 204) {
			//   
      // }

      // 以服务的方式调用的 Loading 需要异步关闭
      // this.$nextTick(() => {
      //   loadingInstance.close();
      // });
      return Promise.resolve(res.data)
    },error => {
      // 这里根据错误状态码进行路由跳转，比如没有权限跳转到登录界面，500错误跳转到服务器错误界面
      // if (error.response.status === 401) {
        
      // } 
      return Promise.reject(error)
    })
  }
  // 创建axios实例，并返回axios实例对象
  request (options) {	
    // 创建axios实例
    const instance = axios.create()
    // 指定的配置将与实例的配置合并
    options = Object.assign(this.getInsideConfig(), options)
    // 请求拦截器和响应拦截器
    this.interceptors(instance, options.url)
    // 返回axios实例对象
    return instance(options)
  }
}

export default new HttpRequest()




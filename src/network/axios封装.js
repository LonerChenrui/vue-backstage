
// axios封装

// src下新建api/services文件夹，创建http.js文件用于封装axios

// 基于axios进行二次封装
import axios from "axios";
import qs from "qs";
switch (process.env.NODE_ENV) {
  case "development":
    axios.defaults.baseURL = "xx";
    break;
  case "production":
    axios.defaults.baseURL = "xx";
    break;
  default:
    axios.defaults.baseURL = "xx";
}

// 设置超时请求时间
axios.defaults.timeout = 3000;

// 设置cors跨域是否允许携带凭证，默认为false，表示跨域是不会携带的

axios.defaults.withCredentials = true;

// 默认传输格式为json 并传给服务器端，，content-type= "application/json", 可以不用配置
// "{"a":"xx","b":"yy"}"
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.transformRequest = function (data) {
  return JSON.stringify(data);
};

// 如果需要 x-www-form-urlencoded 格式进行数据传输,需要配置axios的header和transformRequest
// a=xx&b=yy
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.transformRequest = function (data) {
  return qs.stringify(data);
};

// 设置请求拦截器
// 1. token校验,接受服务器返回的token可以存储到本地存储中，每次发送请求都需要放到header中去
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
// 1. 成功的时候走成功的回调，失败的时候走失败的回调，成功和失败的标准基于axios.default.validateStatus函数

// 这里有两种方案
// 1.根据status判断是否出错，那么在失败的回调中去做异常的处理
// 2.所有请求都返回200，那么需要在成功的回调中去，再根据返回的数据做异常的处理

// 默认情况 200-300
axios.defaults.validateStatus = (status) => {
  return /^(2|3)\d{2}$/.test(status);
};

axios.interceptors.response.use(
  (res) => {
    // 响应成功的时候，直接返回响应主体信息
    return res.data;
  },
  (error) => {
    //  重点处理 2xx,3xx 以外的状态码
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          // 一般是登录失败,可以做消息提示和路由跳转
          break;
        case 403:
          // 一般是token/session过期，接受请求，但拒绝执行
          break;
        case 404:
          // 找不到地址，可以做路由跳转
          break;
        default:
          break;
      }
      return Promise.reject(error);
    } else {
      // 断网处理
      if (!window.navigator.onLine) {
        //断网页面, 可以跳转到断网页面，等有网之后再跳转到
      }
    }
  }
);

export default axios



// api接口管理

// 按功能板块分，不一定要按照页面来分

// 1.创建有关user的接口创建有关user的接口
// user.js
import http from "./http";
function login() {
  return http.post("/login");
}
export default {
  login,
};

// 2.创建有关project的接口  

// welink.js
// 直接把传入的参数作为请求体
import http from "./http";
function welinkLogin(data) {
  return http.post("/api/sysLogin/weLinkLogin", data);
}

export default {
  welinkLogin,
};

// 3.整合所有的接口 

// index.js
// 数据请求的唯一接口
import user from "./user";
import project from "./project";
export default {
  user,
  project,
};
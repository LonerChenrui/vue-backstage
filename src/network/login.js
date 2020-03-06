import Axios from './request'

// 登录
export function login(loginForm) {
  return Axios.request({
    url: '/login',
    data: loginForm,
    method: 'post'
  })
}

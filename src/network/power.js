import Axios from './request'

// 权限列表
export function getPowerList() {
  return Axios.request({
    url: 'rights/list',
    method: 'get',
  })
}
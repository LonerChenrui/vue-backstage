import Axios from './request'

export function getAsideMenuList() {
  return Axios.request({
    url: '/menus',
    method: 'get'
  })
}

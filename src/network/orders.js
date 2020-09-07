import Axios from './request'

// 获取订单列表
export function getOrdersList(payLoad) {
  return Axios.request({
    url: 'orders',
    method: 'get',
    params: payLoad
  })
}
// 获取物理信息
export function getLocaTionOutlineInfo() {
  return Axios.request({
    url: '/kuaidi/1106975712662',
    method: 'get',
  })
}



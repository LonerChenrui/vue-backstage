import Axios from './request'

// 获取订单列表
export function getOrdersList(payLoad) {
  return Axios.request({
    url: 'orders',
    method: 'get',
    params: payLoad
  })
}

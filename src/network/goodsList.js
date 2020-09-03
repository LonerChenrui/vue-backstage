import Axios from './request'

// 获取商品列表
export function getGoodsList(payLoad) {
  return Axios.request({
    url: 'goods',
    method: 'get',
    params: payLoad
  })
}

// 删除参数列表
export function deleteGoodsList(id) {
  return Axios.request({
    url: `goods/${id}`,
    method: 'delete',
  })
}
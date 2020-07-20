import Axios from './request'

// 获取商品分类列表数据
export function getCateGoriesList(payload) {
  return Axios.request({
    url: 'categories',
    method: 'get',
    params: payload
  })
}
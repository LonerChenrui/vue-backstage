import Axios from './request'

// 级联选择器商品分类数据
export function getCascaderGoodsList(payload) {
  return Axios.request({
    url: 'categories',
    method: 'get',
    params: payload
  })
}
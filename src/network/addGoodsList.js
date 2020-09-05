import Axios from './request'

// 级联选择器商品分类数据
export function getCascaderGoodsList(payload) {
  return Axios.request({
    url: 'categories',
    method: 'get',
    params: payload
  })
}

// 获取参数列表
export function getParamsList(id,activeName) {
  return Axios.request({
    url: `categories/${id}/attributes`,
    method: 'get',
    params: {
      sel: activeName
    }
  })
}
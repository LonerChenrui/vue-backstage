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

// 添加参数列表
export function addParamsList(id,payload) {
  return Axios.request({
    url: `categories/${id}/attributes`,
    method: 'post',
    data: payload
  })
}

// 编辑参数列表
export function editParamsList(id,attrId,payload) {
  return Axios.request({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'put',
    data: payload
  })
}

// 删除参数列表
export function deleteParamsList(id,attrid) {
  return Axios.request({
    url: `categories/${id}/attributes/${attrid}`,
    method: 'delete',
  })
}
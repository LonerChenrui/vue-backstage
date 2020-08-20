import Axios from './request'

// 获取商品分类列表数据
export function getCateGoriesList(payload) {
  return Axios.request({
    url: 'categories',
    method: 'get',
    params: payload
  })
}

// 保存分类
export function saveCategories(payload) {
  return Axios.request({
    url: 'categories',
    method: 'post',
    data: payload
  })
}

// 删除分类list
export function deleteList(id) {
  return Axios.request({
    url: `categories/${id}`,
    method: 'delete',
  })
}




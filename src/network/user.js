import Axios from './request'

// 获取列表数据
export function getUserListData(payload) {
  return Axios.request({
    url: '/users',
    method: 'get',
    params: payload
  })
}
// 修改状态
export function alterUserState({ row }) {
  return Axios.request({
    url: `/users/${row.id}/state/${row.mg_state}`,
    method: 'put',
  })
}

// 添加用户
export function addUser(payload) {
  return Axios.request({
    url: '/users',
    method: 'post',
    data: payload
  })
}

// 编辑用户
export function editorUser(payload) {
  return Axios.request({
    url: `/users/${payload.id}`,
    method: 'put',
    data: payload
  })
}

// 删除单个用户
export function deleteUser(id) {
  return Axios.request({
    url: `/users/${id}`,
    method: 'delete',
    data: id
  })
}
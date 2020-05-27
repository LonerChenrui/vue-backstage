import Axios from './request'

// list 列表显示权限
export function getPowerList() {
  return Axios.request({
    url: '/rights/list',
    method: 'get',
  })
}

//  tree 树状显示权限
export function getTreeRights() {
  return Axios.request({
    url: '/rights/tree',
    method: 'get',
  })
}

// 角色列表
export function getRolesList() {
  return Axios.request({
    url: '/roles',
    method: 'get',
  })
}

// 删除角色指定权限
export function jurisdictionDelete(roleId, rightId) {
  return Axios.request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete',
  })
}

// 角色授权
export function roleRights(roleId,rids) {
  return Axios.request({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids
    }
  })
}
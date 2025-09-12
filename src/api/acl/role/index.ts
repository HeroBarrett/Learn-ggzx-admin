// 角色管理模块

import request from '@/utils/request'
import type { RoleData, RoleResponseData } from './type'

enum API {
  // 获取全部的职位
  ALLROLE_URL = '/admin/acl/role/',
  // 新增职位的接口
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新已有的职位
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 获取全部的菜单与按钮的数据
  ALLPERMISSTION_URL = '/admin/acl/permission/toAssign/',
  // 给相应的职位分配权限
  SETPERMISTION_URL = '/admin/acl/permission/doAssign?',
  // 删除角色
  REMOVEROLE_URL = '/admin/acl/role/remove/',
}

// 获取全部角色
export const reqAllRoleList = (
  page: number,
  limit: number,
  roleName: string,
) => {
  return request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`,
  )
}

// 添加与更新已有职位
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

// 获取全部的菜单与按钮的数据
export const reqAllMenuList = (roleId: number) => {
  return request.get<any, any>(API.ALLPERMISSTION_URL + roleId)
}

// 给相应的职位分配权限
export const reqSetPermission = (roleId: number, permissionId: number[]) => {
  return request.post<any, any>(API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`)
}

// 删除已有的职位
export const reqRemoveRole = (roleId: number) => {
  return request.delete<any, any>(API.REMOVEROLE_URL + roleId)
}

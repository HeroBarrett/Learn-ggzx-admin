// 用户管理模块接口

import request from "@/utils/request"
import type { AllRoleResponseData, SetRoleData, User, UserResponseData } from "./type"

// 枚举地址
enum API {
  // 获取全部已有的用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新的用户账号
  ADDUSER_URL = '/admin/acl/user/save',
  // 更新已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 获取全部职位，当前账号拥有的职位接口
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  // 给已有的用户分配角色的接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某一个账号
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove'
}

// 获取用户账号信息
export const reqUserInfo = (page:number, limit: number, username?: string) => {
  return request.get<any, UserResponseData>(API.ALLUSER_URL + page + '/' + limit + '?username=' + username)
}

// 添加用户与更新用户的接口
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

// 获取全部职位，当前账号拥有的职位接口
export const reqAllRole = (userId: number) => {
  return request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
}

// 分配职务
export const reqSetUserRole = (data: SetRoleData) => {
  return request.post<any, any>(API.SETROLE_URL, data)
}

// 删除某一个账号
export const reqRemoveUser = (userId: number) => {
  return request.delete<any, any>(API.DELETEUSER_URL + userId)
}

// 批量删除
export const reqRemoveAllUser = (idList: number[]) => {
  return request.delete<any, any>(API.DELETEALLUSER_URL, { data: idList })
}

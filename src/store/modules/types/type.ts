// 导入类型定义
// 1. 从产品属性API中导入分类对象类型
import type { CategoryOBJ } from '@/api/product/attr/type'
// 2. 从vue-router中导入路由记录类型
import type { RouteRecordRaw } from 'vue-router'

// 定义用户仓库数据类型接口
// 用于约束用户相关状态的数据结构
export interface UserState {
  // 用户token，用于身份验证，可为null
  token: string | null
  // 用户可访问的菜单路由列表
  menuRoutes: RouteRecordRaw[]
  // 用户名
  username: string
  // 用户头像URL
  avatar: string
}

// 定义分类仓库数据类型接口
// 用于约束商品分类相关状态的数据结构
export interface CategoryState {
  // 一级分类ID
  c1Id: string | number,
  // 一级分类数据列表
  c1Arr: CategoryOBJ[],
  // 二级分类ID
  c2Id: string | number,
  // 二级分类数据列表
  c2Arr: CategoryOBJ[],
  // 三级分类ID
  c3Id: string | number,
  // 三级分类数据列表
  c3Arr: CategoryOBJ[],
}

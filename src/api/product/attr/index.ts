// 属性相关的API
import request from '@/utils/request'
import type { AttrResponseData, CategoryResponseData } from './type'

// 接口地址
enum API {
  // 获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  // 获取分类下已有的属性与属性值
  ATTR_URL = '/admin/product/attrInfoList/',
}

// 获取一级分类接口
export const reqC1 = () => {
  return request.get<any, CategoryResponseData>(API.C1_URL)
}

// 获取二级分类接口
export const reqC2 = (category1Id: number) => {
  return request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
}

// 获取三级分类接口
export const reqC3 = (category2Id: number) => {
  return request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
}

// 获取分类下已有的属性与属性值
export const reqAttr = (c1Id: number, c2Id: number, c3Id: number) => {
  return request.get<any, AttrResponseData>(API.ATTR_URL + c1Id + '/' + c2Id + '/' + c3Id)
}

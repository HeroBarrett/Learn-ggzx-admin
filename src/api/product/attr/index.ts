// 属性相关的API
import request from '@/utils/request'

// 接口地址
enum API {
  // 获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
}

// 获取一级分类接口
export const reqC1 = () => {
  return request.get<any, any>(API.C1_URL)
}

// 获取二级分类接口
export const reqC2 = (category1Id: number) => {
  return request.get<any, any>(API.C2_URL + category1Id)
}

// 获取三级分类接口
export const reqC3 = (category2Id: number) => {
  return request.get<any, any>(API.C3_URL + category2Id)
}
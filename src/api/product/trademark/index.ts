// 品牌管理文件接口

import request from '@/utils/request'
import type { TradeMartResponseData } from './type'

// 品牌管理模块接口地址
enum API {
  // 获取已有品牌的接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

// 获取已有品牌
// page --获取第几页 默认第一页
// limit -- 获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, TradeMartResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
}

// SKU模块接口管理
import request from "@/utils/request"
import type { SkuResponseData } from "./type"
// 枚举地址
enum API {
  // 获取已有的商品数据
  SKU_URL = '/admin/product/list/',
}

// 获取商品sku接口
export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
}

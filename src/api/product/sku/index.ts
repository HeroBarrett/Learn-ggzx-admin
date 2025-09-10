// SKU模块接口管理
import request from "@/utils/request"
import type { SkuInfoData, SkuResponseData } from "./type"
// 枚举地址
enum API {
  // 获取已有的商品数据
  SKU_URL = '/admin/product/list/',
  // 商品上架
  SALE_URL = '/admin/product/onSale/',
  // 商品下架
  CANCELSALE_URL = '/admin/product/cancelSale/',
  // 获取商品详情
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  // 删除已有的商品
  DELETE_URL = '/admin/product/deleteSku/'
}

// 获取商品sku接口
export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
}

// 已有商品上架
export const reqSaleSku = (skuId: number) => {
  return request.get<any, any>(API.SALE_URL + skuId)
}

// 已有商品下架
export const reqCancelSale = (skuId: number) => {
  return request.get<any, any>(API.CANCELSALE_URL + skuId)
}

// 获取商品详情接口
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)

// 删除某一个已有的商品
export const reqRemoveSku = (skuId: number) => request.delete<any, any>(API.DELETE_URL + skuId)

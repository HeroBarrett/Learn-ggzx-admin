// SPU管理模板接口
import request from '@/utils/request'
import type {
  AllTradeMark,
  HasSaleAttrResponseData,
  HasSpuResponseData,
  SaleAttrResponseData,
  SkuData,
  SkuInfoData,
  SpuData,
  SpuHasImg,
} from './type'

enum API {
  // 获取已有的SPU数据
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个spu下的全部售卖商品的照片
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取某一个SPU下全部已有销售属性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 追加一个SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 修改一个SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 添加一个SKU
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  // 查看某一个SPU的SKU
  SKUINFO_URL = '/admin/product/findBySpuId/',
  // 删除一个SPU
  REMOVESPU_URL = '/admin/product/deleteSpu/',
}

// 获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) => {
  return request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}

// 获取全部SPU品牌的数据
export const reqAllTrademark = () => {
  return request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
}

// 获取某个spu下的全部售卖商品的照片
export const reqSpuImageList = (spuId: number) => {
  return request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
}

// 获取某一个SPU下全部已有销售属性
export const reqSpuHasSaleAttr = (spuId: number) => {
  return request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
}

// 获取整个项目全部的销售属性
export const reqAllSaleAttr = () => {
  return request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
}

// 追加或修改一个SPU
export const reqAddOrUpdateSpu = (data: SpuData) => {
  // 判断是修改还是追加
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}

// 添加一个SKU
export const reqAddSku = (data: SkuData) => {
  return request.post<any, any>(API.ADDSKU_URL, data)
}

// 查看某一个SPU的SKU
export const reqSkuList = (spuId: number | string) => {
  return request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)
}

// 删除已有的SPU
export const reqRemoveSpu = (spuId: number | string) => {
  return request.delete<any, any>(API.REMOVESPU_URL + spuId)
}
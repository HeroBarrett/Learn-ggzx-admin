// 分类相关的ts类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean,
}

// 分类的ts类型
export interface CategoryOBJ {
  id: number | string,
  name: string,
  category1Id?: number,
  category2Id?: number,
  category3Id?: number,
}

// 分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryOBJ[]
}

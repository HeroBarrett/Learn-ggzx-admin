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

// 属性相关的ts类型
// 属性值对象的ts类型
export interface AttrValue {
  id: number,
  valueName: string,
  attrId: number,
}

// 存储每一个属性值的数组
export type AttrValueList = AttrValue[]

// 属性对象的ts类型
export interface Attr {
  id: number,
  attrName: string,
  categoryId: number,
  categoryLevel: number,
  attrValueList: AttrValueList,
}

// 存储每一个属性的数组
export type AttrList = Attr[]

// 属性接口返回的数据类型
export interface AttrResponseData extends ResponseData {
  data: AttrList
}
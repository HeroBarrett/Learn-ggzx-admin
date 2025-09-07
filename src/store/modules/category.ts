// 商品分类全局组件仓库
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { defineStore } from 'pinia'
import type { CategoryState } from './types/type'

const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      // 存储一级分类的数据
      c1Arr:[],
      // 一级分类的id
      c1Id: '',
      // 存储二级分类的数据
      c2Arr: [],
      // 二级分类的id
      c2Id: '',
      // 存储三级分类的数据
      c3Arr: [],
      // 三级分类的id
      c3Id: '',
    }
  },
  actions: {
    // 获取一级分类
    async getC1(){
      // 发请求获取一级分类数据
      const result = await reqC1()
      // console.log(result);
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },

    // 获取二级分类
    async getC2(){
      // 发请求获取二级分类
      const result = await reqC2(Number(this.c1Id))
      // console.log(result);
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },

    // 获取三级分类
    async getC3(){
      // 发请求获取三级分类
      const result = await reqC3(Number(this.c2Id))
      // console.log(result);
      if (result.code == 200) {
        this.c3Arr = result.data
      }
    }
  },
  getters: {

  },
})

export default useCategoryStore

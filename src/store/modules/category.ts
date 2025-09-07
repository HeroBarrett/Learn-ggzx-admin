// 商品分类全局组件仓库
import { reqC1 } from '@/api/product/attr'
import { defineStore } from 'pinia'
import type { CategoryState } from './types/type'

const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      // 存储一级分类的数据
      c1Arr:[],
      // 一级分类的id
      c1Id: ''
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
      
    }
  },
  getters: {

  },
})

export default useCategoryStore

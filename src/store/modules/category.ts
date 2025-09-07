// 商品分类全局组件仓库
import { reqC1 } from '@/api/product/attr'
import { defineStore } from 'pinia'

let useCategoryStore = defineStore('Category', {
  state: () => {
    return {
      c1Arr:[],
      c1Id: ''
    }
  },
  actions: {
    // 获取一级分类
    async getC1(){
      // 发请求获取一级分类数据
      let result = await reqC1()
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

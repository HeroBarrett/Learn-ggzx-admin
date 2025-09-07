<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select style="width: 200px;" v-model="categoryStore.c1Id" @change="handler">
          <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select style="width: 200px;" v-model="categoryStore.c2Id" @change="handler1">
          <el-option v-for="c2 in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select style="width: 200px;" v-model="categoryStore.c3Id">
          <el-option v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import useCategoryStore from '@/store/modules/category';
import { onMounted } from 'vue';

  // 获取分类相关仓库
  let categoryStore = useCategoryStore()

  // 通知仓库获取一级分类
  const getC1 = () => {
    categoryStore.getC1()
  }

  // 一级分类改变时的回调
  const handler = () => {
    // 清空历史二级分类和三级分类
    categoryStore.c2Arr = []
    categoryStore.c3Arr = []
    // 清空历史二级分类和三级分类的id
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    // 通知仓库获取二级分类的数据
    categoryStore.getC2()
  }

  // 二级分类改变时的回调
  const handler1 = () => {
    // 清空历史三级分类
    categoryStore.c3Arr = []
    // 清空历史三级分类的id
    categoryStore.c3Id = ''
    // 通知仓库获取三级分类的数据
    categoryStore.getC3()
  }

  onMounted(() => {
    getC1()
  })

</script>

<style scoped lang="scss"></style>
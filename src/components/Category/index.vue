<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select style="width: 200px;" v-model="categoryStore.c1Id">
          <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select style="width: 200px;">
          <el-option label="北京"></el-option>
          <el-option label="上海"></el-option>
          <el-option label="广州"></el-option>
          <el-option label="深圳"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select style="width: 200px;">
          <el-option label="北京"></el-option>
          <el-option label="上海"></el-option>
          <el-option label="广州"></el-option>
          <el-option label="深圳"></el-option>
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

  onMounted(() => {
    getC1()
  })

</script>

<style scoped lang="scss"></style>
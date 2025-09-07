<template>
  <div>
    <Category></Category>

    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id">添加属性</el-button>
      <el-table border style="margin: 10px 0;">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" width="120px"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import useCategoryStore from '@/store/modules/category';
  // 获取分类相关仓库
  let categoryStore = useCategoryStore()

</script>

<style scoped lang="scss"></style>
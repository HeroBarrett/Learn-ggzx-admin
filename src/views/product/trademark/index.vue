<template>
  <el-card>
    <!-- 卡片顶部按钮 -->
    <el-button type="primary" size="default" icon="plus">添加品牌</el-button>
    <!-- 表格组件：用于展示已有的品牌数据 -->
    <el-table style="margin: 10px 0;" border>
      <el-table-column label="序号" width="80px" align="center" />
      <el-table-column label="品牌名称" />
      <el-table-column label="品牌logo" />
      <el-table-column label="品牌操作" />
    </el-table>
    
    <!-- 分页器 -->
    <!-- 分页器组件
        pagination
          v-model:current-page 设置分页器当前页码
          v-model:page-size 设置没一个展示数据条数
          page-sizes: 设置下拉菜单数据
          background: 设置按钮背景颜色
          layout: 设置分页器六个字组件的布局
   -->
    <el-pagination v-model:current-page="pageNo" :v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
      :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="400" />
  </el-card>

</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  // 当前页码
  let pageNo = ref<number>(1)
  // 每一页展示多少条数据
  let limit = ref<number>(3)

</script>

<style scoped lang="scss"></style>
<template>
  <el-card>
    <!-- 卡片顶部按钮 -->
    <el-button type="primary" size="default" icon="plus">添加品牌</el-button>
    <!-- 表格组件：用于展示已有的品牌数据 -->
    <el-table style="margin: 10px 0;" border :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称">
        <template #="{ row }">
          <pre style="color: brown;">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌logo">
        <template #="{ row }">
          <img :src="row.logoUrl" alt="没有图片" style="width: 100px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
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
    <el-pagination 
      @current-change="changePageNo"
      @size-change="sizeChange"
      v-model:current-page="pageNo" 
      v-model:page-size="limit" 
      :page-sizes="[3, 5, 7, 9]"
      :background="true" 
      layout="prev, pager, next, jumper, ->, sizes, total" 
      :total="total" />
  </el-card>

</template>

<script lang="ts" setup>
  import { reqHasTrademark } from '@/api/product/trademark';
  import type { Records } from '@/api/product/trademark/type';
  import { onMounted, ref } from 'vue';

  // 当前页码
  let pageNo = ref<number>(1)
  // 每一页展示多少条数据
  let limit = ref<number>(3)
  // 存储已有品牌数据总数
  let total = ref<number>(0)
  // 存储已有品牌的数据
  let trademarkArr = ref<Records>([])
  // 获取已有品牌的接口
  const getHasTrademark = async () => {
    let result = await reqHasTrademark(pageNo.value, limit.value)
    // console.log(result);
    if (result.code == 200) {
      // 存储已有品牌总个数
      total.value = result.data.total
      trademarkArr.value = result.data.records
    }

  }

  // 组件挂载
  onMounted(() => {
    getHasTrademark()
  })

  // 分页器当前页码发生变化触发
  const changePageNo = () => {
    // console.log(123);
    getHasTrademark()
  }
  // 下拉菜单变化
  const sizeChange = () => {
    pageNo.value = 1
    getHasTrademark()
  }

</script>

<style scoped lang="scss"></style>
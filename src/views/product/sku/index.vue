<template>
  <el-card>
    <el-table border style="margin: 10px 0px;" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
      <el-table-column label="名称" show-overflow-tooltip width="150px" prop="skuName"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip width="150px" prop="skuDesc"></el-table-column>
      <el-table-column label="图片" width="150px" prop="skuImage">
        <template #default="{ row }">
          <!-- <el-image :src="row.skuImage" fit="fill" :preview-src-list="[row.skuImage]" /> -->
          <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column label="重量" width="150px" prop="weight"></el-table-column>
      <el-table-column label="价格" width="150px" prop="price"></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="Bottom"></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="InfoFilled"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
      @current-change="getHasSku" @size-change="handler" />
  </el-card>
</template>

<script lang="ts" setup>
  import { reqSkuList } from '@/api/product/sku';
  import type { SkuData } from '@/api/product/sku/type';
  import { onMounted, ref } from 'vue';
  // 存储分页器页码
  let pageNo = ref(1)
  // 存储每一页保存的条数
  let pageSize = ref(10)
  let total = ref<number>(0)
  let skuArr = ref<SkuData[]>([])

  // 发送请求获取sku数据
  const getHasSku = async (pager = 1) => {
    // 当前分页器页码
    pageNo.value = pager
    const result = await reqSkuList(pageNo.value, pageSize.value)
    if (result.code == 200) {
      // console.log(result)
      total.value = result.data.total
      skuArr.value = result.data.records
    }
  }

  // 分页器下拉菜单变化
  const handler = () => {
    getHasSku()
  }

  // 组件挂载完毕
  onMounted(() => {
    getHasSku()
  })
</script>

<style scoped lang="scss"></style>
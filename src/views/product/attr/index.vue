<template>
  <div>
    <Category></Category>

    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id">添加属性</el-button>
      <el-table border style="margin: 10px 0;" :data="attrList">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{row}">
            <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 5px">{{item.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template>
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { reqAttr } from '@/api/product/attr';
  import type { AttrList } from '@/api/product/attr/type';
  import useCategoryStore from '@/store/modules/category';
  import { ref, watch } from 'vue';
  // 获取分类相关仓库
  let categoryStore = useCategoryStore()
  // 存储已有的属性与属性值
  let attrList = ref<AttrList>([])

  // 监听三级分类id的变化
  watch(() => categoryStore.c3Id, async () => {
    // 每次切换分类时，先清空属性列表
    attrList.value = []
    // 保证三级分类id存在
    if (!categoryStore.c3Id) return
    // 获取分类的id
    getAttr()
  })

  // 获取已有的属性与属性值
  const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    const result = await reqAttr(Number(c1Id), Number(c2Id), Number(c3Id))
    // console.log(result);
    if (result.code == 200) {
      attrList.value = result.data
    }
  }

</script>

<style scoped lang="scss"></style>
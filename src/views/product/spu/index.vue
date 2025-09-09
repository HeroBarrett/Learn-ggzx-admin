<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>
    <!-- 底下卡片 -->
    <el-card style="margin-top: 10px;">
      <!-- 场景0: 列表 -->
      <div v-show="scene == 0">
        <!-- 顶部添加按钮 -->
        <el-button @click="addSpu" type="primary" size="default" icon="Plus"
          :disabled="!categoryStore.c3Id">添加SPU</el-button>
        <!-- 表格主体内容 -->
        <el-table style="margin: 10px 0;" border :data="records" show-overflow-tooltip>
          <el-table-column prop="date" label="序号" type="index" align="center" width="80" />
          <el-table-column prop="spuName" label="SPU名称" />
          <el-table-column prop="description" label="SPU描述" />
          <el-table-column prop="address" label="SPU操作">
            <template #default="{ row }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
              <el-button type="primary" size="small" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="primary" size="small" icon="View" title="查看SKU列表"></el-button>
              <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
          :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
          @current-change="getHasSpu" @size-change="changeSize" />
      </div>
      <!-- 场景1: 添加，修改spu -->
      <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></SpuForm>
      <!-- 场景2: 添加sku -->
      <SkuForm v-show="scene == 2"></SkuForm>

    </el-card>

  </div>
</template>

<script lang="ts" setup>
  import { reqHasSpu } from '@/api/product/spu';
  import type { Records, SpuData } from '@/api/product/spu/type';
  import useCategoryStore from '@/store/modules/category';
  import { ref, watch } from 'vue';
  import SpuForm from './spuForm.vue'
  import SkuForm from './skuForm.vue'
  // 获取分类仓库
  const categoryStore = useCategoryStore()
  // 场景数值
  const scene = ref(0)
  // 分页器默认页码
  let pageNo = ref(1)
  // 每一页展示几条数据
  let pageSize = ref(3)
  // 存储已有的SPU数据
  let records = ref<Records>([])
  // 一共有多少SPU
  let total = ref(0)
  // 获取子组件实例SpuForm
  const spu = ref<any>()

  // 监听三级分类ID的变化
  watch(() => categoryStore.c3Id, () => {
    // 务必保证有三级分类id
    if (!categoryStore.c3Id) return
    getHasSpu()
  })

  // 获取某一个三级分类的SPU
  const getHasSpu = async (pager = 1) => {
    // 修改当前的页码
    pageNo.value = pager
    const result = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (result.code == 200) {
      records.value = result.data.records
      total.value = result.data.total
    }
  }

  // 分页器下拉菜单发生变化触发
  const changeSize = () => {
    getHasSpu()
  }

  // 点击添加spu按钮的回调
  const addSpu = () => {
    // 切换为场景1：添加与修改已有的SPU结构-》SpuForm
    scene.value = 1
    spu.value.initAddSpu(categoryStore.c3Id)
  }

  // 修改已有的Spu的回调
  const updateSpu = (row: SpuData) => {
    // 切换为场景1：添加与修改已有的SPU结构-》SpuForm
    scene.value = 1
    // console.log(spu.value);
    // 调用子组件实例方法获取完整已有的SPU数据
    spu.value.initHasSpuData(row)

  }

  // 子组件绑定自定义事件切换场景为0
  const changeScene = ({ flag, params }: { flag: number; params?: any }) => {
    scene.value = flag
    if (params == 'update') {
      getHasSpu(pageNo.value)
    } else {
      getHasSpu()
    }
  }




</script>

<style scoped lang="scss"></style>
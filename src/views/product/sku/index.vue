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
          <el-button type="primary" size="small" :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"></el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
          <el-button type="primary" size="small" icon="InfoFilled" @click="findSku(row)"></el-button>
          <el-popconfirm :title="`你确定要删除${row.skuName}吗`" width="200px" @confirm="removeSku(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @current-change="getHasSku"
      @size-change="handler" />
    <!-- 抽屉组件 -->
    <el-drawer v-model="drawer">
      <!-- 标题部分 -->
      <template #header>
        <h4>查看尚品详情</h4>
      </template>
      <!-- 内容 -->
      <template #default>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px;" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{ item.valueName
            }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px;" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id" type="danger">{{
              item.saleAttrValueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0;">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item">
                <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script lang="ts" setup>
  import { reqCancelSale, reqRemoveSku, reqSaleSku, reqSkuInfo, reqSkuList } from '@/api/product/sku';
  import type { SkuData } from '@/api/product/sku/type';
  import { ElMessage } from 'element-plus';
  import { onMounted, ref } from 'vue';
  // 存储分页器页码
  let pageNo = ref(1)
  // 存储每一页保存的条数
  let pageSize = ref(10)
  let total = ref<number>(0)
  let skuArr = ref<SkuData[]>([])
  // 存储抽屉显示与隐藏
  let drawer = ref(false)
  // 存储商品详情数据
  let skuInfo = ref<any>({})

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

  // 尚品上架与下架
  const updateSale = async (row: SkuData) => {
    // 如果当前尚品的isSale==1 更新为下架
    if (row.isSale == 1) {
      // 下架
      await reqCancelSale(row.id as number)
      // 提示
      ElMessage({
        type: 'success',
        message: '下架成功'
      })
      // 刷新数据
      getHasSku(pageNo.value)
    } else {
      // 上架
      await reqSaleSku(row.id as number)
      // 提示
      ElMessage({
        type: 'success',
        message: '上架成功'
      })
      // 刷新数据
      getHasSku(pageNo.value)
    }
  }

  // 更新已有的SKU
  const updateSku = () => {
    ElMessage({ type: 'success', message: '程序员在努力的更新中.....' })
  }

  // 查看商品详情按钮的回调
  const findSku = async (row: SkuData) => {
    drawer.value = true
    // 获取已有的商品详情数据
    let result = await reqSkuInfo(row.id as number)
    // console.log(result);
    skuInfo.value = result.data
  }

  // 删除一个SKU
  const removeSku = async (id: number) => {
    const result = await reqRemoveSku(id)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    }
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }

  // 组件挂载完毕
  onMounted(() => {
    getHasSku()
  })
</script>

<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
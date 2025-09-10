<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item v-for="item in attrArr" :label="item.attrName" :key="item.id">
          <el-select style="width: 200px;" v-model="item.addtrIdAndValueId">
            <el-option :value="`${item.id}:${attrValue.id}`" v-for="attrValue in item.attrValueList" :key="attrValue.id"
              :label="attrValue.valueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item v-for="item in saleAttr" :key="item.id" :label="item.saleAttrName">
          <el-select style="width: 200px;" v-model="item.saleIdAndValueId">
            <el-option :value="`${item.id}:${saleAttrValue.id}`" v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="table">
        <el-table-column type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片">
          <template #="{ row }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="primary" size="default" @click="handler(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { reqAttr } from '@/api/product/attr'
  import { reqAddSku, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu'
  import type { SkuData } from '@/api/product/spu/type'
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue'
  // 平台属性
  let attrArr = ref<any>([])
  // 销售属性
  let saleAttr = ref<any>([])
  // 照片的数据
  let imgArr = ref<any>([])
  // 收集sku数据
  let skuParams = ref<SkuData>({
    category3Id: "", //三级分类的ID
    spuId: "", //已有的SPU的ID
    tmId: "", //SPU品牌的ID
    skuName: "", //sku名字
    price: "", //sku价格
    weight: "", //sku重量
    skuDesc: "", //sku的描述
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: "" //sku图片地址
  })
  // 获取table实例
  let table = ref<any>()
  // 获取父组件方法
  const $emit = defineEmits(['changeScene'])

  // 取消按钮的回调
  const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' })
  }

  // 当前子组件的方法对外暴露
  const initSkuData = async (c1Id: number, c2Id: number, spu: any) => {
    // 收集数据
    skuParams.value.category3Id = spu.category3Id
    skuParams.value.spuId = spu.id
    skuParams.value.tmId = spu.tmId
    // 获取平台属性
    const result1 = await reqAttr(c1Id, c2Id, spu.category3Id)
    // 获取销售属性
    const result2 = await reqSpuHasSaleAttr(spu.id)
    // 获取图片
    const result3 = await reqSpuImageList(spu.id)
    // 存储数据
    attrArr.value = result1.data
    saleAttr.value = result2.data
    imgArr.value = result3.data
  }

  // 设置默认图片
  const handler = (row: any) => {
    // 取消所有的选中
    table.value.clearSelection()
    // 选中当前的
    table.value.toggleRowSelection(row, true)
    // 手机图片的地址
    skuParams.value.skuDefaultImg = row.imgUrl
  }

  // 保存按钮
  const save = async () => {
    // 整理参数
    skuParams.value.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
      if (next.addtIdAndValueId) {
        let [attrId, valueId] = next.attrIdAndValueId.split(':')
        prev.push({
          attrId,
          valueId
        })
      }
      return prev
    }, [])
    skuParams.value.skuSaleAttrValueList = saleAttr.value.reduce((prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({
          saleAttrId,
          saleAttrValueId
        })
      }
    }, [])

    // 发送添加sku请求
    const result = await reqAddSku(skuParams.value)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '添加成功',
      })
      // 切换场景
      $emit('changeScene', { flag: 0, params: '' })
    } else {
      ElMessage({
        type: 'error',
        message: '添加失败',
      })
    }
  }


  // 对外暴露方法
  defineExpose({
    initSkuData
  })

</script>

<style scoped lang="scss"></style>
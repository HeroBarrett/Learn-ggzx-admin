<template>
  <el-form label-width="120px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择分类" v-model="spuParams.tmId">
        <el-option v-for="item in AllTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述" v-model="spuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <!-- 
        v-model:file-list 展示上传的图片
        action 上传图片的接口
        list-type="picture-card" 文件列表的类型-照片墙
        :on-preview="handlePictureCardPreview" 点击图片预览
        :on-remove="handleRemove" 点击删除图片
       -->
      <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <div style="width: 200px;">
        <el-select v-model="saleAttrIdAndValueName"
          :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '暂无数据可选'">
          <el-option :value="`${item.id}:${item.name}`" v-for="item in unSelectSaleAttr" :key="item.id"
            :label="item.name"></el-option>
        </el-select>
      </div>
      <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" type="primary" size="default"
        icon="Plus" style="margin-left: 10px;">添加属性</el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0px" :data="saleAttr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名字" prop="saleAttrName" align="center" width="120px"></el-table-column>
        <el-table-column label="销售属性值" align="center">
          <!-- 销售属性值的输入框 -->
          <template #default="{ row, $index }">
            <el-tag @close="row.spuSaleAttrValueList.splice($index, 1)" style="margin: 0 5px;"
              v-for="(item) in row.spuSaleAttrValueList" :key="item.id" type="primary" closable>
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag == true" placeholder="请输入属性值"
              size="small" style="width: 100px;" />
            <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template #="{ $index }">
            <el-button type="primary" size="small" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
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
  import { reqAddOrUpdateSpu, reqAllSaleAttr, reqAllTrademark, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
  import type { AllTradeMark, HasSaleAttr, HasSaleAttrResponseData, SaleAttr, SaleAttrValue, SpuData, SpuImg, Trademark } from '@/api/product/spu/type';
  import { ElMessage } from 'element-plus';
  import { computed, ref } from 'vue';
  let $emit = defineEmits(['changeScene'])
  // 点击取消按钮：通知父组件切换场景
  const cancel = () => {
    $emit('changeScene', {flag: 0, params: 'update'})
  }
  // 控制对话框显示与隐藏
  let dialogVisible = ref(false)
  // 对话框展示的图片
  let dialogImageUrl = ref('')
  // 将来还未收集的销售属性
  let saleAttrIdAndValueName = ref('')
  // 存储已有的SPU数据
  let AllTradeMark = ref<Trademark[]>([])
  let imgList = ref<SpuImg[]>([])
  let saleAttr = ref<SaleAttr[]>([])
  let allSaleAttr = ref<HasSaleAttr[]>([])
  // 存储已有的SPU对象
  let spuParams = ref<SpuData>({
    category3Id: "", // 收集三级分类的id
    spuName: "",  // 收集SPU名称
    description: "",  // 收集SPU描述
    tmId: "",  // 收集品牌的id
    spuImageList: [],  // 收集SPU的图片
    spuSaleAttrList: []
  })
  // 初始化已有的SPU数据
  const initHasSpuData = async (spu: SpuData) => {
    spuParams.value = spu
    // console.log('初始化已有的SPU数据');
    // 初始化已有的SPU数据
    // 1、获取全部品牌的数据
    const result1 = await reqAllTrademark()
    // console.log(result1);
    // 2、获取某一个品牌旗下全部售卖商品的图片
    const result2 = await reqSpuImageList(spu.id as number)
    // console.log(result2);
    // 3、获取某一个SPU的全部销售属性
    const result3 = await reqSpuHasSaleAttr(spu.id as number)
    // console.log(result3);
    // 4、获取某一个SPU的全部销售属性值
    const result4 = await reqAllSaleAttr()
    // console.log(result4);

    // 将数据赋值给响应式数据
    AllTradeMark.value = result1.data
    imgList.value = result2.data.map(item => {
      return {
        name: item.imgName,
        url: item.imgUrl,
      }
    })
    saleAttr.value = result3.data
    allSaleAttr.value = result4.data
  }

  // 照片墙点击预览
  const handlePictureCardPreview = (file: any) => {
    // 对话框出来
    dialogVisible.value = true
    dialogImageUrl.value = file.url
  }

  // 照片墙点击删除
  const handleRemove = () => {
    // 从照片墙中删除
    console.log(123);
  }

  // 照片上传成功前的钩子（约束文件的大小与类型）
  const handlerUpload = (file: any) => {
    // 限制上传的图片类型
    if (!file.type.includes('image')) {
      ElMessage.error('上传图片类型必须是图片')
      return false
    }
    // 限制上传的图片大小
    if (file.size / 1024 / 1024 > 2) {
      ElMessage.error('上传图片大小不能超过2MB')
      return false
    }
    return true
  }

  // 计算出当前SPU还未拥有的销售属性
  let unSelectSaleAttr = computed(() => {
    // 全部销售属性：颜色、版本、尺码
    // 已有的销售属性: 颜色、版本
    let unSelectArr = allSaleAttr.value.filter(item => {
      return saleAttr.value.every(item1 => {
        return item.name != item1.saleAttrName
      })
    })
    return unSelectArr
  })

  // 添加销售属性的方法
  const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
    // 准备一个新的销售对象，将来带给服务器
    let newSaleAttr: SaleAttr = {
      baseSaleAttrId,
      saleAttrName,
      spuSaleAttrValueList: []
    }
    // 追加到数组当中
    saleAttr.value.push(newSaleAttr)
    // 清空收集的数据
    saleAttrIdAndValueName.value = ''
  }

  // 属性值按钮点击事件
  const toEdit = (row: SaleAttr) => {
    // 点击按钮input组件出来（编辑模式）
    row.flag = true
  }

  // 表单元素失去焦点
  const toLook = (row: SaleAttr) => {
    // 收集属性id与属性值名字
    const { baseSaleAttrId, saleAttrValue } = row
    // 整理成服务器需要的属性值形式
    let newSaleAttrValue: SaleAttrValue = {
      baseSaleAttrId: Number(baseSaleAttrId),
      saleAttrValueName: saleAttrValue as string,
    }

    // 非法判断
    if ((saleAttrValue as string).trim() == '') {
      ElMessage.error('属性值不能为空')
      return
    }
    // 重复判断
    let isSame = row.spuSaleAttrValueList.some(item => {
      return item.saleAttrValueName == saleAttrValue
    })
    if (isSame) {
      ElMessage.error('属性值不能重复')
      return
    }

    // 追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    // 点击按钮input组件出来（编辑模式）
    row.flag = false
  }

  // 保存按钮的回调
  const save = async () => {
    // 整理参数
    // 1、照片墙
    spuParams.value.spuImageList = imgList.value.map((item: any) => {
      return {
        imgName: item.name,
        imgUrl: (item.response && item.response.data) || item.url,
      }
    })
    // 2、整理销售属性数据
    spuParams.value.spuSaleAttrList = saleAttr.value
    // 发请求
    const result = await reqAddOrUpdateSpu(spuParams.value)
    if (result.code == 200) {
      ElMessage.success(spuParams.value.id ? '更新成功' : '添加成功')
      $emit('changeScene', {flag: 0, params: spuParams.value.id?'update':'add'})
    } else {
      ElMessage.error(spuParams.value.id ? '更新失败' : '添加失败')
    }
  }

  // 添加一个新的SPU初始化请求方法
  const initAddSpu = async (c3Id: number) => {
    // 清空数据
    Object.assign(spuParams.value, {
      category3Id: "", // 收集三级分类的id
      spuName: "",  // 收集SPU名称
      description: "",  // 收集SPU描述
      tmId: "",  // 收集品牌的id
      spuImageList: [],  // 收集SPU的图片
      spuSaleAttrList: []
    })
    imgList.value = []
    saleAttr.value = []
    // 获取3级分类id
    spuParams.value.category3Id = c3Id
    // 获取全部品牌
    let result: AllTradeMark = await reqAllTrademark()
    // 获取全部销售属性
    let result1: HasSaleAttrResponseData = await reqAllSaleAttr()
    // 存储数据
    AllTradeMark.value = result.data
    allSaleAttr.value = result1.data

  }

  // 暴露给父组件
  defineExpose({
    initHasSpuData,
    initAddSpu
  })
</script>

<style scoped lang="scss"></style>
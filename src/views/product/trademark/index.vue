<template>
  <el-card>
    <!-- 卡片顶部按钮 -->
    <el-button type="primary" size="default" icon="plus" @click="addTrademark">添加品牌</el-button>
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
          <el-button type="primary" size="small" icon="Edit" @click="updateTrademark"></el-button>
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
    <el-pagination @current-change="changePageNo" @size-change="sizeChange" v-model:current-page="pageNo"
      v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total" :total="total" />
  </el-card>


  <!-- 对话框组件 -->
  <!-- v-model:控制对话框显示与隐藏  title:设置对话框左上角的标题 -->
  <el-dialog v-model="dialogVisible" title="添加品牌">
    <el-form style="width: 80%;">
      <el-form-item label="品牌名称" label-width="80px">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌logo" label-width="80px">
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :headers="headers"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 具名插槽:footer -->
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { reqHasTrademark } from '@/api/product/trademark';
  import type { Records, TradeMark } from '@/api/product/trademark/type';
  import { onMounted, ref } from 'vue';

  // 引入用户相关的仓库
  import useUserStore from '@/store/modules/user'
  import { ElMessage, type UploadProps } from 'element-plus';
  // 获取用户相关的小仓库：获取仓库内部token，登录成功以后携带给服务器
  const userStore = useUserStore()
  const headers = { Token: userStore.token }

  // 当前页码
  let pageNo = ref<number>(1)
  // 每一页展示多少条数据
  let limit = ref<number>(3)
  // 存储已有品牌数据总数
  let total = ref<number>(0)
  // 存储已有品牌的数据
  let trademarkArr = ref<Records>([])
  // 对话框的显示与隐藏
  let dialogVisible = ref<boolean>(false)
  // 定义收集新增品牌数据
  let trademarkParams = ref<TradeMark>({
    tmName: '',
    logoUrl: ''
  })
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

  // 添加品牌按钮的回调
  const addTrademark = () => {
    dialogVisible.value = true
  }

  // 修改品牌按钮的回调
  const updateTrademark = () => {
    dialogVisible.value = true
  }

  // 对话框底部取消按钮
  const cancel = () => {
    // 对话框隐藏
    dialogVisible.value = false
  }

  const confirm = () => {
    // 对话框隐藏
    dialogVisible.value = false
  }

  // 上传图片钩子
  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // 要求:文件格式png|jpg|gif <4M
    if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
      if (rawFile.size / 1024 / 1024 < 4) {
        return true
      } else {
        ElMessage({
        type: 'error',
        message: ' 上传的文件大小应小于4M '
      })
      return false
      }
    } else {
      ElMessage({
        type: 'error',
        message: ' 上传的文件格式务必PNG|JPG|GIF '
      })
      return false
    }
  }
  // 图片上传成功的钩子
  const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    trademarkParams.value.logoUrl = response.data
  }
</script>

<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>
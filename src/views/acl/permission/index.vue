<template>
  <el-table :data="PermisstionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{ row }">
        <el-button type="primary" @click="addPermisstion(row)" size="small" :disabled="row.level == 4 ? true : false">{{
          row.level == 3 ? '添加功能' :
            '添加菜单'
        }}</el-button>
        <el-button @click="updatePermisstion(row)" type="primary" size="small"
          :disabled="row.level == 1 ? true : false">编辑</el-button>
        <el-popconfirm :title="`确定删除${row.name}吗？`" width="260px" @confirm="removeMenu(row.id)">
          <template #reference>
            <el-button type="danger" size="small" :disabled="row.level == 1 ? true : false">删除</el-button>
          </template>
        </el-popconfirm>

      </template>
    </el-table-column>
  </el-table>
  <!-- 对话框组件 -->
  <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'">
    <!-- 表单组件 -->
    <el-form>
      <el-form-item label="名称">
        <el-input v-model="menuData.name" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input v-model="menuData.code" placeholder="请输入权限数值"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { reqAddOrUpdateMenu, reqAllPermisstion, reqDeleteMenu } from '@/api/acl/menu';
  import type { MenuParams, Permisstion, PermisstionList } from '@/api/acl/menu/type';
  import { ElMessage } from 'element-plus';
  import { onMounted, ref } from 'vue';

  // 菜单的数据
  const PermisstionArr = ref<PermisstionList>([])
  // 对话框现实与隐藏
  let dialogVisible = ref<boolean>(false)
  // 携带参数
  let menuData = ref<MenuParams>({
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })

  // 获取菜单的数据
  const getHasPermisstion = async () => {
    const res = await reqAllPermisstion()
    // console.log(res);
    if (res.code === 200) {
      PermisstionArr.value = res.data
    }
  }

  // 添加菜单按钮回调
  const addPermisstion = (row: Permisstion) => {
    // 清空数据
    Object.assign(menuData.value, {
      code: '',
      level: 0,
      name: '',
      pid: 0,
    })
    dialogVisible.value = true
    menuData.value.level = row.level + 1
    menuData.value.pid = row.id as number
  }

  // 编辑按钮回调
  const updatePermisstion = (row: Permisstion) => {
    dialogVisible.value = true
    // 赋值
    Object.assign(menuData.value, row)
  }

  // 确定按钮的回调
  const save = async () => {
    const result = await reqAddOrUpdateMenu(menuData.value)
    if (result.code === 200) {
      dialogVisible.value = false
      ElMessage.success(menuData.value.id ? '更新成功' : '添加成功')
      getHasPermisstion()
    }
  }

  // 删除按钮的回调
  const removeMenu = async (id: number) => {
    const result = await reqDeleteMenu(id)
    if (result.code === 200) {
      ElMessage.success('删除成功')
      getHasPermisstion()
    }
  }

  // 组件挂载完毕
  onMounted(() => {
    getHasPermisstion()
  })

</script>

<style scoped lang="scss"></style>
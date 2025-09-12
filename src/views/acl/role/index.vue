<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请你输入搜索职位关键字" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" :disabled="keyword.trim() == ''">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin: 10px 0;">
    <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
    <el-table border style="margin: 10px 0;" :data="allRole">
      <el-table-column type="index" align="center" label="#" />
      <el-table-column label="id" align="center" show-overflow-tooltip prop="id" />
      <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip />
      <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip />
      <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip />
      <el-table-column label="操作" width="280px" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" icon="User" @click="setPermisstion(row)">分配权限</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
          <el-popconfirm :title="`你确定删除${row.roleName}吗？`" width="260px" @confirm="removeRole(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
      @current-change="getHasRole" @size-change="sizeChange" />
  </el-card>
  <!-- 添加或更新已有职位 -->
  <el-dialog v-model="dialogVisible" :title="RoleParams.id ? '更新职位' : '添加职位'">
    <el-form :model="RoleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请输入职位名称" v-model="RoleParams.roleName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-dialog>
  <!-- 抽屉组件，分配权限 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <!-- 树形控件 -->
      <el-tree ref="tree" style="max-width: 600px" :data="menuArr" show-checkbox node-key="id" default-expand-all
        :default-checked-keys="selectArr" :props="defaultProps" />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handler">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@/api/acl/role';
  import type { MenuList, Records, RoleData } from '@/api/acl/role/type';
  import { ElMessage } from 'element-plus';
  import { nextTick, onMounted, ref } from 'vue';

  // 分页器
  let pageNo = ref(1)
  let pageSize = ref(10)
  // 搜索角色关键字
  let keyword = ref<string>('')
  // 存储已有的职位
  let allRole = ref<Records>([])
  // 职位总个数
  let total = ref(0)
  // 对话框是否显示
  let dialogVisible = ref(false)
  // 收集新增岗位数据
  let RoleParams = ref<RoleData>({
    roleName: ''
  })
  // 获取表单实例
  let form = ref()
  // 控制抽屉现实与隐藏
  let drawer = ref(false)
  // 存储用户权限的数组
  let menuArr = ref<MenuList>([])
  // 准备数组存储勾选的节点的id
  let selectArr = ref<number[]>([])
  // 获取树形节点实例
  const tree = ref<any>()

  // 获取职位请求
  const getHasRole = async (pager = 1) => {
    // 修改页码
    pageNo.value = pager
    const result = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
    // console.log(result)
    if (result.code === 200) {
      allRole.value = result.data.records
      total.value = result.data.total
    }
  }

  // 分页器下拉菜单改变的回调
  const sizeChange = () => {
    getHasRole()
  }

  // 搜索按钮回调
  const search = () => {
    getHasRole()
    keyword.value = ''
  }

  // 重置按钮回调
  const reset = () => {
    keyword.value = ''
    getHasRole()
  }

  // 添加职位按钮回调
  const addRole = () => {
    // 对话框显示
    dialogVisible.value = true
    // 清空数据
    RoleParams.value = {
      roleName: '',
      id: 0
    }
    // 清空校验
    nextTick(() => {
      form.value.resetFields()
    })
  }

  // 更新已有职位
  const updateRole = (row: RoleData) => {
    dialogVisible.value = true
    // 赋值
    RoleParams.value = row
    // 清空校验
    nextTick(() => {
      form.value.resetFields()
    })
  }

  // 自定义校验规则
  const validatorRoleName = (_rule: any, value: string, callback: any) => {
    if (value.trim().length < 3) {
      callback(new Error('请输入3个字符以上'))
    } else {
      callback()
    }
  }

  // 职位相关校验规则
  const rules = {
    roleName: [
      { required: true, trigger: 'blur', validator: validatorRoleName }
    ]
  }

  // 确定添加职位的回调
  const save = async () => {
    // 表单校验
    await form.value.validate()
    // 添加|更新职位
    const result = await reqAddOrUpdateRole(RoleParams.value)
    if (result.code === 200) {
      ElMessage.success(RoleParams.value.id ? '修改成功' : '添加成功')
      // 关闭对话框
      dialogVisible.value = false
      // 刷新职位列表
      getHasRole(RoleParams.value.id ? pageNo.value : 1)
    }
  }

  // 分配权限按钮回调
  const setPermisstion = async (row: RoleData) => {
    drawer.value = true
    // 收集当前要分类权限的数据
    Object.assign(RoleParams.value, row)
    // 根据职位获取权限的数据
    const result = await reqAllMenuList(RoleParams.value.id as number)
    if (result.code == 200) {
      menuArr.value = result.data
      selectArr.value = filiterSelectArr(menuArr.value, [])
    }
  }
  const filiterSelectArr = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
      if (item.select && !item.children) {
        initArr.push(item.id)
      }
      if (item.children && item.children.length > 0) {
        filiterSelectArr(item.children, initArr)
      }
    })

    return initArr
  }

  // 树形控件测试
  const defaultProps = {
    children: 'children',
    label: 'name',
  }

  // 抽屉确定按钮的回调
  const handler = async () => {
    // 职位的iD
    const roleId = RoleParams.value.id
    // 选中节点的ID
    let arr = tree.value.getCheckedKeys()
    // 半选的id
    let arr1 = tree.value.getHalfCheckedKeys()
    let permissionId = arr.concat(arr1)
    // 下发权限
    const result = await reqSetPermission(roleId as number, permissionId)
    if (result.code === 200) {
      ElMessage.success('权限分配成功')
      // 关闭抽屉
      drawer.value = false
      // 刷新页面
      // getHasRole()
      window.location.reload()
    }
  }

  // 删除已有的职位
  const removeRole = async (id: number) => {
    const result = await reqRemoveRole(id)
    if (result.code === 200) {
      ElMessage.success('删除成功')
      getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }
  }

  // 组件挂载完毕
  onMounted(() => {
    // 获取职位请求
    getHasRole()
  })

</script>

<style scoped lang="scss">
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
</style>
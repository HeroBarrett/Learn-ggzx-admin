<template>
  <el-card style="height: 80px;">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名">
        <el-input placeholder="请输入搜索的用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="keyword == ''" @click="search">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button type="primary" :disabled="selectIdArr.length == 0" @click="deleteSelectUser">批量删除</el-button>
    <!-- 展示用户信息 -->
    <el-table @selection-change="selectChange" style="margin: 10px 0;" border :data="userArr">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="用户名字" align="center" prop="username" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="用户名称" align="center" prop="name" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="用户角色" align="center" prop="roleName" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
          <el-popconfirm :title="`你确定要删除${row.username}吗?`" width="260px" @confirm="deleteUser(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
      :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
      @current-change="getHasUser" @size-change="handler" />
  </el-card>
  <!-- 抽屉：新增和修改角色 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form ref="formRef" :model="userParams" :rules="rules">
        <el-form-item label="用户姓名" prop="username">
          <el-input placeholder="请输入用户名" v-model="userParams.username" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input placeholder="请输入用户昵称" v-model="userParams.name" />
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="userParams.id == 0">
          <el-input placeholder="请输入用户密码" v-model="userParams.password" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-drawer>
  <!-- 抽屉：用户角色分配 -->
  <el-drawer v-model="drawer2">
    <template #header>
      <h4>分配角色(职位)</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="userParams.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox @change="handleCheckAllChange" v-model="checkAll" :indeterminate="isIndeterminate">
            全选
          </el-checkbox>
          <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role" :value="role">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="drawer2 = false">取消</el-button>
      <el-button type="primary" @click="confirmClick">确定</el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { reqAddOrUpdateUser, reqAllRole, reqRemoveAllUser, reqRemoveUser, reqSetUserRole, reqUserInfo } from '@/api/acl/user';
  import type { AllRole, Records, SetRoleData, User } from '@/api/acl/user/type';
  import { ElMessage } from 'element-plus';
  import { nextTick, onMounted, ref } from 'vue';
  // 默认页码
  let pageNo = ref(1)
  // 一页展示几条数据
  let pageSize = ref(5)
  // 用户总个数
  let total = ref(0)
  // 存储全部用户数据
  let userArr = ref<Records>([])
  // 抽屉的显示与隐藏
  let drawer = ref(false)
  // 抽屉2的显示与隐藏
  let drawer2 = ref(false)
  // 收集用户信息
  let userParams = ref<User>({
    username: '',
    password: '',
    name: '',
  })
  // 获取form组件实例
  let formRef = ref()
  // 存储全部职位
  let allRole = ref<AllRole>([])
  // 当前用户已有职位
  let userRole = ref<any>([])
  // 批量删除的数组
  let selectIdArr = ref<number[]>([])
  // 定义响应式数据-手机用户输入的关键字
  let keyword = ref('')


  // 获取全部用户信息
  const getHasUser = async (pager = 1) => {
    // 收集当前页码
    pageNo.value = pager
    const result = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
    // console.log(result);
    if (result.code == 200) {
      total.value = result.data.total
      userArr.value = result.data.records
    }
  }

  // 分页器下拉菜单自定义事件
  const handler = () => {
    getHasUser()
  }

  // 添加用户按钮的回调
  const addUser = () => {
    // 抽屉显示出来
    drawer.value = true
    // 清空数据
    Object.assign(userParams.value, {
      id: 0,
      username: '',
      password: '',
      name: '',
    })
    nextTick(() => {
      formRef.value.resetFields()
    })
  }

  // 更新用户按钮的回调
  const updateUser = (row: User) => {
    // 抽屉显示出来
    drawer.value = true
    // 存储已有的账号信息
    Object.assign(userParams.value, row)
  }

  // 保存按钮的回调
  const save = async () => {
    // 校验表单数据
    await formRef.value.validate()
    const result = await reqAddOrUpdateUser(userParams.value)
    if (result.code == 200) {
      // 1. 提示用户操作成功
      ElMessage.success(userParams.value.id ? '更新成功' : '添加成功')
      // 2. 关闭抽屉
      drawer.value = false
      // 3. 刷新用户列表
      getHasUser(userParams.value.id ? pageNo.value : 1)
      // 浏览器自动刷新一次
      window.location.reload()
    } else {
      ElMessage.error(userParams.value.id ? '更新失败' : '添加失败')
    }
  }

  // 取消按钮的回调
  const cancel = () => {
    // 1. 关闭抽屉
    drawer.value = false
  }

  // 校验用户名字的回调
  const validatorUserName = (_rule: any, value: string, callback: any) => {
    if (value.trim().length < 5) {
      callback(new Error('用户名长度不能小于5位'))
    } else {
      callback()
    }
  }

  // 校验用户昵称的回调
  const validatorName = (_rule: any, value: string, callback: any) => {
    if (value.trim().length < 5) {
      callback(new Error('用户昵称长度不能小于5位'))
    } else {
      callback()
    }
  }

  // 校验用户密码的回调
  const validatorPassword = (_rule: any, value: string, callback: any) => {
    if (value.trim().length < 6) {
      callback(new Error('用户密码长度不能小于6位'))
    } else {
      callback()
    }
  }

  // 表单校验规则对象
  const rules = {
    // 用户名字
    username: [
      { required: true, trigger: 'blur', validator: validatorUserName },
    ],
    // 用户昵称
    name: [
      { required: true, trigger: 'blur', validator: validatorName },
    ],
    // 用户密码
    password: [
      { required: true, trigger: 'blur', validator: validatorPassword },
    ]
  }

  // 分配角色按钮的回调
  const setRole = async (row: User) => {

    // 存储已有的用户信息
    Object.assign(userParams.value, row)
    // 发请求获取数据
    const result = await reqAllRole(userParams.value.id as number)
    // console.log(result);
    if (result.code == 200) {
      // 存储全部职位
      allRole.value = result.data.allRolesList
      // 存储当前用户已有职位
      userRole.value = result.data.assignRoles
      // 显示抽屉
      drawer2.value = true
    }

  }


  // 收集顶部复选框全选数据
  const checkAll = ref(false)
  // 顶部全选复选框半选
  const isIndeterminate = ref(true)
  // 顶部的全部复选框的change事件
  const handleCheckAllChange = (val: any) => {
    userRole.value = val ? allRole.value : []
    isIndeterminate.value = false
  }
  // 底部复选框change事件
  const handleCheckedCitiesChange = (val: any) => {
    checkAll.value = val.length == allRole.value.length
    isIndeterminate.value = val.length != allRole.value.length
  }
  // 确定按钮的回调
  const confirmClick = async () => {
    // 收集参数
    let data: SetRoleData = {
      userId: userParams.value.id as number,
      // @ts-expect-error asd
      roleIdList: userRole.value.map(item => item.id) as number[]
    }
    // 发送请求
    const result = await reqSetUserRole(data)
    if (result.code == 200) {
      ElMessage.success('分配成功')
      // 关闭抽屉
      drawer2.value = false
      // 刷新用户列表
      getHasUser(pageNo.value)
    }
  }

  // 删除某一个用户
  const deleteUser = async (id: number) => {
    // 发送请求
    const result = await reqRemoveUser(id)
    if (result.code == 200) {
      ElMessage.success('删除成功')
      // 刷新用户列表
      getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }
  }

  // 复选框勾选
  const selectChange = (value: any) => {
    selectIdArr.value = value.map((item: User) => item.id)
  }

  // 批量删除
  const deleteSelectUser = async () => {
    // 发送请求
    const result = await reqRemoveAllUser(selectIdArr.value)
    if (result.code == 200) {
      ElMessage.success('删除成功')
      // 刷新用户列表
      getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }
  }

  // 搜索按钮回调
  const search = () => {
    // 获取相应数据
    getHasUser()
    keyword.value = ''
  }

  // 重置按钮回调
  const reset = () => {
    keyword.value = ''
    getHasUser()
  }

  // 组件挂载完毕
  onMounted(() => {
    getHasUser()
    keyword.value = ''
  })
</script>

<style scoped lang="scss">
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
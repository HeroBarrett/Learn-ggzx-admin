<template>
  <div>
    <Category :scene="scene"></Category>

    <el-card style="margin: 10px 0">
      <div v-show="scene == 0">
        <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id"
          @click="addAttr">添加属性</el-button>
        <el-table border style="margin: 10px 0;" :data="attrList">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 5px">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">

            <template #default="{ row }">
              <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`你确定删除${row.attrName}吗？`" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加与修改属性的结构 -->
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button :disabled="!attrParams.attrName" type="primary" size="default" icon="Plus"
          @click="addAttrValue">添加属性值</el-button>
        <el-button type="info" size="default" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" @blur="toLook(row, $index)"
                placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ $index }">
              <el-button type="primary" size="small" icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save"
          :disabled="attrParams.attrValueList.length == 0">保存</el-button>
        <el-button type="info" size="default">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>

  import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr';
  import type { Attr, AttrList, AttrValue } from '@/api/product/attr/type';
  import useCategoryStore from '@/store/modules/category';
  import { ElMessage } from 'element-plus';
  import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
  // 获取分类相关仓库
  let categoryStore = useCategoryStore()
  // 存储已有的属性与属性值
  let attrList = ref<AttrList>([])
  // 定义card组件内容变化
  let scene = ref(0)  // scene=0显示table scene=1展示添加与修改结构
  // 收集新增属性的数据
  let attrParams = ref<Attr>({
    attrName: '', // 新增的属性名字
    attrValueList: [],  // 新增的属性值数组
    categoryId: 0, // 三级分类id
    categoryLevel: 3, // 新增属性的分类等级
  })
  // 准备一个空数组将来存储对应的组件实例el-input
  let inputArr = ref<(InstanceType<typeof import('element-plus')['ElInput']> | null)[]>([])

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

  // 添加属性按钮的回调
  const addAttr = () => {
    // 先清空数据
    Object.assign(attrParams.value, {
      attrName: '', // 新增的属性名字
      attrValueList: [],  // 新增的属性值数组
      categoryId: categoryStore.c3Id, // 收集新增的三级分类id
      categoryLevel: 3, // 新增属性的分类等级
    })
    scene.value = 1
  }

  // 更新属性按钮的回调
  const updateAttr = (row: Attr) => {
    scene.value = 1
    // 将已有的属性对象赋值给attrParams对象
    // 会有浅拷贝问题
    // Object.assign(attrParams.value, row)
    // 深拷贝
    attrParams.value = JSON.parse(JSON.stringify(row))
  }

  // 取消按钮的回调
  const cancel = () => {
    scene.value = 0
  }

  // 添加属性值
  const addAttrValue = () => {
    // 向数组添加一个属性值对象
    attrParams.value.attrValueList.push({
      valueName: '',
      flag: true // 控制每一个属性值编辑模式与切换模式的切换
    })
    // 聚焦el-input
    nextTick(() => {
      inputArr.value[attrParams.value.attrValueList.length - 1]!.focus()
    })
  }

  // 保存
  const save = async () => {
    // 发送请求
    const result = await reqAddOrUpdateAttr(attrParams.value)
    if (result.code == 200) {
      ElMessage({
        message: attrParams.value.id ? '修改成攻' : '添加成功',
        type: 'success'
      })
      scene.value = 0
      // 刷新
      getAttr()

    } else {
      ElMessage({
        message: attrParams.value.id ? '修改失败' : '添加失败',
        type: 'error'
      })
    }
  }

  // 表单失去焦点展示div
  const toLook = (row: AttrValue, $index: number) => {
    // 非法情况1：空值
    if (row.valueName.trim() == '') {
      attrParams.value.attrValueList.splice($index, 1)
      ElMessage({
        message: '属性值不能为空',
        type: 'error'
      })
      return
    }
    // 非法情况2：重复值
    let repeat = attrParams.value.attrValueList.find(item => {
      if (item != row) {
        return item.valueName === row.valueName
      }
    })
    if (repeat) {
      // 将重复的属性值从数组中干掉
      attrParams.value.attrValueList.splice($index, 1)
      ElMessage({
        message: '属性值不能重复',
        type: 'error'
      })
      return
    }
    row.flag = false
  }

  // 属性值div点击事件
  const toEdit = (row: AttrValue, $index: number) => {
    row.flag! = true;

    // 调用组件实例的方法
    // nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
    nextTick(() => {
      inputArr.value[$index]!.focus()
    })
  }

  // 删除某一个已有的属性方法回调
  const deleteAttr = async (attrId: number) => {
    // 发送请求
    const result = await reqRemoveAttr(attrId)
    if (result.code == 200) {
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      // 刷新
      getAttr()
    } else {
      ElMessage({
        message: '删除失败',
        type: 'error'
      })
    }
  }

  // 路由组件切换的时候销毁仓库数据
  onBeforeUnmount(() => {
    categoryStore.$reset()
  })

</script>

<style scoped lang="scss"></style>
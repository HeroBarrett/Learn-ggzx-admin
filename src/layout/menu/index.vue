<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRoute">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有子路由但是只有一个 -->
      <el-menu-item v-if="item.children && item.children.length == 1 && !item.children[0].meta.hidden"
        :index="item.children[0].path">
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有子路由且个数大于一个 -->
      <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts" setup>
  // 获取父组件传过来的全部路由数据
  defineProps(['menuList'])

  // 点击菜单回调
  const goRoute = (vc: any) => {
    console.log(vc.index);

  }

</script>

<script lang="ts">
  export default {
    name: 'Menu'
  }
</script>

<style scoped lang="scss">
  h1 {
    color: white;
  }
</style>
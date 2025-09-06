<template>
  <div class="layout_container">
    <!-- <h1>一级路由组件</h1> -->
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: LayoutSettingStore.fold ? true : false }">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollBar">
        <!-- 菜单组件 -->
        <el-menu :collapse="LayoutSettingStore.fold" background-color="#001529" text-color="white" :default-active="$router.path" >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航栏 -->
    <div class="layout_tabbar" :class="{ fold: LayoutSettingStore.fold ? true : false }">
      <!-- layout组件顶部tabbar -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{ fold: LayoutSettingStore.fold ? true : false }">
      <Main></Main>
    </div>


  </div>
</template>

<script lang="ts" setup>
  import useUserStore from '@/store/modules/user';
  import Logo from './logo/index.vue'
  import Menu from './menu/index.vue'
  import Main from './main/index.vue'
  import { useRoute } from 'vue-router';
  import Tabbar from './tabbar/index.vue'
  import useLayoutSettingStore from '@/store/modules/setting';

  // 获取用户相关的小仓库
  let userStore = useUserStore()

  // 获取路由对象
  let $router = useRoute()
  // console.log($router);

  // 获取layout配置仓库
  const LayoutSettingStore = useLayoutSettingStore()

</script>

<script lang="ts">
  export default {
    name: 'layout'
  }
</script>

<style scoped lang="scss">
  .layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
      width: $base-menu-width;
      height: 100vh;
      background: $base-menu-background;
      color: white;
      transition: all 0.3s;

      &.fold {
        width: $base-menu-min-width;
      }

      .scrollBar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);
        --el-menu-bg-color: $base-menu-background;
        --el-menu-text-color: white;
        // --el-menu-hover-bg-color: #002347;
        --el-menu-active-color: pink;

        .el-menu {
          border-right: none;
        }
      }
    }

    .layout_tabbar {
      position: fixed;
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
      top: 0;
      left: $base-menu-width;
      transition: all 0.3s;

      &.fold {
        width: calc(100vw  - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }

    .layout_main {
      position: absolute;
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      left: $base-menu-width;
      top: $base-tabbar-height;
      padding: 20px;
      overflow: auto;
      transition: all 0.3s;

      &.fold {
        width: calc(100vw  - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }
  }
</style>
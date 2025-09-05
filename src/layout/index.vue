<template>
  <div class="layout_container">
    <!-- <h1>一级路由组件</h1> -->
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollBar">
        <!-- 菜单组件 -->
        <el-menu>
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航栏 -->
    <div class="layout_tabbar">456</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <Main></Main>
    </div>


  </div>
</template>

<script lang="ts" setup>
  import useUserStore from '@/store/modules/user';
  import Logo from './logo/index.vue'
  import Menu from './menu/index.vue'
  import Main from './main/index.vue'
  
  // 获取用户相关的小仓库
  let userStore = useUserStore()

  
</script>

<style scoped lang="scss">
  .layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
      width: $base-menu-width;
      height: 100vh;
      background: $base-menu-background;

      .scrollBar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);
        --el-menu-bg-color: $base-menu-background;
        --el-menu-text-color: white;
        --el-menu-hover-bg-color: #002347;

        .el-menu {
          border-right: none;
        }
      }
    }

    .layout_tabbar {
      position: fixed;
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
      background: cyan;
      top: 0;
      left: $base-menu-width;
    }

    .layout_main {
      position: absolute;
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      background: yellowgreen;
      left: $base-menu-width;
      top: $base-tabbar-height;
      padding: 20px;
      overflow: auto;
    }
  }
</style>
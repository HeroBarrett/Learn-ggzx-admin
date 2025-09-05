<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <!-- 顶部左侧静态 -->
      <el-icon style="margin-right: 10px;" @click="changeIcon" class="icon">
        <component :is="LayoutSettingStore.fold ? 'Expand' : 'Fold'">

        </component>
      </el-icon>
      <!-- 左侧面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <el-button size="small" icon="Refresh" circle></el-button>
      <el-button size="small" icon="FullScreen" circle></el-button>
      <el-button size="small" icon="Setting" circle></el-button>
      <img src="../../../public/logo.png" style="width: 24px;height: 24px; margin: 0 10px;">
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useLayoutSettingStore from '@/store/modules/setting';


  // 图标切换
  const LayoutSettingStore = useLayoutSettingStore()
  const changeIcon = () => {
    LayoutSettingStore.fold = !LayoutSettingStore.fold
  }


</script>

<style scoped lang="scss">
  .tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(to right, #ffabea, #ffbdee, #ffe9fa);

    .tabbar_left {
      display: flex;
      // background-color: aqua;
      align-items: center;
      margin-left: 20px;

      .icon:hover {
        cursor: pointer;
      }
    }

    .tabbar_right {
      display: flex;
      align-items: center;
    }
  }
</style>
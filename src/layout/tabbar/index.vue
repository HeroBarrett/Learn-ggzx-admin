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
        <!-- 动态展示路由名字与标题 -->
        <!-- -使用v-show，因为有优先级问题 -->
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
          :to="item.path">
          <el-icon style="margin: 0px 2px;vertical-align: bottom;">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <!-- 面包屑标题 -->
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
      <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-button size="small" icon="Setting" circle></el-button>
      <img :src="userStore.avatar" style="width: 24px;height: 24px; margin: 0 12px; border-radius: 50%;">
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useLayoutSettingStore from '@/store/modules/setting';
  import useUserStore from '@/store/modules/user';
  import { useRoute, useRouter } from 'vue-router';
  let userStore = useUserStore()
  // console.log(userStore.avatar);

  // 图标切换
  const LayoutSettingStore = useLayoutSettingStore()
  const changeIcon = () => {
    LayoutSettingStore.fold = !LayoutSettingStore.fold
  }

  // 获取路由对象
  let $route = useRoute()
  let $router = useRouter()
  // console.log($route.matched);

  // 刷新
  const updateRefsh = () => {
    LayoutSettingStore.refsh = !LayoutSettingStore.refsh
  }

  // 全屏按钮点击的回调
  const fullScreen = () => {
    // 判断是不是全屏模式
    let full = document.fullscreenElement
    if (!full) {
      // 文档根节点实现全屏模式
      document.documentElement.requestFullscreen()
    } else {
      // 退出全屏模式
      document.exitFullscreen();
    }
  }

  // 退出登录
  const logout = async () => {
    // 1、发退出登录请求
    // 2、仓库中关于用户相关的数据清空【token|username|avatar】
    await userStore.userLogout()
    // 3、跳转到登录页面
    $router.push({ path: '/login', query: { redirect: $route.path } })
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
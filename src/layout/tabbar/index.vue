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
      <el-popover title="主题设置" placement="bottom" :width="300" trigger="click">
        <!-- 表单元素 -->
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker :teleported="false" @change="setColor" size="small" v-model="color" show-alpha
              :predefine="predefineColors" />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch @change="changeDark" v-model="dark" size="default" active-icon="MoonNight" inline-prompt
              inactive-icon="Sunny" />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button size="small" icon="Setting" circle></el-button>
        </template>
      </el-popover>
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
  import { ref } from 'vue';
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

  // 收集开关的数据
  let dark = ref(false)

  // 退出登录
  const logout = async () => {
    // 1、发退出登录请求
    // 2、仓库中关于用户相关的数据清空【token|username|avatar】
    await userStore.userLogout()
    // 3、跳转到登录页面
    $router.push({ path: '/login', query: { redirect: $route.path } })
  }

  // 颜色组件数据
  const color = ref('rgba(255, 69, 0, 0.68)')
  const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
  ])

  // switch开关的change事件
  const changeDark = () => {
    // 获取根节点
    let html = document.documentElement
    // 判断html标签是否有类名dark
    if (dark.value) {
      html.className = 'dark';
    } else {
      html.className = '';
    }
  }

  // 主题颜色设置
  const setColor = () => {
    // 通知js修改根节点的样式对象与属性值
    const html = document.documentElement
    html.style.setProperty('--el-color-primary', color.value)
  }
</script>

<style scoped lang="scss">
  .tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // background-image: linear-gradient(to right, #ffabea, #ffbdee, #ffe9fa);

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
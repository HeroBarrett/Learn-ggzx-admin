<template>
  <div class="login_cotainer">
    <el-row>
      <el-col :span="12" :xs="0">占位的文字</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script lang="ts" setup>
  import useUserStore from '@/store/modules/user';
  import { User, Lock } from '@element-plus/icons-vue'
  import { ElNotification } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  // 用户相关的仓库
  let userStore = useUserStore()
  // 收集账号与密码数据
  let loginForm = reactive({ username: '', password: '' })
  // 获取路由器
  let $router = useRouter()
  // 控制按钮加载
  let loading = ref(false)
  // 登录按钮回调
  const login = async () => {
    // 开始加载
    loading.value = true
    // 点击登录按钮
    // 1、通知仓库发送登录请求
    // 2、请求成功->跳转首页
    // 3、请求失败->弹出登录失败信息
    try {
      // 可以书写.then
      // 在仓库内部做了发送请求
      await userStore.userLogin(loginForm)
      // 登录成功加载效果消失
      loading.value = false
      // 编程式导航跳转到展示数据页
      $router.push('/')
      ElNotification({
        type: 'success',
        message: '登录成功'
      })
    } catch (error) {
      // 登录失败加载效果消失
      loading.value = false
      // 登录失败的提示信息
      ElNotification({
        type: 'error',
        message: (error as Error).message
      })
    }
  }
</script>

<style scoped lang="scss">
  .login_cotainer {
    width: 100%;
    height: 100vh;
    // background-color: red;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;


    .login_form {
      position: relative;
      width: 80%;
      top: 30vh;
      background: url("@/assets/images/login_form.png") no-repeat;
      background-size: cover;
      padding: 40px;

      h1 {
        color: white;
        font-size: 40px;
      }

      h2 {
        font-size: 20px;
        color: white;
        margin: 20px 0px;
      }

      .login_btn {
        width: 100%;
      }
    }
  }

</style>
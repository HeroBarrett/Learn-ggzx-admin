<template>
  <div class="login_cotainer">
    <el-row>
      <el-col :span="12" :xs="0">占位的文字</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
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
  import { getTime } from '@/utils/time';
  import { User, Lock } from '@element-plus/icons-vue'
  import { ElNotification } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  // 用户相关的仓库
  let userStore = useUserStore()
  // 收集账号与密码数据
  let loginForm = reactive({ username: 'admin', password: '111111' })
  // 获取路由器
  let $router = useRouter()
  // 获取路由对象
  let $route = useRoute()
  // 获取el-form组件
  let loginForms = ref()
  // 控制按钮加载
  let loading = ref(false)
  // 登录按钮回调
  const login = async () => {
    // 保证全部表单校验通过再发请求
    // console.log(loginForms.value);
    await loginForms.value.validate()

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
      // 判断登陆的时候，路由路径当中是否有query参数，如果有就往query参数跳转，没有就首页
      let redirect: any = $route.query.redirect
      $router.push({ path: redirect || '/' })

      ElNotification({
        type: 'success',
        message: '欢迎回来',
        title: `HI,${getTime()}好`
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

  // 自定义校验规则函数
  const validatorUserName = (_rule: any, value: any, callback: any) => {
    // rule: 校验规则对象
    // value: 文本的内容
    // callback函数放行
    // console.log(123);
    if (value.length >= 5) {
      callback()
    } else {
      callback(new Error('账号长度至少五位'))
    }
  }
  const validatorPassword = (_rule: any, value: any, callback: any) => {

    if (value.length >= 6) {
      callback()
    } else {
      callback(new Error('密码长度至少六位'))
    }
  }

  // 表单校验
  const rules = {
    username: [
      // required: 务必校验
      // min: 文本的长度最小几位
      // max: 文本的长度最多几位
      // message: 提示信息
      // trigger: 出发表单验证时机 change->文本发生变化 blur->失去焦点
      // { required: true, message: '用户名不能为空', trigger: 'blur' },
      // { required: true, min: 5, max: 10, message: '账号长度至少五位', trigger: 'change' }
      { trigger: 'change', validator: validatorUserName }
    ],
    password: [
      // { required: true, min: 6, max: 15, message: '密码的长度最少6位', trigger: 'change' }
      { trigger: 'change', validator: validatorPassword }
    ]
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
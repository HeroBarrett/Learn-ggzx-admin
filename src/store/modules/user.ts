// 创建用户相关仓库
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { defineStore } from 'pinia'
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
// 引入路由(常量路由)
import { constantRoute } from '@/router/routers'
import type { loginFormData } from '@/api/user/type'
// 创建小仓库
let useUserStore = defineStore('User', {
  // 存储数据的地方
  state: (): UserState => {
    return {
      // token: localStorage.getItem('TOKEN'), // 用户的唯一标识
      token: GET_TOKEN(), // 用户的唯一标识
      menuRoutes: constantRoute, // 仓库存储生成菜单需要的路由
      username: '',
      avatar: '',
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginFormData) {
      // 登录的方法
      const result = await reqLogin(data)
      // console.log(result);

      if (result.code == 200) {
        // 登录成功 -> token
        this.token = result.data as string
        // 持久化存储
        // localStorage.setItem('TOKEN', result.data.token as string)
        SET_TOKEN(result.data as string)
        // 保证async函数返回一个成功的promise
        return 'ok'
      } else {
        // 登录失败 -> 错误信息
        return Promise.reject(new Error(result.data))
      }
    },

    // 获取用户信息方法
    async userInfo() {
      let result = await reqUserInfo()
      // console.log(result)
      // 获取成功，存储信息
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 退出登录
    async userLogout() {
      // 发请求去除TOKEN
      let result = await reqLogout()
      if (result.code == 200) {
        // 退出登录成功
        // 清除仓库里存储的数据
        this.token = ''
        this.username = ''
        this.avatar = ''
        // 清除本地存储的TOKEN
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

// 对外暴露获取小仓库方法
export default useUserStore

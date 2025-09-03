// 创建用户相关仓库
import { reqLogin } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'

// 创建小仓库
let useUserStore = defineStore('User', {
  // 存储数据的地方
  state: (): UserState => {
    return {
      // token: localStorage.getItem('TOKEN'), // 用户的唯一标识
      token: GET_TOKEN()  // 用户的唯一标识
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      // console.log(data);

      // 登录的方法
      const result: loginResponseData = await reqLogin(data)

      if (result.code == 200) {
        // 登录成功 -> token
        this.token = result.data.token as string
        // 持久化存储
        // localStorage.setItem('TOKEN', result.data.token as string)
        SET_TOKEN(result.data.token as string)
        // 保证async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
      // 登录失败 -> 错误信息
    },
  },
  getters: {},
})

// 对外暴露获取小仓库方法
export default useUserStore

// 进行axios的二次封装使用请求与响应拦截器
import useUserStore from '@/store/modules/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 1、利用axios对象的create方法，创建axios实例(其他的配置：基础路径、超时的时间)
let request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上携带/api
  // 超时时间
  timeout: 5000,
})
// 2、给创建好的实例添加请求拦截器
request.interceptors.request.use((config) => {
  // 获取用户相关的小仓库：获取仓库内部的token
  let userStore = useUserStore()
  // config 有一个headers属性请求头，给服务器端携带公共参数
  // config.headers.token = '123'
  if(userStore.token) {
    config.headers.token = userStore.token
  }
  // 返回配置对象
  return config
})

// 3、响应拦截器
request.interceptors.response.use(
  // 成功的回调
  (response) => {
    // 简化数据
    // console.log('OK了老铁');
    return response.data
  },
  // 失败的回调:处理http网络错误
  (error) => {
    // 定义一个变量存储网络错误的信息
    let message = ''
    // http状态码
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    // 提示的错误信息
    ElMessage({
      type: 'error',
      message,
    })

    return Promise.reject(error)
  },
)

// 对外暴露
export default request

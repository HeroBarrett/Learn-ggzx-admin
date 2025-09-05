// 路由鉴权 项目中路由权限的设置
import router from './router'
import setting from './setting'
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner:false }) // 进度条右上角的加载圈圈

// 获取用户相关的小仓库内部token数据，判断是否登陆成功
import useUserStore from './store/modules/user'
import pinia from './store'
let userStore = useUserStore(pinia)

// 全局前置守卫:任意路由切换
router.beforeEach(async (to, from, next) => {
  document.title = setting.title+ '-' + to.meta.title
  // to: 你将要访问哪个路由
  // from: 你从哪来
  // next: 放行函数
  nprogress.start()
  // 获取token判断登录信息
  let token = userStore.token
  // 获取用户名字
  let username = userStore.username
  if (token) {
    // 用户已登录
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        // 有用户信息，放行
        next()
      } else {
        // 没用户信息，发请求
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // token过期
          // 退出登录
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})

// 实现进度条业务 -----progress
// 路由鉴权

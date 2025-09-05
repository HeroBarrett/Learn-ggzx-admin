// 路由鉴权 项目中路由权限的设置
import router from './router'
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
// 全局前置守卫:任意路由切换
router.beforeEach((to, from, next) => {
  // to: 你将要访问哪个路由
  // from: 你从哪来
  // next: 放行函数
  nprogress.start()
  next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})



// 实现进度条业务 -----progress
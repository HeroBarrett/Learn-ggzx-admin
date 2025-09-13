import { createApp } from 'vue'
import App from './App.vue'
// 引入 element-plus 插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入全局样式-清空默认样式等等
import '@/components/styles/index.scss'
// 配置element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// SVG插件需要的配置代码
// @ts-expect-error 忽略 SVG 注册插件类型检查，避免虚拟模块类型报错
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目全局组件
import gloalCompent from '@/components'
// 引入路由
import router from './router'
// 引入仓库
import pinia from './store'
// 暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'

// 获取应用实例对象
const app = createApp(App)
// 安装 element-plus 插件
app.use(ElementPlus, {
  // 配置element-plus国际化
  locale: zhCn,
})

// 安装自定义插件
app.use(gloalCompent)
// 安装仓库pinia
app.use(pinia)
// 注册模板路由
app.use(router)
// 引入路由鉴权
import './permisstion.ts'
// 将应用挂载到挂载点
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'

// 引入 element-plus 插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 获取应用实例对象
const app = createApp(App)

// 安装 element-plus 插件
// 配置element-plus国际化
app.use(ElementPlus, {
  locale: zhCn,
})
// SVG插件需要的配置代码
// @ts-ignore
import 'virtual:svg-icons-register'

// 将应用挂载到挂载点
app.mount('#app')

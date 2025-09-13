import pinia from "@/store"
import useUserStore from "@/store/modules/user"
const userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
  // 全局自定义指令：实现按钮的权限
  app.directive('has', {
    // 代表使用这个全局自定义指令的DOM|组件 挂载完毕的时候执行
    mounted(el: any, options: any) {
      if(!userStore.buttons.includes(options.value)){
        el.parentNode.removeChild(el)
      }
    },
  })
}
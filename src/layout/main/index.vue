<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag"/>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
  import useLayoutSettingStore from '@/store/modules/setting';
import { nextTick, ref, watch } from 'vue';

  // 控制当前组件是否销毁重建
  let flag = ref(true)
  let layoutSettingStore = useLayoutSettingStore()
  // 监听是否刷新
  watch(()=>layoutSettingStore.refsh,()=>{
    // console.log(123);
    // 点击刷新按钮，路由销毁
    flag.value = false
    nextTick(()=>{
      flag.value = true
    })
    
  })


</script>

<style scoped lang="scss">
  .fade-enter-from {
    opacity: 0;
    transform: scale(0);
  }

  .fade-enter-active {
    transition: all 1s;
  }

  .fade-enter-to {
    opacity: 1;
    transform: scale(1);

  }

</style>
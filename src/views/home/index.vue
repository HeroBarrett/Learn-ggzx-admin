<template>
  <div>
    一级路由展示登录成功后的展示 {{ userStore.username }}
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/modules/user';
import { onMounted } from 'vue';

  
  // 获取仓库
  let userStore = useUserStore()
  onMounted(() => {
    userStore.userInfo()
  })

</script>

<style scoped>
  
</style>
<template>
  <div class="logo">
    <img :src="setting.logo" alt="" v-if="setting.logoHidden">
    <p>{{ setting.title }}</p>
  </div>
</template>

<script lang="ts" setup>
  // 引入设置标题与logo配置文件
  import setting from '../../setting';

</script>

<style scoped lang="scss">
  .logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 20px;
  
    img {
      width: 40px;
      height: 40px;
    }

    p {
      font-size: $base-logo-title-fontSize;
      margin-left: 10px;
    }
  }
</style>
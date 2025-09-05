<template>
  <div class="logo">
    <img :src="setting.logo" alt="" v-if="setting.logoHidden">
    <p :class="{ flod: !isShow}">{{ setting.title }}</p>
  </div>
</template>

<script lang="ts" setup>
  // 引入设置标题与logo配置文件
  import useLayoutSettingStore from '@/store/modules/setting';
  import setting from '../../setting';
  import { ref, watch } from 'vue';
  let LayoutSettingStore = useLayoutSettingStore()
  let isShow = ref(!LayoutSettingStore.fold)
  watch(
    () => LayoutSettingStore.fold,
    (fold) => {
      if (!fold) {
        // 展开时，2秒后显示标题
        isShow.value = false
        setTimeout(() => {
          isShow.value = true
        }, 300)
      } else {
        // 折叠时，立即隐藏标题
        isShow.value = false
      }
    },
    { immediate: true }
  )
</script>

<style scoped lang="scss">
  .logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
      width: 40px;
      height: 40px;
    }

    p {
      font-size: $base-logo-title-fontSize;
      margin-left: 10px;

      &.flod {
        opacity: 0;
      }
    }


  }
</style>
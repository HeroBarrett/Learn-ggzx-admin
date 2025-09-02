<template>
  <div>
    <h1>SVG测试</h1>
    <SvgIcon name="aaa" color="green"></SvgIcon>
  </div>

</template>

<script lang="ts" setup>
import request from './utils/request';
  import { onMounted } from 'vue';

  onMounted(async () => {
    const res = await request({
      url: '/user/login',
      method: 'post',
      data: {
        username: 'admin',
        password: '111111'
      }
    })

    console.log(res);
  })
</script>

<style scoped lang="scss">
  div {
    h1 {
      color: $base-color;
    }
  }
</style>
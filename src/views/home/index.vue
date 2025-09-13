<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar">
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好，{{ userStore.username }}</h3>
        <p class="subtitle">硅谷甄选运营平台</p>
      </div>
    </div>
  </el-card>
  <div class="svgg">
    <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
  </div>
</template>

<script lang="ts" setup>
  // 引入用户模块的store
  import useUserStore from '@/store/modules/user'
  import { getTime } from '@/utils/time';
  const userStore = useUserStore()


</script>

<style scoped lang="scss">
  .box {
    display: flex;

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .bottom {
      margin-left: 20px;
      margin-top: 15px;

      .title {
        font-size: 30px;
        font-weight: 900;
        margin-bottom: 20px;
      }
      .subtitle {
        font-style: italic;
        font-size: 20px;
        font-weight: 400;
        color: pink;
      }
    }
  }
  .svgg {
    display: flex;
    justify-content: center;
  }
</style>
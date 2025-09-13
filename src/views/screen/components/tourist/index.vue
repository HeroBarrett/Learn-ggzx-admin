<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>999999</span>人</p>
    </div>
    <div class="number">
      <span v-for="item, index in people" :key="index">{{ item }}</span>
    </div>
    <!-- 盒子将来echarts展示图形图标的节点 -->
    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  // 引入echarts
  import * as echarts from 'echarts';
  // 引入水球图插件
  import 'echarts-liquidfill'
  let people = ref('216908人')
  // 获取插入水球图的dom节点
  let charts = ref(null);

  onMounted(() => {
    // 获取echarts实例
    let mycharts = echarts.init(charts.value);
    // 设置实例配置项
    mycharts.setOption({
      // 标题组件
      title: {
        // text: '水球图'
      },
      // x轴组件
      xAxis: {},
      // y轴组件
      yAxis: {},
      // 系列：决定展示什么样的图表
      series: {
        type: 'liquidFill', // 系列
        data: [0.6, 0.4, 0.2], // 展示的数据
        waveAnimation: true, // 动画
        animationDuration: 1000, // 动画时间
        animationDurationUpdate: 1000, // 动画时间
        radius: '95%'
      },
      // 布局组件
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    })
  })

</script>

<style scoped lang="scss">
  .box {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .top {
      margin-left: 20px;margin-top: 20px;

      .title {
        color: white;
        font-size: 20px;
      }

      .bg {
        width: 68px;
        height: 7px;
        background: url(../../images/dataScreen-title.png) no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
      }

      .right {
        float: right;
        color: white;
        font-size: 16px;

        span {
          color: yellowgreen;
        }
      }
    }

    .number {
      margin-top: 30px;
      display: flex;
      padding: 20px 30px;

      span {
        flex: 1;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: url(../../images/total.png) no-repeat;
        background-size: 100% 100%;
        color: #29fcff;
        font-size: 26px;
      }
    }

    .charts {
      width: 100%;
      height: 250px;
    }
  }
</style>
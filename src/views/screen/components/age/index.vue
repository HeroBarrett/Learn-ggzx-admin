<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <!-- 图形图标 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
  import { onMounted, ref } from 'vue';
  let charts = ref()

  onMounted(() => {
    let mycharts = echarts.init(charts.value);
    // 配置项
    let option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '30',
        right: '30',
        orient: 'vertical',
        textStyle: {
          color: 'white',
          fontSize: 14
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'inside',
            color:'white'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '军事' },
            { value: 735, name: '新闻' },
            { value: 580, name: '直播' },
            { value: 484, name: '娱乐' },
            { value: 300, name: '财经' }
          ]
        }
      ],
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    };
    // 配置项
    mycharts.setOption(option);
  })
</script>

<style scoped lang="scss">
  .box2 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lc.png) no-repeat;
    background-size: 100% 100%;

    .title {
      margin-left: 20px;

      p {
        color: white;
        font-size: 20px;
      }
    }

    .charts {
      height: 260px;
    }
  }
</style>
<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="">
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="">
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
  import { onMounted, ref } from 'vue';

  let charts = ref()
  onMounted(() => {
    // 初始化echarts实例
    let mycharts = echarts.init(charts.value)
    // 配置配置项
    mycharts.setOption({
      // 标题组件
      title: {
        text: '男女比例',
        textStyle: {
          color: 'white'
        },
        left: 'center'
      },
      // x|y
      xAxis: {
        // type: 'category'
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category',
      },
      series:[
        {
          type: 'bar',
          data: [58],
          barWidth: 20,
          z: 100,
          itemStyle: {
            color: 'skyblue',
            borderRadius: 10,
          }
        },
        {
          type: 'bar',
          data: [100],
          barWidth: 20,
          barGap: '-100%',
          itemStyle: {
            color: 'pink',
            borderRadius: 10,
          }
        }
      ],
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
  .box1 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lc.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0;

    .title {
      margin-left: 20px;

      p {
        color: white;
        font-size: 20px;
      }
    }

    .sex {
      display: flex;
      justify-content: center;
      align-items: center;

      .man {
        margin: 20px;
        background: url(../../images/man-bg.png) no-repeat;
        background-size: 100% 100%;
        width: 111px;
        height: 115px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .woman {
        margin: 20px;
        background: url(../../images/woman-bg.png) no-repeat;
        background-size: 100% 100%;
        width: 111px;
        height: 115px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .rate {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }

    .charts {
      width: 100%;
      height: 100px;
    }
  }
</style>
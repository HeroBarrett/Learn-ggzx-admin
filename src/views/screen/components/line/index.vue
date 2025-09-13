<template>
  <div class="box5">
    <div class="title">
      <p>未来七天游客流量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'

  let charts = ref()

  onMounted(() => {
    let myechart = echarts.init(charts.value)
    myechart.setOption({
      title: {
        // text: '访问量'
      },
      // x|y轴
      xAxis: {
        type: 'category',
        // 两侧不留白
        boundaryGap: false,
        // 分割线不要
        splitLine: {
          show: false
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        // 刻度
        axisTick: {
          show: true
        },
      },
      yAxis: {
        // 分割线不要
        splitLine: {
          show: false
        },
        // 轴线
        axisLine: {
          show: true
        },
        // 刻度
        axisTick: {
          show: true
        },
      },
      grid: {
        left: 40,
        top: 0,
        right: 20,
        bottom: 20,
      },
      // 系列
      series: [
        {
          type: 'line',
          data: [120, 1240, 66, 2299, 321, 890, 1200],
          // 平滑曲线
          smooth: true,
          // 填充颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'red'
              }, {
                offset: 1, color: 'blue'
              }]
            }
          }
        }
      ]
    })
  })
</script>

<style scoped lang="scss">
  .box5 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 20px;

    .title {
      margin-left: 10px;

      p {
        color: white;
        font-size: 20px;
      }
    }

    .charts {
      height: calc(100% - 40px);
      // background-color: red;
    }
  }
</style>
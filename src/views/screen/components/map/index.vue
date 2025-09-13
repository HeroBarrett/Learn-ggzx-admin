<template>
  <div class="box4" ref="map">
    我是地图
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  import chinaJSON from './china.json'
  let map = ref()

  // 注册中国地图
  echarts.registerMap('china', chinaJSON as any)

  onMounted(() => {
    // 初始化图标
    let mychart = echarts.init(map.value)
    // 配置项
    mychart.setOption({
      // 地图组件
      geo: {
        map: 'china', // 中国地图
        roam: true, // 鼠标缩放平移
        // 位置
        top: 66,
        left: 72,
        right: 72,
        // 文字设置
        label: {
          show: true, // 文字显示
          color: 'white',
          fontSize: 14
        },
        // 每个多边形样式
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'red' // 0% 处的颜色
            }, {
              offset: 1, color: 'blue' // 100% 处的颜色
            }],
          },
          opacity: .8
        },
        // 地图高亮效果
        emphasis: {
          itemStyle: {
            color: 'red'
          },
          label: {
            fontSize: 40
          }
        }
      },
      // 航线
      series: [
        {
          type: 'lines', // 航线系列
          data: [
            {
              coords: [
                [116.405285, 39.904989],
                [113.280637, 23.125178]
              ],
              // 统一的样式设置
              lineStyle: {
                color: 'orange',
                width: 5
              },
            },
            {
              coords: [
                [91.132212, 29.660361],
                [121.472644, 31.231706]
              ],
              // 统一的样式设置
              lineStyle: {
                color: 'orange',
                width: 5
              },
            },
            {
              coords: [
                [101.778916, 36.623178],
                [102.712251, 25.040609]
              ],
              // 统一的样式设置
              lineStyle: {
                color: 'orange',
                width: 5
              },
            }
          ],
          // 线的特效
          effect: {
            show: true,
            symbol: 'arrow',
            color: 'red',
            symbolSize: 30,
          }
        }
      ]
    })
  })


</script>

<style scoped lang="scss"></style>
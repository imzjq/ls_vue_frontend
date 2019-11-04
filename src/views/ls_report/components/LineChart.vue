<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '500px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      },
      count:{

      },
    },
    data() {
      return {
        chart: null
      }
    },
    computed:{
      //chartDatas:this.chartData
    },
    watch: {
      //immediate:true,
      deep: true,
      count:{
        handler(val){
          this.initChart();
        }
      },
      chartData: {
        handler(newVal, oldVal) {
          if (this.chart) {
            this.initChart();
            if (newVal) {
              this.chart.setOption(newVal);
            } else {
              this.chart.setOption(oldVal);
            }
          } else {
            this.initChart();
          }
        },

      }
    },
    mounted() {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            //this.chart.resize()
            window.addEventListener("resize", this.chart.resize);
          }
        }, 100)
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }


      this.chart.dispose()
      this.chart = null
    },
    methods: {
      sidebarResizeHandler(e) {
        if (e.propertyName === 'width') {
          this.__resizeHandler()
        }
      },
      setOptions({ yData,xData,title,text } = {}) {

        this.chart.setOption({
          backgroundColor: '#1b1b1b',
          title: {
            text: text,
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#F1F1F3'
            },
            left: '6%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: [],
            right: '4%',
            textStyle: {
              fontSize: 12,
              color: '#F1F1F3'
            }
          },
          grid: {
            left: '1%',
            right: '2%',
            bottom: '8%',
            top:'14%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            data: xData,
            // axisLabel:{
            //   interval:0,
            //   rotate:50,
            //   textStyle:{
            //     fontSize:12
            //   }
            // },
          }],
          yAxis: [{
            type: 'value',
            //interval: 40,
            //max:120,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 12
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          }],
          series: [{
            name: title,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(82, 191, 255, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(82, 191, 255, 0)'
                }], false),
                shadowColor: 'rgba(228, 139, 76, 0.1)',
                shadowBlur: 10
              }
            },
            symbolSize:4,
            itemStyle: {
              normal: {
                color: 'rgb(82, 191, 255)',
                borderColor:'#e48b4c'
              },
            },
            data: yData,
          } ],
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      }
    }
  }
</script>

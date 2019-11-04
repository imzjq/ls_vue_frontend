<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
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
      default: '300px'
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
  mounted() {

    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {

    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },


  watch :{
    deep: true,

    count:{
      handler(val){

       this.initChart();
      }
    },

    chartData: {
      handler(val) {

        this.initChart();
      //  this.setOptions(val)
      }
    }
  },

  methods: {
    setOption({ legendData, seriesData,name } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: legendData
        },
        series: [
          {
           // name: 'WEEKLY WRITE ARTICLES',
            name: name,
            type: 'pie',
            //  roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: seriesData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },

    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOption(this.chartData)
    },

  }
}
</script>

<template>
  <div class="app-container">
    <div class="filter-container">
      <condition-template :data="moreOptions" :isShow="isShow" :listQuery="listQuery"  v-on:search="search"/>
      <el-button type="primary" @click="getData">搜索</el-button>
    </div>
    <div>
      <line-chart :chartData="lineChartData" :count="count" v-loading="listLoading" />
    </div>
  </div>
</template>

<script>
  import LineChart from './components/LineChart'
  import {curd} from '@/api/flow/index'
  import {flowDomainOptions} from '@/api/public'
  import {moreOptions,generalListQuery,generalOptions} from './data/flow';
  import ConditionTemplate from '@/components/comlesu/ConditionTemplate'
  import Vue from 'vue'
  export default {
    name: 'flow',
    components: {
      LineChart,
      ConditionTemplate
    },
    data(){
      return {
        lineChartData:{},
        /****start公共搜索需要用的值***/
        selectedMore:[],
        //是否显示搜索框或者select框
        isShow:{},
        //包含每个select或input框中选中的值
        listQuery:undefined,
        moreOptions:moreOptions,
        /*********end***********/
        count:0,
        listLoading:false,
      }
    },
    created:function(){
      /****start公共搜索***/
      this.searchOptionsInit()
      /*********end***********/
      /*********end***********/
      //动态获取数据
      this.getData()
      this.getOptions()
    },
    //监听
    watch:{
      /****start公共搜索***/
      selectedMore(newValue,oldValue){
        this._.forEach(oldValue,(value)=>{
          this.isShow[value]=false
        })
        this._.forEach(newValue,(value)=>{
          this.isShow[value]=true
        })
      },
      /*********end***********/
    },
    methods:{
      searchOptionsInit(){
        this.listQuery =generalListQuery()
        this.listQuery.unit = 300
        this.listQuery.type =1
        this._.forEach(moreOptions,(value)=>{
          Vue.set(this.isShow,value.value,value.isShow);
        })
        let options = generalOptions();
        this._.forEach(options,(value,key)=>{
          this[key] = value
        })
        this.selectedMore = []
      },

      /****start公共搜索***/
      search(){
        //console.log(this.listQuery);
        //this.getData()
      },
      /*********end***********/
      getOptions(){
        flowDomainOptions().then(response => {
          //动态添加搜索下拉框的选择列信息
          let domainOp = this._.find(this.moreOptions,{'value':'did'})
          if(domainOp ){
            domainOp.options = response.data.domainOptions
          }

        })
      },

      //请求接口获取数据
      getData(){
        this.listLoading = true

        curd('getBandwidth',this.listQuery).then(response => {
          //console.log(response)
          this.lineChartData.xData = response.data.xData
          this.lineChartData.yData = response.data.yData
          this.lineChartData.title = response.data.title
          this.lineChartData.text = response.data.pV
          this.count++
          //this.total = response.data.count
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },

    }
  }
</script>

<style scoped>

</style>

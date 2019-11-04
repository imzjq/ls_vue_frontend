<template>
    <div class="app-container">
        <div class="filter-container">
            <condition-template :data="moreOptions" :isShow="isShow" :defaultDate="defaultDate" :listQuery="listQuery"  />
            <el-button type="primary" @click="getData">搜索</el-button>
        </div>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="lineChartData" v-loading="listLoading" />
        </el-row>
    </div>
</template>
<script>
    import LineChart from './components/LineChartNew'
    import {curd} from '@/api/flow/index'
    import {moreOptions,generalListQuery,generalOptions} from './data/api';
    import {flowDomainOptions} from '@/api/public'
    import ConditionTemplate from '@/components/comlesu/ConditionTemplate'
    import Vue from 'vue'
    export default {
        name: 'flow_dns',
        components: {
            LineChart,
            ConditionTemplate
        },
        data() {
            return {
                lineChartData:{
                   // expectedData: [100, 120, 161, 134, 105, 160, 165],
                   // actualData: [120, 82, 91, 154, 162, 140, 145],
                    timeData:[],
                   // legendData:['200', '400'],
                    legendData:[],
                    seriesData:[],
                },
                selectedMore:[],
                //是否显示搜索框或者select框
                isShow:{},
                //包含每个select或input框中选中的值
                listQuery:undefined,
                moreOptions:moreOptions,
                defaultDate:[],
                listLoading:false,
            }
        },
        created:function(){
            this.searchOptionsInit()
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

        methods: {
            searchOptionsInit(){
                this.listQuery =generalListQuery()
                this._.forEach(moreOptions,(value)=>{
                    Vue.set(this.isShow,value.value,value.isShow);
                })
                let options = generalOptions();
                this._.forEach(options,(value,key)=>{
                    this[key] = value
                })
                this.selectedMore = []
            },

            getOptions(){
                flowDomainOptions().then(response => {
                    //动态添加搜索下拉框的选择列信息
                    let domainOp = this._.find(this.moreOptions,{'value':'did'})
                    if(domainOp ){
                        domainOp.options = response.data.domainOptions
                    }
                })
            },
            getData(){
                this.listLoading = true
                curd('getApi',this.listQuery).then(response => {
                    this.lineChartData.timeData = response.data.xData;
                    let legendData = [];
                    let seriesData = [];
                    let s_data = [];
                    this._.forEach(response.data.yData,(value,key)=>{
                        legendData.push(key);
                        s_data = {
                            name: key,
                            itemStyle: {
                                normal: {
                                   // color: '#FF005A',
                                    lineStyle: {
                                      //  color: '#FF005A',
                                        width: 2
                                    }
                                }
                            },
                            smooth: true,
                            type: 'line',
                            data: value,
                            animationDuration: 2800,
                            animationEasing: 'cubicInOut'
                        };
                        seriesData.push(s_data);
                    })
                    this.lineChartData.legendData = legendData;
                    this.lineChartData.seriesData = seriesData;
                    this.listLoading = false
                }).catch(() => {
                    this.listLoading = false
                })
            },



        },

    }
</script>

<style lang="scss" scoped>
    .dashboard-editor-container {
        padding: 32px;
        background-color: rgb(240, 242, 245);
        position: relative;

        .github-corner {
            position: absolute;
            top: 0px;
            border: 0;
            right: 0;
        }

        .chart-wrapper {
            background: #fff;
            padding: 16px 16px 0;
            margin-bottom: 32px;
        }
    }

    @media (max-width:1024px) {
        .chart-wrapper {
            padding: 8px;
        }
    }
</style>

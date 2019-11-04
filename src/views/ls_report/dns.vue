<template>


    <div class="app-container">
        <div class="filter-container">
            <condition-template :data="moreOptions" :isShow="isShow" :defaultDate="defaultDate" :listQuery="listQuery"  />
            <el-button type="primary" @click="getData">搜索</el-button>
        </div>
        <div class="dashboard-editor-container">
            <el-row :gutter="32">
                <el-col :xs="24" :sm="24" :lg="8">
                    <div class="chart-wrapper">
                        <pie-chart  :chart-data="lineChartData" :count="count" v-loading="listLoading" />
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                    <div class="chart-wrapper">
                        <pie-chart  :chart-data="lineChartDataProvince" :count="count" v-loading="listLoading" />
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="8">
                    <div class="chart-wrapper">
                        <pie-chart  :chart-data="lineChartDataCity" :count="count" v-loading="listLoading"  />
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>


</template>
<script>
    import PieChart from './components/PieChart'
    import {curd} from '@/api/flow/index'
    import {moreOptions,generalListQuery,generalOptions} from './data/dns';
    import {flowDomainOptions} from '@/api/public'
    import ConditionTemplate from '@/components/comlesu/ConditionTemplate'
    import Vue from 'vue'

    export default {
        name: 'flow_dns',
        components: {
            PieChart,
            ConditionTemplate
        },
        data() {
            return {
                lineChartData:{},
                lineChartDataCity:{},
                lineChartDataProvince:{},
                count:0,
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
            this.lineChartData.legendData = [];
            this.lineChartData.seriesData =  [];
            this.lineChartData.name = '国家统计';
            this.lineChartDataProvince.legendData = [];
            this.lineChartDataProvince.seriesData =  [];
            this.lineChartDataProvince.name = '省份统计'
            this.lineChartDataCity.legendData = [];
            this.lineChartDataCity.seriesData =  [];
            this.lineChartDataCity.name = '城市统计'
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
                curd('getDns',this.listQuery).then(response => {
                    this.lineChartData.legendData=  response.data.country_key
                    this.lineChartData.seriesData  =  response.data.country

                    this.lineChartDataProvince.legendData=  response.data.province_key
                    this.lineChartDataProvince.seriesData  =  response.data.province

                    this.lineChartDataCity.legendData=  response.data.city_key
                    this.lineChartDataCity.seriesData  =  response.data.city
                    this.listLoading = false
                    this.count++
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

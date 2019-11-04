<template>
    <div class="app-container">
        <div class="filter-container">

            <el-select  v-model="listQuery.dm"  style="width: 300px" clearable filterable placeholder="域名"   >
                <el-option
                        v-for="pro in urlData"
                        :key="pro"
                        :label="pro"
                        :value="pro">
                </el-option>
            </el-select>
            <el-input v-model="listQuery.ip" placeholder="ip" style="width:200px"></el-input>
            <el-input v-model="listQuery.code" placeholder="状态码" style="width:200px"></el-input>
            <condition-template :data="moreOptions" :isShow="isShow" :defaultDate="defaultDate" :listQuery="listQuery" />
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <TableList
                :listLoading="listLoading"
                :isShowFilter="isShowFilter"
                :data="tableData"
                :showFields="showFields"
                :tableFields="tableFields"
        >
        </TableList>
        <pagination v-show="total>listQuery.limit" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getData" />



    </div>
</template>

<script>
    import {curd} from '@/api/flow/index'
    import {domainDefenceUrlOptions,getTime} from '@/api/public'
    import {moreOptions,generalListQuery,generalOptions,getTableFields} from './data/traffic';
    import ConditionTemplate from '@/components/comlesu/ConditionTemplate'
    import TableList from '@/components/comlesu/TableList'
    import Pagination from '@/components/Pagination'
    import Vue from 'vue'
    export default {
        components:{
            ConditionTemplate,
            TableList,
            Pagination
        },
        data(){
            return {
                /****start公共搜索需要用的值***/
                selectedMore:[],
                //是否显示搜索框或者select框
                isShow:{},
                urlData:[],
                //包含每个select或input框中选中的值
                listQuery:undefined,
                moreOptions:moreOptions,
                /*********end***********/
                /********table*********/
                showFields:[],
                tableFields:[],
                tableData:[],
                multipleSelection: [],
                isShowFilter:false, //是否线上table中列的显示隐藏下拉框
                total:0,
                listLoading:false,
                defaultDate:[],
            }
        },
        created:function(){
            /****start公共搜索***/
            this.searchOptionsInit()
            /*********end***********/
            /****tableList***/
            this.tableInit()
            /*********end***********/
            //动态获取数据
           // this.getData()
            this.getUrl()

            getTime({'count':2}).then(response => {
               this.listQuery.time = response.data;
            })
            //this.listQuery.time =["2019-07-28", "2019-07-29"];
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
            getUrl(){
                domainDefenceUrlOptions(this.listQuery).then(response => {
                    this.urlData = response.data
                })
            },
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
            tableInit(){
                let tableFields = getTableFields()
                this.tableFields = tableFields
                this._.forEach(tableFields,(value)=>{
                    if(value.defaultShow){
                        this.showFields.push(value.field)
                    }
                })
            },
            /****start公共搜索***/
            search(){
                //console.log(this.listQuery);
                this.getData()
            },
            /*********end***********/

            //请求接口获取数据
            getData(){
                this.listLoading = true
                curd('getTraffic',this.listQuery).then(response => {
                    this.tableData = response.data.datas
                    this.total = response.data.count
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

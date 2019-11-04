<template>
    <div class="app-container">
        <div class="filter-container">
            <!--<condition-template :data="moreOptions" :isShow="isShow" :listQuery="listQuery"   v-on:search="search(1)" />-->
            <el-input v-model="listQuery.site" placeholder="完整域名" style="width:200px"></el-input>
            <el-button type="primary" @click="search(1)">搜索</el-button>
        </div>
        <div class="filter-container" style="margin-bottom:5px;">
            <!--<el-button  class="filter-item" type="success"  @click="handleCreate">新增</el-button>-->
        </div>



        <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
                  style="width: 100%;">
            <el-table-column width="250" align="center" :label="tabletitle[dialogStatus]" prop="lable">
            </el-table-column>
            <el-table-column width="" align="center" label="往月流量(M)-->>" prop="data">
            </el-table-column>
        </el-table>
        <el-table :key='tableKey2' :data="list2" v-loading="listLoading" border fit highlight-current-row
                  style="width: 100%;">
            <el-table-column width="250" align="center" :label="tabletitle[dialogStatus]" prop="lable">
            </el-table-column>

            <el-table-column width="" align="center" label="往月带宽（Mb/s）-->>" prop="data">
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
    import {curd} from '@/api/flow/index'
    import {moreOptions,generalListQuery,generalOptions,getTableFields} from './data/lm';
    import ConditionTemplate from '@/components/comlesu/ConditionTemplate'

    import TableList from '@/components/comlesu/TableList'
    import Pagination from '@/components/Pagination'
    import Vue from 'vue'
    // import { temp } from './node_data'
    import axios from 'axios'
    export default {
        components:{
            ConditionTemplate,
            TableList,
            Pagination
        },
        data(){
            return {
                tableKey: 0,
                tableKey2: 1,
                list: [],
                list2: [],
                tabletitle :
                    {

                        site: '域名(统计起始时间)'
                    },
                /****start公共搜索需要用的值***/
                selectedMore:[],
                //是否显示搜索框或者select框
                isShow:{},
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
                listLoading:false,
                temp:'',
                dialogStatus:'',
                usersOptions:[],
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
            this.dialogStatus = 'site';
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
            search(num){
                if(num == 1)
                {
                    this.dialogStatus = 'site';
                    this.listQuery.username= ''
                }
                //console.log(this.listQuery);
                this.getData()
            },
            /*********end***********/
            //请求接口获取数据
            getData(){
                this.listLoading = true
                curd('getLm',this.listQuery).then(response => {

                    this.list = response.data.datas
                    this.list2 = response.data.datas2
                    this.listLoading = false

                }).catch(() => {
                    this.listLoading = false
                })
            },
            handleSuccess(res, file, fileList){
                if(res.code===200){
                    this.temp.ats = res.data
                    this.$notify({
                        title: '成功',
                        message: '上传成功',
                        type: 'success',
                        duration: 2000
                    })
                }else{
                    this.$notify({
                        title: '上传失败',
                        message:res.msg,
                        type: 'error',
                        duration: 2000
                    })
                }

            },
            handleError(res){
                this.$notify({
                    title: '出错了',
                    message: res.message,
                    type: 'error',
                    duration: 2000
                })
            },




        }
    }
</script>

<style scoped>

</style>

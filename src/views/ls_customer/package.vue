<template>
  <div class="app-container">
    <div class="filter-container">
    </div>
    <TableList
            :listLoading="listLoading"
            :isShowFilter="isShowFilter"
            :data="tableData"
            :showFields="showFields"
            :tableFields="tableFields"
            :checkBox=false
    >
    </TableList>
    <pagination v-show="total>10" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getData" />
  </div>
</template>

<script>
  import {curd} from '@/api/customer/index'
  import {generalListQuery,generalOptions,getTableFields} from './data/index';
  import ConditionTemplate from '@/components/comlesu/ConditionTemplate'
  import TableList from '@/components/comlesu/TableList'
  import Pagination from '@/components/Pagination'
  import Vue from 'vue'
  import { getToken } from "@/utils/auth"
  export default {
    components:{
      ConditionTemplate,
      TableList,
      Pagination
    },
    data(){

      return {
        token: getToken(),
        /****start公共搜索需要用的值***/
        selectedMore:[],
        //是否显示搜索框或者select框
        isShow:{},
        //包含每个select或input框中选中的值
        listQuery:undefined,
        /*********end***********/
        /********table*********/
        showFields:[],
        tableFields:[],
        tableData:[],
        multipleSelection: [],
        isShowFilter:false, //是否线上table中列的显示隐藏下拉框
        total:0,
        listLoading:false,
        dialogFormVisible:false,
        dialogStatus: '',
        update:false,

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
      this.getData()
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
        curd('getList',this.listQuery).then(response => {

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

<template>
  <div class="app-container">

    <div class="filter-container" style="margin-bottom:5px;">
      <el-button  class="filter-item" type="success"  @click="ddosRecord()">链接记录</el-button>
      <el-button  class="el-icon-refresh" type="success"  @click="getData()" >链接数刷新</el-button>

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
  import {curd} from '@/api/flow/index'
  import {moreOptions,generalListQuery,generalOptions,getTableFields} from './data/visit';
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
        dialogFormVisible:false,
        dialogStatus: '',
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
        curd('getDdos',this.listQuery).then(response => {
          this.tableData = response.data.datas
         // this.total = response.data.count
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },

        ddosRecord() {
            this.$router.push({ name: 'ddos_record'})
         },

    }
  }
</script>

<style scoped>

</style>

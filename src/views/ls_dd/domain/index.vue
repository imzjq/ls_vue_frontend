<template>
  <div class="app-container">
    <div class="filter-container">
      <condition-template :data="moreOptions" :isShow="isShow" :listQuery="listQuery"  v-on:search="search"/>
    </div>
    <div class="filter-container" style="margin-bottom:5px;">
      <el-button  class="filter-item" icon="el-icon-edit" type="success"  @click="handleCreate">新增</el-button>
      <el-button  class="filter-item" icon="el-icon-edit" type="success"  @click="handleCreateBatch">批量新增</el-button>
      <el-button  class="filter-item" icon="el-icon-edit" type="warning"  @click="handleChangeStatus(2)">批量修改:部署</el-button>
      <el-button  class="filter-item" icon="el-icon-edit" type="warning"  @click="handleChangeStatus(1)">批量修改:未部署</el-button>
    </div>

    <TableList
      :listLoading="listLoading"
      :isShowFilter="isShowFilter"
      :data="tableData"
      :showFields="showFields"
      :tableFields="tableFields"

      :checkBox=true
      v-on:handleSelectionChange="handleSelectionChange"
    >
      <template slot="append">
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button   size="mini" type="success"  @click="handleUpdateInfo(scope.row)">修改</el-button>
            <el-button   size="mini" type="danger" v-if="scope.row.status_int=='2'"  @click="handleChangeStatusOne(scope.row.id,1)">未部署</el-button>
            <el-button   size="mini" type="success" v-else  @click="handleChangeStatusOne(scope.row.id,2)">部署</el-button>
          </template>
        </el-table-column>
      </template>
    </TableList>
    <pagination v-show="total>10" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getData" />



  </div>
</template>

<script>
  import {curd} from '@/api/dd/domain'
  import {moreOptions,generalListQuery,generalOptions,getTableFields,getTemp} from './data/domain';
  import {brandOptions,packageOptions} from '@/api/public'
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
        high_anti : '',
        node_group : '',
        nodeGroupOptions:[],
        defenceOptions:[],
        dialogFormVisible:false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '新建'
        },
        temp:getTemp(),
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
      this.onLoad();
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
      onLoad()
      {
        brandOptions().then(response => {
          let typeOp = this._.find(this.moreOptions,{'value':'brand_id'})
          if(typeOp ){
            typeOp.options = response.data
          }
        })
        packageOptions().then(response => {
          let typeOp = this._.find(this.moreOptions,{'value':'package_id'})
          if(typeOp ){
            typeOp.options = response.data
          }
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

      handleSelectionChange(data){
        this.multipleSelection = [];
        this._.forEach(data,(v) =>{
          this.multipleSelection.push(v.id)
        })
      },

      handleChangeStatusOne(id,val){
        let data = {
          status:val,
          id:[id]
        };
        curd('changeStatus',data).then(response => {
          this.getData()
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {

        })
      },


      handleCreate() {
        //this.$router.push({name:'domain_form'})
        this.$router.push({ name: 'domain_form'})
      },

      handleCreateBatch() {
        //this.$router.push({name:'domain_form'})
        this.$router.push({ name: 'domain_batch_form'})
      },

      handleUpdateInfo(row){
        this.$router.push({ name: 'domain_form_update', params: { did: row.id }})
      },

      handleChangeStatus(val){
        if(this.multipleSelection.length > 0){
          let data = {
            status:val,
            id:this.multipleSelection
          };

          curd('changeStatus',data).then(response => {
            this.getData()
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {

          })
        }else{
          this.$notify({
            title: '注意',
            message: '请选择需要操作的项',
            type: 'error',
            duration: 2000
          })
        }
      },

      initTemp(){
        this.temp = getTemp()
      },

    }
  }
</script>

<style scoped>

</style>

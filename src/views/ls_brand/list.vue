<template>
  <div class="app-container">
    <div class="filter-container">
      <condition-template :data="moreOptions" :isShow="isShow" :listQuery="listQuery"  v-on:search="search"/>
    </div>
    <div class="filter-container" style="margin-bottom:5px;">
      <el-button  class="filter-item" type="success"  @click="handleCreate">新增</el-button>
    </div>
    <TableList
      :listLoading="listLoading"
      :isShowFilter="isShowFilter"
      :data="tableData"
      :showFields="showFields"
      :tableFields="tableFields"
    >
      <template slot="append">
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button   size="mini" type="success"  @click="handleUpdateInfo(scope.row)">修改</el-button>
            <el-button   size="mini" type="danger"  @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </TableList>
    <pagination v-show="total>10" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getData" />
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" label-position="left" label-width="90px" style=' margin-left:50px;'>
        <el-form-item label="名称">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="temp.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button  v-if="dialogStatus==='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateInfo">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {curd} from '@/api/brand/list'
  import {moreOptions,generalListQuery,generalOptions,getTableFields,getTemp} from './data/list';
  import ConditionTemplate from '@/components/comlesu/ConditionTemplate'
  import TableList from '@/components/comlesu/TableList'
  import Pagination from '@/components/Pagination'
  import Vue from 'vue'
  import { getToken } from '@/utils/auth'
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
        textMap: {
          update: '编辑',
          create: '新建'
        },
        multipleSelection: [],
        isShowFilter:false, //是否线上table中列的显示隐藏下拉框
        total:0,
        listLoading:false,
        temp:'',
        dialogStatus:'',
        dialogFormVisible:false,

        token:`${getToken()}`
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
        curd('getList',this.listQuery).then(response => {
          this.tableData = response.data.datas
          this.total = response.data.count
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      initTemp(){
        this.temp = getTemp()
      },
      handleCreate() {
        this.initTemp()// 初始化值
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        curd('add',this.temp).then(() => {
          this.getData()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.dialogFormVisible = true
        })
      },
      handleUpdateInfo(row){
        this.temp= row
        this.dialogStatus ='update'
        this.dialogFormVisible= true

        curd('getOne',{id:row.id}).then((response) => {
          //console.log(response)
          this.temp = response.data
          this.dialogFormVisible= true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        })
      },

      updateInfo(){
        curd('update',this.temp).then(() => {
          this.getData()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.dialogFormVisible = true
        })
      },

      handleDel(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          curd('del',{id:row.id}).then(response => {
            this.getData()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除',
            duration: 2000
          })
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

<template>
  <div class="app-container">

    <div class="filter-container">
      <condition-template :data="moreOptions" :isShow="isShow" :listQuery="listQuery"  v-on:search="search"/>
    </div>
    <div class="filter-container" style="margin-bottom:5px;">
      <el-button  class="filter-item" type="success"  @click="handleCreate">新增</el-button>
      <el-button  class="filter-item" type="danger"  @click="handleChangeDels()" icon="el-icon-delete">批量删除</el-button>
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
            <el-button   size="mini"  type="danger"  @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </TableList>

    <pagination v-show="total>10" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getData" />
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" title="上传证书" :visible.sync="dialogFormVisible"width="900px">
      <el-form ref="dataForm"   :model="temp" label-position="left" label-width="90px" style='width: 800px; margin-left:50px;'>

        <el-form-item label="套餐">
          <el-select  v-model="temp.package_id"  style="width: 300px" clearable filterable placeholder="请选择"   >
            <el-option
                    v-for="pro in packageOptions"
                    :key="pro.value"
                    :label="pro.label"
                    :value="pro.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="私钥">
          <el-input type="textarea" :rows="10"  placeholder="输入pem编码" v-model="temp.pb_key"></el-input>
          <el-upload
            class="upload-demo"
            action="/api/user-cer/upload"
            :on-success="handleSuccessPb"
            :show-file-list="false"
            :headers="{
                token:token,
              }"
          >
            <el-button size="small" type="primary">上传私钥文件</el-button>
          </el-upload>
        </el-form-item>
        <el-tooltip class="item" effect="dark" :content="pem_test" placement="right">
          <el-form-item label="证书">
            <el-input type="textarea" :rows="10"  placeholder="输入pem编码" v-model="temp.pv_key"></el-input>
            <el-upload
              class="upload-demo"
              action="/api/user-cer/upload"
              :on-success="handleSuccessPv"
              :show-file-list="false"
              :headers="{
                token:token,
              }"
            >
              <el-button size="small" type="primary">上传证书文件</el-button>
            </el-upload>
          </el-form-item>
        </el-tooltip>

      </el-form>
      <div style="margin-left: 100px">
        <el-button  v-if="dialogStatus==='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateInfo">确认</el-button>

      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {curd} from '@/api/dd/ssl'
  import {moreOptions,generalListQuery,generalOptions,getTableFields,getTemp} from './data/index';
  import ConditionTemplate from '@/components/comlesu/ConditionTemplate'
  import TableList from '@/components/comlesu/TableList'
  import Pagination from '@/components/Pagination'
  import {packageOptions} from '@/api/public'
  import Vue from 'vue'
  import { getToken } from "@/utils/auth"
  export default {
    components:{
      ConditionTemplate,
      TableList,
      Pagination
    },
    data(){
      const validateCrename  = (rule, value, callback) => {
        if (value) {
          if( /[^\a-\z\A-\Z0-9\.\-\_]/g.test(value))
          {
            callback(new Error('不能输入汉字!'));
          }else {
            callback();
          }

          // if (/[\u4E00-\u9FA5]/g.test(value)) {
          //   callback(new Error('不能输入汉字!'));
          // } else {
          //   callback();
          // }

        }
      }

      return {
        token: getToken(),
        pem_test:"参考案例<br/>ddd",
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
        packageOptions:[],
        dialogFormVisible:false,
        dialogStatus: '',
        temp:getTemp(),
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

      if(this.$route.params.is_valid > 0)
      {
       this.listQuery.is_valid = this.$route.params.is_valid;
      }

      //动态获取数据
      this.getData()
      packageOptions().then(response => {
        this.packageOptions = response.data

        let typeOp = this._.find(this.moreOptions,{'value':'package_id'})
        if(typeOp ){
          typeOp.options = response.data
        }

      })
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

      handleUpdateInfo(row){

        curd('getOne',{id:row.id}).then((response) => {
          this.temp = response.data
          this.dialogFormVisible = true
          this.dialogStatus = 'update'
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        })
      },

      updateInfo(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
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
          }
        })
      },


      handleSelectionChange(data){
        this.multipleSelection = [];
        this._.forEach(data,(v) =>{
          this.multipleSelection.push(v.id)
        })
      },

      handleCreate() {
        this.initTemp()// 初始化值
        this.dialogFormVisible = true
        this.dialogStatus = 'create'
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
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
          }
        })
      },


      handleDel(row){
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
        })
      },

      /**
       * 批量删除
       * @param val
       */
      handleChangeDels(){
        if(this.multipleSelection.length > 0){
          let data = {
            id:this.multipleSelection
          };
          curd('dels',data).then(response => {
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


      //文件上传相关
      handleSuccessPb(response, file, fileList) {
        this.temp.pb_key =  response.data.content
      },
      handleSuccessPv(response, file, fileList) {
        this.temp.pv_key =response.data.content
        // if(response.data.ssl_content.subject.CN != '' && response.data.ssl_content.subject.CN != undefined )
        //  this.temp.cer_name = response.data.ssl_content.subject.CN ;
      },


    }
  }
</script>

<style scoped>

</style>

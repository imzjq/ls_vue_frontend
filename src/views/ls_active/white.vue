<template>
  <div class="app-container">
    <div class="filter-container">
      <condition-template :data="moreOptions" :isShow="isShow" :listQuery="listQuery"  v-on:search="search"/>
    </div>
    <div class="filter-container" style="margin-bottom:5px;">
      <el-button  class="filter-item" type="success"  @click="handleCreate">新增</el-button>
      <el-button  class="filter-item" icon="el-icon-edit" type="success"  @click="handleCreateBatch">批量新增</el-button>
      <el-button  class="filter-item" type="danger"  @click="handleChangeDel()" icon="el-icon-delete">批量删除</el-button>
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
            <el-button   size="mini" type="danger"  @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </TableList>
    <pagination v-show="total>10" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getData" />

    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="ip">
          <el-input v-model="temp.ip"></el-input>
        </el-form-item>
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
        <el-form-item label="品牌">
          <el-select  v-model="temp.brand_id"  style="width: 300px" clearable filterable placeholder="请选择"   >
            <el-option
                    v-for="pro in brandOptions"
                    :key="pro.value"
                    :label="pro.label"
                    :value="pro.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button  v-if="dialogStatus==='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateInfo">确认</el-button>
      </div>
    </el-dialog>



    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" :title="textAddMap" :visible.sync="dialogBatchFormVisible">
      <el-form ref="dataBatchForm"  :model="temps" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="ip">
          <el-input type="textarea" :rows="10"  placeholder="请输入ip，一行一个ip" v-model="temps.ips"></el-input>
        </el-form-item>
        <el-form-item label="套餐">
          <el-select  v-model="temps.package_id"  style="width: 300px" clearable filterable placeholder="请选择"   >
            <el-option
                    v-for="pro in packageOptions"
                    :key="pro.value"
                    :label="pro.label"
                    :value="pro.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select  v-model="temps.brand_id"  style="width: 300px" clearable filterable placeholder="请选择"   >
            <el-option
                    v-for="pro in brandOptions"
                    :key="pro.value"
                    :label="pro.label"
                    :value="pro.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBatchFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createBatchData">确认</el-button>

      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {curd} from '@/api/active/white'
  import {moreOptions,generalListQuery,generalOptions,getTableFields,getTemp,getBatchTemp} from './data/white';
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
        textAddMap:'批量新增',
        multipleSelection: [],
        brandOptions : [],
        isShowFilter:false, //是否线上table中列的显示隐藏下拉框
        total:0,
        listLoading:false,
        userOptions : [],
        dialogFormVisible:false,
        dialogBatchFormVisible:false,
        packageOptions:[],
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '新建'
        },
        temp:getTemp(),
        temps:getBatchTemp(),
        accountSearch: "",
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
      this.onLoad()
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
          this.brandOptions = response.data
          let typeOp = this._.find(this.moreOptions,{'value':'brand_id'})
          if(typeOp ){
            typeOp.options = response.data
          }
        })

        packageOptions().then(response => {
          this.packageOptions = response.data
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


      handleSelectionChange(data){
        this.multipleSelection = [];
        this._.forEach(data,(v) =>{
          this.multipleSelection.push(v.id)
        })
      },


      handleDel(row){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          curd('del',{id:[row.id]}).then(response => {
            this.getData()
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
          })
        }).catch(() => {
        })

      },


      handleChangeDel(val){
        if(this.multipleSelection.length > 0){
          let data = {
            id:this.multipleSelection
          };

          curd('del',data).then(response => {
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



      handleCreate() {
        this.initTemp()// 初始化值
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
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
      createBatchData() {
        this.$refs['dataBatchForm'].validate((valid) => {
          if (valid) {
            curd('addBatch',this.temps).then(() => {
              this.getData()
              this.dialogBatchFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            }).catch(() => {
              this.dialogBatchFormVisible = true
            })
          }
        })
      },

      handleCreateBatch() {
        this.initBatchTemp()// 初始化值
        this.dialogBatchFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataBatchForm'].clearValidate()
        })
      },

      handleUpdateInfo(row){
        this.initTemp()// 初始化值
        this.dialogStatus = 'update'
        curd('getOne',{id:row.id}).then((response) => {
          //
          this.temp = response.data
          this.dialogFormVisible= true
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
      initTemp(){
        this.temp = getTemp()
      },
      initBatchTemp(){
        this.temps = getBatchTemp()
      },
    }
  }
</script>

<style scoped>

</style>

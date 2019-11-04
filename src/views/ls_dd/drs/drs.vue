<template>
  <div class="app-container">
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
            <el-button  size="mini" type="danger"  @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </TableList>
    <pagination v-show="total>10" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getData" />
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="解析类型">
          <el-select v-model="temp.rrtype" placeholder="请选择">
            <el-option
              v-for="item in rrtypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主机记录">
          <el-input v-model="temp.rr"></el-input>
        </el-form-item>
        <el-form-item label="记录值">
          <el-input v-model="temp.rval"></el-input>
        </el-form-item>

        <el-form-item label="TTL">
          <el-select v-model="temp.ttl" placeholder="请选择">
            <el-option
              v-for="item in ttlOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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

  </div>
</template>

<script>
  import {curd} from '@/api/dd/drs'
  import {moreOptions,generalListQuery,generalOptions,getTableFields,getTemp,rrtypeOptions,ttlOptions} from './data/drs';
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
        textMap: {
          update: '编辑',
          create: '新建'
        },
        temp:getTemp(),
        rrtypeOptions:rrtypeOptions,
        ttlOptions:ttlOptions,

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
        this.listQuery.did = this.$route.params.did
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
            this.temp.status = 1
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
        this.temp.did = this.$route.params.did
      },
      handleDel(row){
        let data = {id:row.id};
        this.$confirm('确认要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          curd('del',data).then(() => {
            this.getData()
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          })
        })
      },
    }
  }
</script>

<style scoped>

</style>

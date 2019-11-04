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
      <el-form ref="dataForm"  :model="temp" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="别名">
          <el-input v-model="temp.cname"></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-button @click="selectIp(1)">首先IP</el-button>
          <el-input v-model="temp.ip1" disabled="disabled"></el-input>
          <el-button @click="selectIp(2)">备选IP</el-button>
          <el-input v-model="temp.ip2" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="temp.country" placeholder="请选择">
            <el-option
              v-for="item in countryOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item label="备注类型(同国家一致)">-->
          <!--<el-input v-model="temp.type"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="是否默认">
          <el-radio-group v-model="temp.remark">
            <el-radio-button label=1>是</el-radio-button>
            <el-radio-button label=0>否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button  v-if="dialogStatus==='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateInfo">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog  title="节点选择" :visible.sync="ipForm">
      <el-form ref="dataFormIp"   label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="节点" style="width: 600px">
        <el-transfer
          filterable
          filter-placeholder="请输入ip搜索"
          :titles="['所有节点','已选节点']"
          v-model="node_ids"
          :data="nodeOptions">
        </el-transfer>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  type="primary" @click="setIp(ip_num)">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {curd} from '@/api/defence/defence_ip'
  import {countryTypeMap} from '@/api/public'
  import {moreOptions,generalListQuery,generalOptions,getTableFields,getTemp} from './data/cname';
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
        countryOptions:[],
        dialogFormVisible:false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '新建'
        },
        temp:getTemp(),
        ipForm:false,
        nodeOptions:[],
        node_ids:[],
        ip_num:''
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
        countryTypeMap().then(response => {
          this.countryOptions = response.data
        })
        curd('getNode',this.listQuery).then(response => {
          this.nodeOptions = response.data
        })
      },

      selectIp(val){
        if(val===1){
          if(this.temp.ip1.length >0){
            let t =this.temp.ip1.split(',')
            for (var i=0;i<t.length;i++){
              t[i] = parseInt(t[i]);
            }
            this.node_ids = t
          }else{
            this.node_ids = []
          }
        }else{
          if(this.temp.ip2.length >0){
            let t =this.temp.ip2.split(',')
            for (var i=0;i<t.length;i++){
              t[i] = parseInt(t[i]);
            }
            this.node_ids = t
          }else{
            this.node_ids = []
          }
        }
        this.ip_num = val
        this.ipForm = true
      },
      setIp(ip_num){
        if(ip_num===1){
          this.temp.ip1 = this.node_ids.join(',')
        }else{
          this.temp.ip2 = this.node_ids.join(',')
        }

        this.ipForm = false
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
          //console.log(response)
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
      }
    }
  }
</script>

<style scoped>

</style>

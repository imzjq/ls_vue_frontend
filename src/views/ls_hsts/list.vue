<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery"  label-width="80px">


      <el-form style="margin-bottom: 10px;">
        <el-input v-model="listQuery.url" placeholder="输入域名" style="width:200px"></el-input>
        <el-select v-model="listQuery.brand_id" clearable  filterable placeholder="分类">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="listQuery.package_id" clearable  filterable placeholder="套餐">
          <el-option v-for="item in packageOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="getSearch" type="success">搜索</el-button>
      </el-form>



      <div class="filter-container">
        <p>选择套餐</p>
        <div style="margin: 15px 0;"></div>
          <el-row >
            <el-select  v-model="listQuery.package_id2"  style="width: 300px" clearable filterable placeholder="请选择"   >
              <el-option
                      v-for="pro in packageOptions"
                      :key="pro.value"
                      :label="pro.label"
                      :value="pro.value">
              </el-option>
            </el-select>
          </el-row>
      </div>

      <div class="filter-container" v-if="update">
        <p>域名</p>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="listQuery.checkedDefence" >
          <el-row >
            <el-col :span="5" v-for="(item,index) in defenceData" :key="index" >
              <el-checkbox  :label="item" >{{item}}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>

      <div class="filter-container" v-if="update">
        <el-form-item>
          <div >
            <el-button  type="primary" @click="onSubmit">添加</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>


    <TableList
            :listLoading="listLoading"
            :isShowFilter="isShowFilter"
            :data="tableData"
            :showFields="showFields"
            :tableFields="tableFields"
            :checkBox=false
            v-on:handleSelectionChange="handleSelectionChange"
    >
      <template slot="append">
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button   size="mini" type="danger"  @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>

    </TableList>


  </div>
</template>

<script>
  import {curd} from '@/api/active/hsts'
  import {brandOptions,packageOptions,domainDefenceUrlOptions} from '@/api/public'
  import {moreOptions,generalListQuery,generalOptions,getTableFields} from './data/hsts';
  import ConditionTemplate from '@/components/comlesu/ConditionTemplate'
  import TableList from '@/components/comlesu/TableList'
  import Vue from 'vue'
  export default {
    name: 'hsts',
    components:{
      ConditionTemplate,
      TableList,
    },
    data() {
      return {
        defenceData:[],
        listQuery: {
          brand_id :'',
          url :'',
          package_id :'',
          package_id2 : '',
          checkedDefence : [],
        },
        brandOptions:[],
        multipleSelection: [],
        disableStatus:true,
        packageOptions :[],

        update :false,
        showFields:[],
        tableFields:[],
        tableData:[],
        listLoading:false,
        isShowFilter:false, //是否线上table中列的显示隐藏下拉框
      }
    },
    created:function(){

      this.searchOptionsInit()
      /*********end***********/
      /****tableList***/
      this.tableInit()
      brandOptions().then(response => {
        this.brandOptions = response.data

      })
      packageOptions().then(response => {
        this.packageOptions= response.data
      })
      this.getSearch()
      this.getData()
    },


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

    mounted:function(){

    },
    methods: {

      searchOptionsInit(){
       // this.listQuery =generalListQuery()
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

      getData(){
        this.listLoading = true
        curd('getList',null).then(response => {
          //console.log(response.data)
          this.tableData = response.data.datas
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },

      getSearch()
      {

        domainDefenceUrlOptions(this.listQuery).then(response => {
          this.listQuery.checkedDefence = []
          this.defenceData = response.data
          this.update = true
        })
      },
      onSubmit() {
        if(this.listQuery.checkedDefence.length > 0){
          curd('add',this.listQuery).then(response => {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.getSearch()
            this.getData()

            if(response.data.error != '')
            {
              this.$message({
                message: response.data.error,
                type: 'error'
              })

            }
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


    },
  }
</script>

<style scoped>

</style>

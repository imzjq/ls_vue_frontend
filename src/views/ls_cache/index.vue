<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery"  label-width="80px">

      <el-form style="margin-bottom: 10px;">
        <el-input v-model="listQuery.url" placeholder="域名" style="width:200px"></el-input>
        <el-select v-model="listQuery.brand_id" clearable  filterable placeholder="分类">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="listQuery.package_id" clearable  filterable placeholder="套餐">
          <el-option v-for="item in packageOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="getList" type="success">搜索</el-button>
      </el-form>

      <div class="filter-container" v-if="update">
        <p>域名</p>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"  @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="listQuery.checkedUrl"  @change="handleCheckedChange">
          <el-row >
            <el-col :span="5" v-for="(item,index) in urlData" :key="index">
              <el-checkbox  :label="item" >{{item}}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>

      <div class="filter-container" v-if="update">
        <el-form-item>
          <div >
            <el-button  type="primary" @click="onSubmit">确定</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
  import {curd} from '@/api/cache/cache'
  import {brandOptions,packageOptions,domainDefenceUrlOptions} from '@/api/public'
  import { Message } from 'element-ui'
  export default {

    data() {
      return {
        isIndeterminate:false,
          checkAll : false,
        urlData:[],
        brandOptions:[],
        listQuery: {
          brand_id :'',
          url :'',
          package_id :'',
          checkedUrl : [],
        },
        disableStatus:true,
        packageOptions :[],
          update : false
      }
    },
    created:function(){
      brandOptions().then(response => {
        this.brandOptions = response.data

      })
      packageOptions().then(response => {
        this.packageOptions= response.data

      })

    },
    mounted:function(){

    },
    methods: {
      getList()
      {
        domainDefenceUrlOptions(this.listQuery).then(response => {
          this.listQuery.checkedUrl = []
          this.urlData = response.data
            this.update = true
        })
      },
      onSubmit() {
        if(this.listQuery.checkedUrl.length > 0){
          curd('clear',this.listQuery).then(() => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
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

        handleCheckAllChange(val){
            if(val == false) {
                this.listQuery.checkedUrl = []
                return false
            }
            let tmp = []
                this._.forEach(this.urlData,(value)=>{
                    tmp.push(value)
            })
            this.listQuery.checkedUrl = tmp ? tmp : [];
            this.isIndeterminate = false;
        },

        handleCheckedChange(value){
            let checkedCount = value.length;

            this.checkAll = checkedCount === this.urlData.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.urlData.length;

        },

    },
  }
</script>

<style scoped>

</style>

<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery"  label-width="80px">


      <div class="filter-container">
        <p>域名</p>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="listQuery.checkedDrsd" >
          <el-row >
            <el-col :span="5" v-for="(item,index) in drsdData" :key="index">
              <el-checkbox  :label="item.value" >{{item.label}}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>

      <div class="filter-container">
      <el-form-item label="解析类型">
        <el-select v-model="listQuery.rrtype" placeholder="请选择">
          <el-option
                  v-for="item in rrtypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主机记录">
        <el-input v-model="listQuery.rr" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="记录值">
        <el-input v-model="listQuery.rval" style="width: 300px"></el-input>
      </el-form-item>

      <el-form-item label="TTL">
        <el-select v-model="listQuery.ttl" placeholder="请选择">
          <el-option
                  v-for="item in ttlOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="listQuery.remarks" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
      </div>
    </el-form>


  </div>
</template>

<script>
  import {rrtypeOptions,ttlOptions} from './data/drs';
  import {curd} from '@/api/dd/drsd'
  import {drsdOptions} from '@/api/public'
  export default {
    data() {
      return {
        type : '',
        listQuery: {
          checkedDrsd : [],
          rrtype:'',
          rr:'',
          rval:'',
          ttl:600,
          remarks :'',
        },
        drsdData:[],
        disableStatus:true,
        rrtypeOptions:rrtypeOptions,
        ttlOptions:ttlOptions,
      }
    },
    created:function(){
      drsdOptions().then(response => {
        this.drsdData = response.data
      })
    },
    mounted:function(){

    },
    methods: {

      onSubmit() {
        curd('updatebatch',this.listQuery).then(() => {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {

        })
        //console.log(this.listQuery);
      },


    },
  }
</script>

<style scoped>

</style>

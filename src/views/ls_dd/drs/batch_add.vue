<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery"  label-width="80px">
      <el-form-item label="域名">
        <el-input type="textarea" :rows="10"  placeholder="请输入域名，多个用换行符隔开" v-model="listQuery.dnames"></el-input>
      </el-form-item>
      <el-form-item label="套餐">
        <el-select  v-model="listQuery.package_id"  style="width: 300px" clearable filterable placeholder="请选择"   >
          <el-option
                  v-for="pro in packageOptions"
                  :key="pro.value"
                  :label="pro.label"
                  :value="pro.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select  v-model="listQuery.brand_id"  style="width: 300px" clearable filterable placeholder="请选择"   >
          <el-option
                  v-for="pro in brandOptions"
                  :key="pro.value"
                  :label="pro.label"
                  :value="pro.value">
          </el-option>
        </el-select>
      </el-form-item>

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
        <el-button  type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {rrtypeOptions,ttlOptions} from './data/drs';
  import {curd} from '@/api/dd/drsd'
  import {brandOptions,packageOptions} from '@/api/public'
  export default {
    data() {
      return {
        brandOptions:[],
        type : '',
        listQuery: {
          package_id : '',
          dnames : '',
          brand_id : '',
          rrtype:'',
          rr:'',
          rval:'',
          ttl:600,
          remarks :'',
        },
        disableStatus:true,
        packageOptions:[],
        rrtypeOptions:rrtypeOptions,
        ttlOptions:ttlOptions,
      }
    },
    created:function(){
      brandOptions().then(response => {
        this.brandOptions = response.data
      })
      packageOptions().then(response => {
        this.packageOptions = response.data
      })
    },
    mounted:function(){

    },
    methods: {

      onSubmit() {
        curd('addbatch',this.listQuery).then(() => {
          this.$notify({
            title: '成功',
            message: '创建成功',
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

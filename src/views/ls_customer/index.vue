<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery"  label-width="80px">
      <div class="filter-container">
        <el-form-item label="帐号">
          <el-input v-model="listQuery.username" style="width: 300px" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="listQuery.mobile" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="通报邮箱">
          <el-input v-model="listQuery.email" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="onSubmit">修改</el-button>
        </el-form-item>
      </div>
    </el-form>


  </div>
</template>

<script>

  import {curd} from '@/api/customer/index'
  export default {
    data() {
      return {
        type : '',
        listQuery: {
          username:'',
          mobile:'',
          email:'',
        },
        disableStatus:true,
      }
    },
    created:function(){
      this.getOne();
    },
    mounted:function(){

    },
    methods: {
      getOne(){
        curd('getOne',null).then(response => {
          this.listQuery = response.data
        }).catch(() => {

        })

      },
      onSubmit() {
        curd('updateInfo',this.listQuery).then(() => {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {

        })
      },
    },
  }
</script>

<style scoped>

</style>

<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery"  label-width="100px">
      <div class="filter-container">
        <el-form-item label="原密码">
          <el-input v-model="listQuery.old_password" type ='password'   style="width: 300px" ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="listQuery.password" type ='password' style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码"  >
          <el-input v-model="listQuery.password2" type ='password' style="width: 300px"></el-input>
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
          password2:'',
          password:'',
          old_password:'',
        },
        disableStatus:true,
      }
    },
    created:function(){

    },
    mounted:function(){

    },
    methods: {

      onSubmit() {
        curd('upPass',this.listQuery).then(() => {
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

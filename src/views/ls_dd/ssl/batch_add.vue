<template>
  <div class="app-container">
    <el-form ref="dataForm"   :model="temp" label-position="left" label-width="90px" style='width: 800px; margin-left:50px;' v-loading="listLoading">
      <el-form-item label="套餐">
        <el-select  v-model="temp.package_id"  style="width: 300px" clearable filterable placeholder="请选择"    >
          <el-option
                  v-for="pro in packageOptions"
                  :key="pro.value"
                  :label="pro.label"
                  :value="pro.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="私钥">
        <!--<el-input type="textarea" :rows="10"  placeholder="" v-model="temp.pb_filename" disabled="disabled" ></el-input>-->
        <div class="filter-container" >
          <div style="margin: 15px 0;"></div>
          <el-row  >
            <el-col :span="5" v-for="(item,index) in temp.sslPbData" :key="index">
              {{item.filename}}
            </el-col>
          </el-row>
        </div>

        <!--<el-upload-->
        <!--class="upload-demo"-->
        <!--action="/api/user-cer/batch-upload"-->
        <!--:on-success="handleSuccessPb"-->
        <!--:limit="200"-->
        <!--:on-exceed="handleExceed"-->
        <!--:show-file-list="false"-->
        <!--multiple-->
        <!--:headers="{-->
        <!--token:token,-->
        <!--}"-->
        <!--&gt;-->
        <!--<el-button size="small" type="primary">上传私钥文件</el-button>-->
        <!--</el-upload>-->
      </el-form-item>


      <el-form-item label="证书">
        <!--<el-input type="textarea" :rows="10"  placeholder="" v-model="temp.pv_filename" disabled="disabled"></el-input>-->
        <div class="filter-container">
          <div style="margin: 15px 0;"></div>
          <el-row >
            <el-col :span="5" v-for="(item,index) in temp.sslPvData" :key="index">
              {{item.filename}}
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      <el-form-item label="">
        <!--<el-input type="textarea" :rows="10"  placeholder="" v-model="temp.pv_filename" disabled="disabled"></el-input>-->
        <div class="filter-container">
          <div style="margin: 15px 0;"></div>
          <el-row >
            <el-col :span="4" >
              <el-upload
                      ref ="upload"

                      class="upload-demo"
                      action="/api/user-cer/batch-pv-upload"
                      :on-success="handleSuccessPv"
                      :limit="200"
                      :on-exceed="handleExceed"
                      :show-file-list="false"
                      multiple
                      :headers="{
                token:token,
              }"
              >
                <el-button size="small" type="primary">批量上传</el-button>
              </el-upload>
            </el-col>
            <el-col :span="4" >
              <el-button   type="success" @click="reset">重置</el-button>
            </el-col>
            <el-col :span="4" >
              <el-button   type="primary" @click="createData">确认</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

    </el-form>

    <!--<div style="margin-left: 100px">-->
    <!--<el-button   type="primary" @click="createData">确认</el-button>-->
    <!--</div>-->

    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" title="上传结果" :visible.sync="previewDialog">
      <preview :data="previewData"></preview>
    </el-dialog>

  </div>
</template>
<script>
  import {curd} from '@/api/dd/ssl'
  import ConditionTemplate from '@/components/comlesu/ConditionTemplate'
  import {packageOptions} from '@/api/public'
  import Vue from 'vue'
  import { getToken } from "@/utils/auth"
  import preview from './preview'
  export default {
    components:{
      ConditionTemplate,
      preview,
    },
    data(){
      return {
        token: getToken(),
        pem_test:"",
        /****start公共搜索需要用的值***/
        selectedMore:[],
        //是否显示搜索框或者select框
        isShow:{},
        //包含每个select或input框中选中的值
        listQuery:undefined,
        /*********end***********/
        /********table*********/
        showFields:[],
        multipleSelection: [],
        isShowFilter:false, //是否线上table中列的显示隐藏下拉框
        total:0,
        listLoading:false,
        packageOptions:[],
        dialogFormVisible:false,
        dialogStatus: '',
        previewData:[],
        previewDialog:false,
        temp:{
          package_id: '',
          sslPbData:[],
          sslPvData:[],
        },

        update:false,
      }
    },
    created:function(){
      //动态获取数据
      packageOptions().then(response => {
        this.packageOptions = response.data
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

      tanchu(msg)
      {
        var x = document.getElementsByClassName("el-notification__content");
        if(x.length == 0 ) {
          this.$notify({
            title: '注意',
            message: msg,
            type: 'error',
            duration: 20000000
          })
        }else{
          let p = document.createElement('p')
          //  x[0].append("<p>"+msg+"</p>");
          p.innerHTML = msg;
          x[0].appendChild(p);;
        }

      },

      /****start公共搜索***/
      search(){
        //console.log(this.listQuery);
      },
      /*********end***********/

      //请求接口获取数据

      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true;
            curd('batchAdd',this.temp).then(response => {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '上传成功',
                type: 'success',
                duration: 2000
              })
              this.previewDialog = true;
              this.listLoading = false ;
              this.previewData = response.data
              this.temp = {
                package_id: '',
                sslPbData:[],
                sslPvData:[],
              }
            }).catch(() => {
              this.listLoading = false ;
              this.dialogFormVisible = true
            })
          }
        })
      },

      reset()
      {
        this.$refs['upload'].clearFiles();
        this.temp.sslPvData = [];
        this.temp.sslPbData = [];
      },



      //文件上传相关
      // handleSuccessPb(response, file, fileList) {
      //   if(response.code == 500){
      //     this.$notify({
      //       title: '注意',
      //       message: response.msg,
      //       type: 'error',
      //       duration: 2000
      //     })
      //     return false;
      //   }
      //   //console.log(this.temp.sslPbData.length);
      //   var i = true;
      //   this._.forEach(this.temp.sslPbData,(value)=>{
      //    if(value.filename == response.data.filename) {
      //      this.$notify({
      //        title: '注意',
      //        message: response.data.filename+"文件已经存在",
      //        type: 'error',
      //        duration: 2000
      //      })
      //      i =false ;
      //    }
      //   })
      //   if(i == true)
      //   this.temp.sslPbData.push({'filename':response.data.filename,'content':response.data.content});
      //
      // },

      handleSuccessPv(response, file, fileList) {

        if(response.code == 500){
          this.tanchu(response.msg)
          // this.$notify({
          //   title: '注意',
          //   message: response.msg,
          //   type: 'error',
          //   duration: 2000
          // })

          return false;
        }
        var i = true;
        if(response.data.type == 'pv') {
          this._.forEach(this.temp.sslPvData, (value) => {
            if (value.filename == response.data.filename) {
              this.tanchu(response.data.filename + "文件已经存在")
              // this.$notify({
              //   title: '注意',
              //   message: response.data.filename + "文件已经存在",
              //   type: 'error',
              //   duration: 2000
              // })
              i = false;
            }
          })
          if (i == true)
            this.temp.sslPvData.push({'filename': response.data.filename, 'content': response.data.content});
        }else if(response.data.type =='pb')
        {
          this._.forEach(this.temp.sslPbData,(value)=>{
            if(value.filename == response.data.filename) {
              this.tanchu(response.data.filename + "文件已经存在")
              // this.$notify({
              //   title: '注意',
              //   message: response.data.filename+"文件已经存在",
              //   type: 'error',
              //   duration: 2000
              // })
              i =false ;
            }
          })
          if(i == true)
            this.temp.sslPbData.push({'filename':response.data.filename,'content':response.data.content});
        }

      },

      handleExceed()
      {
        this.$message({ message: '每次最多上传200个证书', type: 'error' })
        // this.$notify({
        //   title: '注意',
        //   message: '每次最多上传200个',
        //   type: 'error',
        //   duration: 3000
        // })
      },



    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery"  label-width="80px" >



      <el-form-item label="域名">
        <el-input type="textarea" :rows="10"  placeholder="请输入域名，多个用换行符隔开" v-model="listQuery.dnames"></el-input>
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

      <el-form-item label="类型">
        <el-radio-group v-model="listQuery.stype">
          <el-radio :label=1>加速</el-radio>
          <el-radio :label=2>轮询</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="部署状态">
        <el-radio-group v-model="listQuery.status">
          <el-radio :label=2>部署</el-radio>
          <el-radio :label=1>未部署</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-if="nextShow">
        <el-form-item label="回源设置">
          <el-card shadow="always">
            <el-col :span="8" style="text-align:center">
              访问设置
            </el-col>
            <el-col :span="11" style="text-align:center">
              回源设置
            </el-col>
            <el-col :span="4" >
              选项
            </el-col>
            <el-row :gutter="12" v-for="(item,index) in listQuery.remapData" :key="index">
              <el-col :span="3">
                <el-select v-model="item.visit_protocol"   placeholder="协议">
                  <el-option
                          v-for="pro in protocolOptions"
                          :key="pro.value"
                          :label="pro.label"
                          :value="pro.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-input v-model="item.originurl"  placeholder="主机头"></el-input>
              </el-col>

              <el-col :span="2">
                <el-input v-model="item.originport"  placeholder="端口"></el-input>
              </el-col>

              <el-col :span="3">
                <el-select v-model="item.origin_protocol" placeholder="协议"  >
                  <el-option
                          v-for="pro in originProtocolOptions"
                          :key="pro.value"
                          :label="pro.label"
                          :value="pro.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-input v-model="item.aimurl" placeholder="回源IP"  ></el-input>
              </el-col>
              <el-col :span="2">
                <el-input v-model="item.aimport" placeholder="回源端口" ></el-input>
              </el-col>
              <el-col :span="3" >
                <el-form-item   label="301开关" >
                  <el-switch v-model="item.redirect_ssl" active-value="1" inactive-value="0"></el-switch>
                  <el-input type="hidden" v-model="item.is_at" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-button v-if="index !==0" type="danger" icon="el-icon-delete" @click="delEl(index)" circle></el-button>
            </el-row>
            <el-button v-if="" type="primary"  @click="addEl">+</el-button>
          </el-card>
        </el-form-item>

      </div>

      <el-form-item>
        <el-button v-if="!nextShow"  type="primary" @click="next">下一步</el-button>
        <div  v-if="nextShow">
          <el-button  type="primary" @click="onSubmit">确定</el-button>
          <!--<el-button @click="preview">预览</el-button>-->
        </div>
      </el-form-item>
    </el-form>
    <!--<el-dialog title="remap预览" :visible.sync="previewDialog">-->
      <!--<preview :data="previewData"></preview>-->
      <!--<el-button v-if="!update"  type="primary" @click="onSubmit">确定</el-button>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  import {curd} from '@/api/dd/domain'
  import {brandOptions,packageOptions} from '@/api/public'
  import preview from './preview'
  export default {
    components:{
      preview
    },
    data() {
      return {
        protocolOptions:[
          {
            value:'http://',
            label:'http://',
          },
          {
            value:'https://',
            label:'https://',
          },
          {
            value:'ws://',
            label:'ws://',
          },
          {
            value:'wss://',
            label:'wss://',
          },
        ],
        originProtocolOptions:[
          {
            value:'http://',
            label:'http://',
          },
          {
            value:'https://',
            label:'https://',
          },
          {
            value:'ws://',
            label:'ws://',
          },
          {
            value:'wss://',
            label:'wss://',
          },
        ],
        did:0,
        update:false,
        brandOptions:[],
        type : '',
        listQuery: {
          stype : 1,
          brand_id : '',
          dnames: '',
          package_id : '',
          originip: '',
          is_https : 0,
          status:2,
          remap:1,

          remapData: [
            //{ visit_protocol: '', originurl: '',origin_protocol:'',aimurl:'',aimport:'',is_at:'',redirect_ssl:''}
          ],

        },
        disableStatus:true,
        nextShow:true,
        previewData:[],
        previewDialog:false,
        packageOptions :[],
      }
    },
    created:function(){
      this.update = false
      this.nextShow = false
      this.did = 0;
      if(this.$route.params.did){
        this.did = this.$route.params.did
      }

      if(this.did > 0){
        this.getOne(this.did)
      }

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
      getOne(id){
        this.update = true
        curd('getOne',{id:id}).then(response => {
          this.listQuery = response.data
          this.nextShow = true
        }).catch(() => {
          this.$router.push({ name: 'domain_index'})
          this.nextShow = false
        })

      },

      hasChange(){
        //发送改变了，下一步隐藏
        this.nextShow = false
      },
      next(){

        //判断是否填写域名，回原ip,
        curd('batchnext',this.listQuery).then(response => {
          this.listQuery.remapData =[]
          this.listQuery.remapData.push(this.firstRemap(response.data.aimurl,response.data.aimport,response.data.originport))
          this.listQuery.user_id = response.data.user_id
          this.nextShow = true
        }).catch(() => {
          this.nextShow = false
        })
      },




      onSubmit() {this.upOriginip();
        curd('addbatch',this.listQuery).then(() => {
          this.previewDialog = false;
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
          this.resetUrl()
        }).catch(() => {
          this.previewDialog = true;
        })
      },
      preview(){
        curd('batchpreview',this.listQuery).then(response => {
          this.previewDialog = true;
          this.previewData = response.data
        })
      },
      upOriginip()
      {
        if(this.listQuery.remapData.length > 0){
          this.listQuery.originip =  this.listQuery.remapData[0]['aimurl'];
        }
      },
      onUpdate(){
        this.upOriginip();
        curd('update',this.listQuery).then(() => {
          this.previewDialog = false;
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.previewDialog = true;
        })
      },
      addEl(){
        let cope = this.initRemap()
        this.listQuery.remapData.push(cope);
      },
      delEl(index){
        this.listQuery.remapData.splice(index, 1);
      },
      initRemap(){
        return {
          visit_protocol: 'http://',
          originurl: '',
          originurl_disable:false,
          origin_protocol:'http://',
          disable:false,
          aimurl:'',
          aimport:'80',
          originport : '',
          is_at:'0',
          redirect_ssl:0
        }
      },
      firstRemap(aimurl,aimport,originport){
        return {
          visit_protocol: 'http://',
          originurl: '@',
          disable:true,
          origin_protocol:'http://',
          aimurl:aimurl,
          aimport:aimport,
          originport :originport,
          is_at:1,
          redirect_ssl:0
        }
      },


      resetUrl()
      {
        this.$router.push({ name: 'domain_index'})
      },

    },
  }
</script>

<style scoped>

</style>

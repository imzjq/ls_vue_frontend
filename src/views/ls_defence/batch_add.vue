<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery"  label-width="80px">

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

      <el-form-item label="回原地址" v-show="false">
        <el-input v-model="listQuery.originip"  ></el-input>
      </el-form-item>

      <el-form-item label="是否部署">
        <el-radio-group v-model="listQuery.status" >
          <el-radio :label="1">未部署</el-radio>
          <el-radio :label="2">部署</el-radio>
        </el-radio-group>
      </el-form-item>


      <div>
        <el-form-item label="域名">
          <el-card shadow="always">
            <el-row :gutter="8" v-for="(item,index) in listQuery.remapData" :key="index" style="margin-bottom: 20px">
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
                <el-input v-model="item.originurl"   v-if="update"  placeholder="域名"></el-input>
                <el-input v-model="item.originurl" @change="getCname"  v-if="!update"  placeholder="域名"></el-input>
              </el-col>
              <el-col :span="2">
                <el-input v-model="item.originport"  placeholder="端口"></el-input>
              </el-col>
              <el-button v-if="index !==0" type="danger" icon="el-icon-delete" @click="delEl(index)" circle></el-button>
            </el-row>
            <el-button v-if="" type="primary"  @click="addEl">+</el-button>
          </el-card>
        </el-form-item>

        <el-form-item label="新回源">
          <el-card shadow="always">

            <el-row :gutter="11">
              <el-col :span="3">
                <el-select v-model="listQuery.origin_protocol" placeholder="协议"  >
                  <el-option
                          v-for="pro in originProtocolOptions"
                          :key="pro.value"
                          :label="pro.label"
                          :value="pro.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-input v-model="listQuery.aimurl" placeholder="回源IP"  ></el-input>
              </el-col>
              <el-col :span="3">
                <el-input v-model="listQuery.aimport" placeholder="回源端口" ></el-input>
              </el-col>
            </el-row>
          </el-card>
        </el-form-item>
        <el-form-item label="cname">
          <el-input v-model="listQuery.cname" disabled="disabled" ></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <div  >
          <el-button v-if="!update"  type="primary" @click="onSubmit">确定</el-button>
        </div>
      </el-form-item>
    </el-form>




  </div>
</template>

<script>
  import {curd} from '@/api/defence/defence'
  import {brandOptions,packageOptions} from '@/api/public'
  export default {
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
        listQuery: {
          stype : 2,
          brand_id : '',
          package_id : '',
          originip: '',
          status: 2 ,
          is_https : 0,
          cname : '',
          aimurl : "",
          aimport : '80',
          origin_protocol :'http://',
          remapData: [
            //{ visit_protocol: '', originurl: '',origin_protocol:'',aimurl:'',aimport:'',is_at:'',redirect_ssl:''}
          ],

        },
        brandOptions : [],
        packageOptions:[],
        disableStatus:true,

        previewData:[],
        previewDialog:false,
      }
    },
    created:function(){
      this.update = false

      this.listQuery.remapData =[]
      this.listQuery.remapData.push(this.firstRemap("","80",""))

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


      getCname(val){
        let url = '';
        if(this.listQuery.remapData.length > 0){
           url = this.listQuery.remapData[0]['originurl'];
        }
        if(this.listQuery.username != '' && url != '')
        {
          curd('next',{username:this.listQuery.username,dname:url,originip:''}).then(response => {
            this.listQuery.cname = response.data.cname
          }).catch(() => {

          })
        }
      },

      onSubmit() {this.upOriginip();
        curd('batchAdd',this.listQuery).then(() => {
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

      resetUrl()
      {
        this.$router.push({ name: 'defence_index'})
      },
      upOriginip()
      {
        if(this.listQuery.remapData.length > 0){
          this.listQuery.originip =  this.listQuery.remapData[0]['aimurl'];
          this.listQuery.dname = this.listQuery.remapData[0]['originurl'];
        }
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

          originport : '80',

        }
      },
      firstRemap(aimurl,aimport,originport){
        return {
          visit_protocol: 'http://',
          originurl: '',
          originport :'80',
        }
      },



    },
  }
</script>

<style scoped>

</style>

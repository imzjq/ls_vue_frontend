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



      <div v-if="nextShow">

        <!--<el-form-item label="https开关">-->
          <!--<el-radio-group v-model="listQuery.is_https" @change="changeHttps">-->
            <!--<el-radio :label="1">开启</el-radio>-->
            <!--<el-radio :label="0">关闭</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="https开关">-->
          <!--<el-switch v-model="listQuery.is_https" @change="changeHttps" active-value="1" inactive-value="0"></el-switch>-->
        <!--</el-form-item>-->
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

              <el-col :span="2">
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

              <el-col :span="2">
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
              <el-col :span="3">
                <el-input v-model="item.aimport" placeholder="回源端口" ></el-input>
              </el-col>
              <el-col :span="3" >
                <el-form-item    label="301开关" >
                  <el-switch v-model="item.redirect_ssl" active-value="1" inactive-value="0"></el-switch>
                  <el-input type="hidden" v-model="item.is_at" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-button v-if="index !==0" type="danger" icon="el-icon-delete" @click="delEl(index)" circle></el-button>
            </el-row>
            <el-button v-if="" type="primary"  @click="addEl">+</el-button>
          </el-card>
        </el-form-item>

        <el-form-item label="cname">
          <el-input v-model="listQuery.cname" disabled="disabled" ></el-input>
        </el-form-item>
        <!--<el-form-item label="部署状态">-->
          <!--<el-radio-group v-model="listQuery.status">-->
            <!--<el-radio :label=2>部署</el-radio>-->
            <!--<el-radio :label=1>部署中</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
      </div>

      <el-form-item>
        <el-button v-if="!nextShow"  type="primary" @click="next">下一步</el-button>
        <div  v-if="nextShow">
          <el-button v-if="!update"  type="primary" @click="onSubmit">确定</el-button>
          <el-button v-else="update"  type="primary" @click="onUpdate">修改</el-button>

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
          dname: '',
          originip: '',
          status: 2 ,
          is_https : 0,
          remap:1,
          cname : '',
          remapData: [
            //{ visit_protocol: '', originurl: '',origin_protocol:'',aimurl:'',aimport:'',is_at:'',redirect_ssl:''}
          ],

        },
        brandOptions : [],
        packageOptions:[],
        disableStatus:true,
        nextShow:true,
      }
    },
    created:function(){
      this.update = false
      this.nextShow = true
      this.did = 0;
      if(this.$route.params.did){
        this.did = this.$route.params.did
      }
      this.listQuery.remapData =[]
      this.listQuery.remapData.push(this.firstRemap("","80",""))
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

      next(){
        //判断是否填写域名，回原ip,
        curd('next',this.listQuery).then(response => {
          this.listQuery.remapData =[]
          this.listQuery.remapData.push(this.firstRemap(response.data.aimurl,response.data.aimport,response.data.originport))
          this.listQuery.user_id = response.data.user_id
          this.listQuery.cname = response.data.cname
          this.nextShow = true
        }).catch(() => {
          this.nextShow = false
        })

      },

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
        curd('add',this.listQuery).then(() => {

          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
          this.resetUrl()
        }).catch(() => {

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
      onUpdate(){

        this.upOriginip();
        curd('update',this.listQuery).then(() => {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
          this.resetUrl()
        }).catch(() => {

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
          is_at:'0',
          redirect_ssl:0
        }
      },
      firstRemap(aimurl,aimport,originport){
        return {
          visit_protocol: 'http://',
          originurl: '',
          disable:true,
          origin_protocol:'http://',
          aimurl:aimurl,
          aimport:aimport,
          originport :originport,
          is_at:1,
          redirect_ssl:0
        }
      },



    },
  }
</script>

<style scoped>

</style>

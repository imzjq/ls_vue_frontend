<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery"  label-width="80px">


      <el-form style="margin-bottom: 10px;">
        <el-input v-model="listQuery.ip" placeholder="回源ip" style="width:200px"></el-input>
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
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="listQuery.checkedDefence" >
          <el-row >
            <el-col :span="5" v-for="(item,index) in defenceData" :key="index">
              <el-checkbox  :label="item.value" >{{item.label}}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>

      <div class="filter-container" v-if="update">
        <el-form-item label="新回源">
          <el-card shadow="always">
            <el-row :gutter="13" v-for="(item,index) in listQuery.remapData" :key="index">
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
            </el-row>
          </el-card>
        </el-form-item>
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
  import {curd} from '@/api/defence/defence'
  import {brandOptions,packageOptions,defenceRemapOptions} from '@/api/public'
  export default {
    data() {
      return {
        protocolOptions:[
          {
            value:'http://',
            label:'http://',
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
        defenceData:[],
        listQuery: {
          brand_id :'',
          ip :'',
          package_id :'',
          checkedDefence : [],
          remapData: [
          ],
        },
        brandOptions:[],
        disableStatus:true,
        packageOptions :[],
        update :false
      }
    },
    created:function(){

      this.listQuery.remapData =[]
      this.listQuery.remapData.push(this.firstRemap("","80"))

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

        defenceRemapOptions(this.listQuery).then(response => {
          this.listQuery.checkedDefence = []
          this.defenceData = response.data
          this.update = true
        })
      },


      onSubmit() {
        if(this.listQuery.checkedDefence.length > 0){
          curd('batchUpdateOrigin',this.listQuery).then(() => {
            this.$notify({
              title: '成功',
              message: '修改成功',
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



      addEl(){
        let cope = this.initRemap()
        this.listQuery.remapData.push(cope);
      },
      delEl(index){
        this.listQuery.remapData.splice(index, 1);
      },
      initRemap(){
        return {
          origin_protocol:'http://',
          aimurl:'',
          aimport:'80',
        }
      },
      firstRemap(aimurl,aimport){
        return {
          origin_protocol:'http://',
          aimurl:aimurl,
          aimport:aimport,
        }
      },
    },
  }
</script>

<style scoped>

</style>

<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="5" :sm="5" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('domain_index')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="documentation" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">单域名</div>
          <count-to :start-val="0" :end-val="data.domainCount" :duration="100" class="card-panel-num"/>
        </div>
      </div>
    </el-col>

    <el-col :xs="5" :sm="5" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('defence_index')">
        <div class="card-panel-icon-wrapper icon-message">
          <!--<svg-icon icon-class="message" class-name="card-panel-icon" />-->
          <svg-icon icon-class="example" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">多域名</div>
          <count-to :start-val="0" :end-val="data.defenceCount" :duration="100" class="card-panel-num"/>
        </div>
      </div>
    </el-col>

    <el-col :xs="5" :sm="5" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('drsd_index')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="component" class-name="card-panel-icon"  />
          <!--<svg-icon icon-class="money" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">解析数量</div>
          <count-to :start-val="0" :end-val="data.drsdCount" :duration="100" class="card-panel-num"/>
        </div>
      </div>
    </el-col>

    <el-col :xs="5" :sm="5" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('ssl_index')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <!--<svg-icon icon-class="shopping" class-name="card-panel-icon" />-->
          <svg-icon icon-class="tab" class-name="card-panel-icon"  />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">证书数</div>
          <count-to :start-val="0" :end-val="data.sslCount" :duration="100" class="card-panel-num"/>
        </div>
      </div>
    </el-col>

    <el-col :xs="5" :sm="5" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('ssl_index')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="tab" class-name="card-panel-icon"  />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">将过期证书</div>
          <count-to :start-val="0" :end-val="data.overSslCount" :duration="100" class="card-panel-num"/>
        </div>
      </div>
    </el-col>

    <el-col :xs="5" :sm="5" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('ssl_index',{is_valid:1})">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="tab" class-name="card-panel-icon"  />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">过期证书数</div>
          <count-to :start-val="0" :end-val="data.limitSslCount" :duration="100" class="card-panel-num"/>
        </div>
      </div>
    </el-col>

    <el-col :xs="5" :sm="5" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('active_white')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="international" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">白名单</div>
          <count-to :start-val="0" :end-val="data.whiteCount" :duration="100" class="card-panel-num"/>
        </div>
      </div>
    </el-col>

    <el-col :xs="5" :sm="5" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('active_black')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="component" class-name="card-panel-icon"  />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">黑名单</div>
          <count-to :start-val="0" :end-val="data.blackCount" :duration="100" class="card-panel-num"/>
        </div>
      </div>
    </el-col>


    <el-col :xs="5" :sm="5" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('customer_package')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">套餐详情</div>
          <count-to :start-val="0" :end-val="data.packageCount" :duration="100" class="card-panel-num"/>
        </div>
      </div>
    </el-col>


  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import {userBaseConfig} from '@/api/public'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      data : {
        domainCount: 0,
        defenceCount: 0,
        drsdCount: 0,
        sslCount: 0,
        limitSslCount: 0,
        overSslCount : 0,
        whiteCount : 0,
        blackCount :0,
        packageCount : 0,
      },
      // lineChartData: lineChartData.newVisitis
    }
  },
  created:function(){
    this.onLoad();
  },
  methods: {
    handleSetLineChartData(type,para = {}) {

      this.$router.push({ name: type,params:para})
    },
    onLoad()
    {
      userBaseConfig().then(response => {
        this.data = response.data;
      })
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>

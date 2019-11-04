<template>
    <span>
        <el-select  v-for="(obj,index) in data" :key="index" @change="search" @clear="search"   v-if="isShow[obj.value] && obj.type==='select'" v-model="listQuery[obj.value]" filterable  collapse-tags  :placeholder="obj.name + ''" clearable style="width: 220px" class="filter-item common">
            <el-option v-for="item in obj.options" :key="item.value" :label="item.name" :value="item.value"/>
        </el-select>
        <el-input clearable  v-for="(obj,index) in data" :key="index"    v-if="isShow[obj.value] && obj.type==='input'" v-model="listQuery[obj.value]" :placeholder="obj.name "  class="input-with-select common">
            <el-button @click.native="search"  slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-date-picker
            v-for="(obj,index) in data" :key="index"    v-if="isShow[obj.value] && obj.type==='date'" v-model="listQuery[obj.value]" :placeholder="obj.name "
            @change="search"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions2">
        </el-date-picker>

        <el-date-picker
                v-for="(obj,index) in data" :key="index"    v-if="isShow[obj.value] && obj.type==='date_7'" v-model="listQuery[obj.value]" :placeholder="obj.name "
                @change="search"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions7">
        </el-date-picker>

         <el-date-picker
                 v-for="(obj,index) in data" :key="index"    v-if="isShow[obj.value] && obj.type==='date_3'" v-model="listQuery[obj.value]" :placeholder="obj.name "
                 @change="search"
                 type="daterange"
                 align="right"
                 unlink-panels
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期"
                 value-format="yyyy-MM-dd"
                 :picker-options="pickerOptions3">
        </el-date-picker>

    </span>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      },
      isShow:{
        required: true
      },
      listQuery:{
        required:true
      },
    },
    data(){
      return {
        pickerOptions2: {
          disabledDate(time) {
            let _now = Date.now(),
              seven = 60 * 24 * 60 * 60 * 1000,
              sevenDays = _now - seven;
            return time.getTime() > _now || time.getTime() < sevenDays;
          },
          shortcuts: [
            {
              text: '当天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', [start, end]);
              }
            },
            {
                text: '七天',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
            },
            {
                text: '当月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  //start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
                  picker.$emit('pick', [start, end]);
                }
            },
            {
              text: '上月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                var day = new Date(start.getFullYear(), start.getMonth(), 0).getDate()
                start.setTime(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1))
                end.setTime(new Date(new Date().getFullYear(), new Date().getMonth())-1)
                picker.$emit('pick', [start, end]);
              }
            },

          ]
        },

          pickerOptions7: {
              disabledDate(time) {
                  let _now = Date.now(),
                      //seven = 60 * 24 * 60 * 60 * 1000,
                      seven = 60 * 24 * 60 * 7 * 1000,
                      sevenDays = _now - seven;
                  return time.getTime() > _now || time.getTime() < sevenDays;
              },
              shortcuts: [
              ]
          },

          pickerOptions3: {
              disabledDate(time) {
                  let _now = Date.now(),
                      //seven = 60 * 24 * 60 * 60 * 1000,
                      seven = 60 * 24 * 60 * 3 * 1000,
                      sevenDays = _now - seven;
                  return time.getTime() > _now || time.getTime() < sevenDays;
              },
              shortcuts: [
              ]
          },


      }
    },
    methods:{
      search: function () {
        // 子组件中触发父组件方法
        this.$emit('search')
      }
    },

  }
</script>

<style scoped>
    .input-with-select{
        width: 260px;
        background-color: #fff;
    }
    .common{
        padding: 5px 5px 5px 0px;
    }
    .filter-container .filter-item{
      margin-top: 7px;
    }
</style>

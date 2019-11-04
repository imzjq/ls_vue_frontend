<template>
    <div>
        <el-select v-if="isShowFilter" v-model="showFieldsOwn"  multiple collapse-tags   placeholder="" clearable style="width: 150px;margin-left: 10px;" class="filter-item">
            <el-option  v-for="item in tableFields"  :key="item.field" :label="item.name" :value="item.field"/>
        </el-select>
        <el-table v-loading="listLoading" border fit highlight-current-row ref="multipleTable" :data="data" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column v-if="checkBox" type="selection" width="55">
            </el-table-column>
            <el-table-column v-for="(item,index) in tableFields" :key="index" v-if="showFieldsOwn.indexOf(item.field)>-1" :label="item.name" :width="item.width"  show-overflow-tooltip>
               <template slot-scope="scope">
                   <!--url可能没办法做到通用，待定--->
                   <span v-if="item.url">
                       <router-link  :to="item.url + scope.row[item.field]">{{ scope.row[item.field] }}</router-link>
                   </span>
                   <span v-else>
                       {{ scope.row[item.field] }}
                   </span>
               </template>
            </el-table-column>
            <slot name="append" />
        </el-table>
    </div>
</template>

<script>
  export default {
    name: 'TableList',
    props:{
      //数据列表
      data:{
        required:true,
      },
      //展示列的显示
      showFields:{
        required:true,
      },
      //数据列中的每个字段
      tableFields:{
        required:true,
      },
      //是否要显示列的选择
      isShowFilter:{
        type:Boolean,
        default: false
      },
      //是否要显示checkbox
      checkBox:{
        type:Boolean,
        default: false
      },
      listLoading:{
        type:Boolean,
        default: false
      },
    },
    data () {
      return{
        showFieldsOwn:this.showFields
      };
    },
    created:function(){

    },
    methods:{
      handleSelectionChange(val){
        this.$emit('handleSelectionChange',val)
      },
    }
  }
</script>

<style scoped>
    a{
        color: #e60d0d;
    }
</style>

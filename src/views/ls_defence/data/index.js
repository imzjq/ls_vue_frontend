let _ = require('lodash')


//生成搜索默认值
export function generalListQuery() {
  //
  var listQuery = {
    page: 1,
    limit: 10,
  }

  _.forEach(moreOptions,function (obj) {
    listQuery[obj.value] = obj.defaultType
  })
  return listQuery
}

//生成默认下来数据options
export function generalOptions() {
  var options = {}
  _.forEach(moreOptions,function (obj) {
    options[obj.value + 'Options'] = obj.options
  })
  return options
}

//选择更多
export const moreOptions = [
  {
    'value':'package_id',
    'name':'套餐',
    'defaultType':[],
    'options':[
    ],
    'type':'select',
    'isShow':true,
  },
  {
    'value':'brand_id',
    'name':'品牌',
    'defaultType':[],
    'options':[
    ],
    'type':'select',
    'isShow':true,
  },
  {
    'value':'dname',
    'name':'域名',
    'defaultType':'',
    'options':[],
    'type':'input',
    'isShow':true,
  },



]


//===================table数据===========================
export function getTableFields(){
  return  [
    {
      'field':'id',
      'name':'ID',
      'defaultShow':false,
      'width':'0',
      'url':false, //url 是否有a 标签
    },


    {
      'field':'dname',
      'name':'域名',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'200',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'cname',
      'name':'别名',
      'defaultShow':true,
      'width':'',
      'url':false,
    },
    {
      'field':'stype',
      'name':'类型',
      'defaultShow':true,
      'width':'',
      'url':false,
    },
    {
      'field':'package_name',
      'name':'套餐',
      'defaultShow':true,
      'width':'',
      'url':false,
    },
    {
      'field':'brand_name',
      'name':'品牌',
      'defaultShow':true,
      'width':'',
      'url':false,
    },
    {
      'field':'status',
      'name':'状态',
      'defaultShow':true,
      'width':'80',
      'url':false,
    },

    {
      'field':'status_int',
      'name':'status_int',
      'defaultShow':false,
      'width':'',
      'url':false,
    },
  ]
}
//表单中的字段
export function getTemp() {
  return {
    id:'',
    dname:'',
    cname:'',
    status:'',

  }
}



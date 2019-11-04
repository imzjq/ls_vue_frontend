let _ = require('lodash')


//生成搜索默认值
export function generalListQuery() {
  //
  var listQuery = {
    page: 1,
    limit: 10000,
    checkedProvince:[],
    checkedService:[],
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
  // {
  //   'value':'group_id',
  //   'name':'分组ID',
  //   'defaultType':'',
  //   'options':[],
  //   'type':'input',
  //   'isShow':true,
  // },
]



//===================table数据===========================
export function getTableFields(){
  return  [
    {
      'field':'id',
      'name':'id',
      'defaultShow':false,
      'width':'200',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'url',
      'name':'域名',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'250',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'package_name',
      'name':'套餐',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'250',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'create_time',
      'name':'添加时间',
      'defaultShow':true,
      'width':'250',
      'url':false,
    },
  ]
}



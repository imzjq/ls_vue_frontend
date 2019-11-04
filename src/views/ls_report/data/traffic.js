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
    'value':'time',
    'name':'时间',
    'defaultType':[],
    'options':[],
    'type':'date_3',
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
      'field':'time',
      'name':'时间',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'200',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'ip',
      'name':'ip',
      'defaultShow':true,
      'width':'170',
      'url':false,
    },
    {
      'field':'resultCode',
      'name':'状态码',
      'defaultShow':true,
      'width':'230',
      'url':false,
    },
    {
      'field':'bytes',
      'name':'字节数',
      'defaultShow':true,
      'width':'100',
      'url':false,
    },
    {
      'field':'nodeid',
      'name':'节点ID',
      'defaultShow':true,
      'width':'170',
      'url':false,
    },
    {
      'field':'url',
      'name':'url',
      'defaultShow':true,
      'width':'',
      'url':false,
    },
  ]
}





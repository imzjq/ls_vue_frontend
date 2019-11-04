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
    'value':'name',
    'name':'名称',
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
      'width':'80',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'name',
      'name':'名称',
      'defaultShow':true,
      'width':'150',
      'url':false,
    },
    {
      'field':'desc',
      'name':'描述',
      'defaultShow':true,
      'width':'',
      'url':false,
    },
    {
      'field':'create_time',
      'name':'创建时间',
      'defaultShow':true,
      'width':'',
      'url':false,
    },

  ]
}
//表单中的字段
export function getTemp() {
  return {
    id:'',
    name:'',
    desc : '',
  }
}




let _ = require('lodash')


//生成搜索默认值
export function generalListQuery() {
  //
  var listQuery = {
    page: 1,
    limit: 100,
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
    'value':'keywords',
    'name':'完整域名',
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
      'field':'name',
      'name':'名称',
      'defaultShow':true,
      'width':'',
      'url':false, //url 是否有a 标签
    },


  ]
}




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

]



//===================table数据===========================
export function getTableFields(){
  return  [
    {
      'field':'link',
      'name':'链接数',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'170',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'node_ip',
      'name':'节点ip',
      'defaultShow':true,
      'width':'',
      'url':false,
    },
    {
      'field':'ip',
      'name':'源ip',
      'defaultShow':true,
      'width':'',
      'url':false,
    },
    {
      'field':'time',
      'name':'时间',
      'defaultShow':true,
      'width':'',
      'url':false,
    },



  ]
}





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
      'field':'name',
      'name':'套餐名称',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'',
      'url':false, //url 是否有a 标签
    },
      {
          'field':'ssl_quantity',
          'name':'证书域名限制数量',
          'defaultShow':true,
          'width':'',
          'url':false,
      },
    {
      'field':'origin_quantity',
      'name':'源数量',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'url_quantity',
      'name':'源域名数量',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'drsd_quantity',
      'name':'域名解析数量',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'120',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'black_quantity',
      'name':'黑名单数量',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'150',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'white_quantity',
      'name':'白名单数量',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'150',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'hijack_quantity',
      'name':'防劫持数量',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'100',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'bandwidth',
      'name':'带宽',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'defence',
      'name':'防御',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'',
      'url':false, //url 是否有a 标签
    },

  ]
}





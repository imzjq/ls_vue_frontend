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
    'value':'domain',
    'name':'域名',
    'defaultType':'',
    'options':[],
    'type':'input',
    'isShow':true,
  },
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
    'value':'is_valid',
    'name':'是否过期',
    'defaultType':[],
    'options':[
      {
        value:1,
        name:'已过期'
      },
      {
        value:2,
        name:'未过期'
      },
    ],
    'type':'select',
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
      'field':'domain',
      'name':'所属域名',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'',
      'url':false, //url 是否有a 标签
    },
      {
          'field':'package_name',
          'name':'套餐',
          'defaultShow':true,
          'width':'150',
          'url':false,
      },
    {
      'field':'cer_end_time',
      'name':'过期时间',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'200',
      'url':false, //url 是否有a 标签
    },

  ]
}
//表单中的字段
export function getTemp() {
  return {
    id:'',
    pv_key:'',
    pb_key:'',
    package_id: '',
    cer_end_time :'',
  }
}




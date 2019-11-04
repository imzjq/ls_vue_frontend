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
    'value':'did',
    'name':'域名',
    'defaultType':'',
    'options':[],
    'type':'select',
    'isShow':true,
  },
  // {
  //   'value':'unit',
  //   'name':'粒度',
  //   'defaultType':'',
  //   'options':[
  //     {
  //       value:300,
  //       name:'5分钟'
  //     },
  //     {
  //       value:3600,
  //       name:'小时'
  //     },
  //     {
  //       value:86400,
  //       name:'天'
  //     }
  //   ],
  //   'type':'select',
  //   'isShow':true,
  // },
  {
    'value':'time',
    'name':'时间',
    'defaultType':[],
    'options':[],
    'type':'date',
    'isShow':true,
  },
]



//===================table数据===========================
export function getTableFields(){
  return  []
}




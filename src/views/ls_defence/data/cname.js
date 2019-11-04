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
    'value':'cname',
    'name':'Cname',
    'defaultType':'',
    'options':[],
    'type':'input',
    'isShow':true,
  },
  {
    'value':'remark',
    'name':'是否默认',
    'defaultType':[],
    'options':[
      {
        value:1,
        name:'默认',
      },
      {
        value:0,
        name:'非默认',
      }
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
      'field':'cname',
      'name':'cname',
      'defaultShow':true,
      'width':'230',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'ip',
      'name':'IP',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'370',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'country',
      'name':'类型',
      'defaultShow':true,
      'width':'',
      'url':false,
    },
    {
      'field':'remark',
      'name':'是否默认',
      'defaultShow':true,
      'width':'',
      'url':false,
    },
    {
      'field':'type',
      'name':'type',
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
    ip1:'',
    ip2:'',
    cname:'',
    country:'',
    type:'',
    remark:0,
  }
}
//表单规则
export const createRules = {
  cname: [
    { required: true, message: '请输入cname', trigger: 'blur' },
  ],
  ip: [
    { required: true, message: '请选择节点', trigger: 'blur' },
  ],
  country: [
    { required: true, message: '请选择类型', trigger: 'blur' },
  ],

}



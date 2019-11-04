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
      'field':'id',
      'name':'ID',
      'defaultShow':false,
      'width':'0',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'rrtype',
      'name':'记录类型',
      'defaultShow':true,
      'width':'100',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'rr',
      'name':'主机记录',
      'defaultShow':true, //下拉框选择列是否默认选中，即列是否默认显示该字段数据
      'width':'200',
      'url':false, //url 是否有a 标签
    },
    {
      'field':'route',
      'name':'解析路线',
      'defaultShow':true,
      'width':'120',
      'url':false,
    },
    {
      'field':'rval',
      'name':'记录值',
      'defaultShow':true,
      'width':'200',
      'url':false,
    },
    {
      'field':'ttl',
      'name':'TTL',
      'defaultShow':true,
      'width':'120',
      'url':false,
    },
  ]
}
//表单中的字段
export function getTemp() {
  return {
    id:'',
    dname:'',
    rrtype:'',
    rr:'',
    route:'',
    rval:'',
    mx:'',
    ttl:600,
    remarks:'',
    did:'',
  }
}

export const rrtypeOptions = [
  {
    label:'A',
    value:'A'
  },
  {
    label:'CNAME',
    value:'CNAME'
  },
  {
    label:'MX',
    value:'MX'
  },
  {
    label:'NX',
    value:'NX'
  },
  {
    label:'TXT',
    value:'TXT'
  },
  {
    label:'AAAA',
    value:'AAAA'
  },

]

export const ttlOptions = [
  {
    label:'10秒',
    value:10
  },
  {
    label:'60秒',
    value:60
  },
  {
    label:'10分钟',
    value:600
  },
  {
    label:'30分钟',
    value:1800
  },
  {
    label:'1小时',
    value:3600
  },
  {
    label:'12小时',
    value:43200
  },
  {
    label:'24小时',
    value:86400
  },
]


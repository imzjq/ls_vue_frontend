import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/drsd/index'
      break
    case 'add':
      url = '/drsd/add'
      break
    case 'update':
      url = '/drsd/update'
      break
    case 'getOne':
      url = '/drsd/get-one'
      break
    case 'del':
      url = '/drsd/del'
      break
    case  'addbatch':
      url = '/drsd/add-batch'
      break;
    case  'updatebatch':
      url = '/drsd/update-batch'
      break;
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

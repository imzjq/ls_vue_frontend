import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/dns/index'
      break
    case 'add':
      url = '/dns/add'
      break
    case 'update':
      url = '/dns/update'
      break
    case 'getOne':
      url = '/dns/get-one'
      break
    case 'changeStatus':
      url = '/dns/switch'
      break
    case 'del':
      url = '/dns/del'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

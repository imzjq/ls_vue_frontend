import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/drs/index'
      break
    case 'add':
      url = '/drs/add'
      break
    case 'update':
      url = '/drs/update'
      break
    case 'getOne':
      url = '/drs/get-one'
      break
    case 'del':
      url = '/drs/del'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

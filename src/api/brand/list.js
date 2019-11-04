import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/brand/index'
      break
    case 'add':
      url = '/brand/add'
      break
    case 'update':
      url = '/brand/update'
      break
    case 'getOne':
      url = '/brand/get-one'
      break
    case 'del':
      url = '/brand/del'
      break
    default:
      url =  '/brand/index'
  }
  return request({
    url: url,
    data
  })
}

//ssl 证书关联
import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/user-cer/index'
      break
    case 'add':
      url = '/user-cer/add'
      break
    case 'update':
      url = '/user-cer/update'
      break
    case 'getOne':
      url = '/user-cer/get-one'
      break
    case 'del':
      url = '/user-cer/del'
      break
    case 'dels':
      url = '/user-cer/dels'
      break
    case 'batchAdd':
      url = '/user-cer/batch-add'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}


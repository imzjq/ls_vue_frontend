import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/black-ip/index'
      break
    case 'add':
      url = '/black-ip/add'
      break
    case 'addBatch':
      url = '/black-ip/add-batch'
      break
    case 'update':
      url = '/black-ip/update'
      break
    case 'getOne':
      url = '/black-ip/get-one'
      break
    case 'del':
      url = '/black-ip/del'
      break
    case 'url':
      url = '/public/get-black-url'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/white-ip/index'
      break
    case 'add':
      url = '/white-ip/add'
      break
    case 'addBatch':
      url = '/white-ip/add-batch'
      break
    case 'update':
      url = '/white-ip/update'
      break
    case 'getOne':
      url = '/white-ip/get-one'
      break
    case 'del':
      url = '/white-ip/del'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

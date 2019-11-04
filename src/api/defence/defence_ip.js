import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/defence-ip/index'
      break
    case 'add':
      url = '/defence-ip/add'
      break
    case 'update':
      url = '/defence-ip/update'
      break
    case 'getOne':
      url = '/defence-ip/get-one'
      break
    case 'getNode':
      url = '/node-group/get-node'
      break
    case 'del':
      url = '/defence-ip/del'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

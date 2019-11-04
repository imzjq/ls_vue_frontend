import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/defence/index'
      break
    case 'add':
      url = '/defence/add'
      break
    case 'update':
      url = '/defence/update'
      break
    case 'getOne':
      url = '/defence/get-one'
      break
    case 'getNode':
      url = '/node-group/get-node'
      break
    case 'del':
      url = '/defence/del'
      break
    case 'getInfo':
      url = '/domain/get-info'
      break
    case 'next':
      url = '/domain/next-check'
      break
    case 'checkSsl':
      url = '/domain/check-ssl'
      break
    case 'preview':
      url = '/defence/preview'
      break
    case 'changeStatus':
      url = '/defence/change-status'
      break
    case 'getUsers':
      url = '/domain/get-users'
      break;
    case 'batchUpdateOrigin':
      url = '/defence/batch-update-origin'
      break
    case 'batchAdd':
      url = '/defence/batch-add'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/domain/index'
      break
    case 'add':
      url = '/domain/add'
      break
    case 'addbatch':
      url = '/domain/add-batch'
      break
    case 'update':
      url = '/domain/update'
      break
    case 'getOne':
      url = '/domain/get-one'
      break
    case 'next':
      url = '/domain/next-check'
      break
    case 'batchnext':
      url = '/domain/batch-next-check'
      break
    case 'getInfo':
      url = '/domain/get-info'
      break
    case 'changeStatus':
      url = '/domain/change-status'
      break
    case 'checkSsl':
      url = '/domain/check-ssl'
      break
    case 'batchCheckSsl':
      url = '/domain/batch-check-ssl'
      break
    case 'batchUpdateOrigin':
      url = '/domain/batch-update-origin'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/black-area-ip/index'
      break
    case 'add':
      url = '/black-area-ip/add'
      break
    case 'update':
      url = '/black-area-ip/update'
      break
    case 'getOne':
      url = '/black-area-ip/get-one'
      break
    case 'del':
      url = '/black-area-ip/del'
      break
      case 'home':
      url = '/black-area-ip/get-home-iparea'
      break
    case 'abroad':
      url = '/black-area-ip/get-abroad-iparea'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'updateInfo':
      url =  '/customer/update-info'
      break
    case 'getOne':
      url =  '/customer/get-one'
      break
    case 'upPass':
      url =  '/customer/up-pass'
      break
    case 'getList':
      url =  '/customer/get-list'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

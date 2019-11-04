import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/hsts/index'
      break
    case 'del':
      url = '/hsts/del'
      break
    case 'add':
      url = '/hsts/add'
      break

    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

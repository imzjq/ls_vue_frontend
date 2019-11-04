import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getList':
      url =  '/white-list/index'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

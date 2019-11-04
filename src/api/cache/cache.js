import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'clear':
      url =  '/cache/clear'
      break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

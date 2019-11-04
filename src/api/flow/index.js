import request from '@/utils/request'


export function curd(type,data) {
  var url;
  switch (type) {
    case 'getFlow':
      url =  '/flow/flow'
      break
    case 'getBandwidth':
      url = '/flow/bandwidth'
      break
    case 'getHit':
      url = '/flow/hit'
      break
    case 'getLink':
      url = '/flow/link'
      break
    case 'getLog':
      url = '/flow/log'
      break
    case 'getDns':
      url = '/flow/dns'
      break
    case 'getApi':
      url = '/flow/api'
      break
    case 'getTraffic':
      url = '/flow/traffic'
      break
    case 'getTime':
      url = '/flow/time'
      break
    case 'getLm':
      url = '/flow/lm'
      break
    case 'getDdos':
      url = '/flow/ddos'
      break
      case 'getDdosRecord':
          url = '/flow/ddos-record'
          break
    default:''
      url =  ''
  }
  return request({
    url: url,
    data
  })
}

import request from '@/utils/request'

export function countryTypeMap() {
  return request({
    url: '/public/country-type-map',
  })
}

export function countryTypeNewMap() {
  return request({
    url: '/public/country-type-new-map',
  })
}


export function userOptions() {
  return request({
    url: '/public/get-user-options',
  })
}

export function domainOptions() {
  return request({
    url: '/public/get-domain-options',
  })
}

export function flowDomainOptions() {
  return request({
    url: '/public/get-flow-domain-options',
  })
}

export function defenceOptions() {
  return request({
    url: '/public/get-defence-options',
  })
}
export function defenceIpOptions() {
  return request({
    url: '/public/get-defence-ip-options',
  })
}

export function domainTousers() {
  return request({
    url: '/public/get-domain-users',
  })
}

export function brandOptions() {
  return request({
    url: '/public/get-brand',
  })
}

/**
 * 获取高防和加速的全部域名
 */
export function domainDefenceOptions() {
  return request({
    url: '/public/get-domain-defence',
  })
}

export function packageOptions() {
  return request({
    url: '/public/get-package',
  })
}



export function domainRemapOptions(data) {
  return request({
    url: '/public/get-domain-remap',
    data
  })
}

export function defenceRemapOptions(data) {
  return request({
    url: '/public/get-defence-remap',
    data
  })
}

export function domainDefenceUrlOptions(data) {
  return request({
    url: '/public/get-domain-defence-url',
    data
  })
}

export function drsdOptions() {
  return request({
    url: '/public/get-drsd',
  })
}


export function userBaseConfig() {
  return request({
    url: '/public/get-user-base-config'
  })
}



export function topLogUrl() {
  return request({
    url: '/public/get-top-log-url'
  })
}


export function getTime(data) {
  return request({
    url: '/public/get-time',
    data
  })
}

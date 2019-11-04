import request from '@/utils/request'
export function getList(method, data) {

  return request({
    method: 'post',
    data: data
  })
}

export function add(method, data) {
  const postData = {
    'method': method,
    'data': data
  }
  return request({
    method: 'post',
    data: postData
  })
}

export function getOne(method, id) {
  const postData = {
    'method': method,
    'data': {
      'id': id
    }
  }
  return request({
    method: 'post',
    data: postData
  })
}
export function update(method, data) {
  const postData = {
    'method': method,
    'data': data
  }
  return request({
    method: 'post',
    data: postData
  })
}
export function del(method, id) {
  const postData = {
    'method': method,
    'data': {
      'id': id
    }
  }
  return request({
    method: 'post',
    data: postData
  })
}

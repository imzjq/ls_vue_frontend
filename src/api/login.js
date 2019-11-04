import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/site/login',
    method: 'post',
    data
  })
}

export function registerByUsername(username, password,password2) {
  const data = {
    username,
    password,
    password2
  }
  return request({
    url: '/site/register',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/auth/get-user',
    method: 'post',
    params: { token }
  })
}


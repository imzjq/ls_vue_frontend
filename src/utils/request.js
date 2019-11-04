import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// create an axios instance
const service = axios.create({
  baseURL: '/api/', // api的base_url
  timeout: 5000, // request timeout
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  var token = getToken()
  if (token && token !== undefined) {
    // 让每个请求携带token-- ['X_Token']为自定义key 请根据实际情况自行修改
    config.headers['token'] = token
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code !== 200) {
      // Message({
      //   message: res.msg,
      //   type: 'error',
      //   duration: 3 * 1000
      // })
      if (res.code === 3001) {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      } else {
        Message({
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(res.msg)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '网络错误',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  })

export default service

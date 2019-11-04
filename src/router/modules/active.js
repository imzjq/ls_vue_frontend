/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const activeRouter = {
  path: '/active',
  component: Layout,
  redirect: 'noredirect',
  name: 'active',
  meta: {
    title: '主动防御',
  },
  children: [
    {
      path: 'black',
      component: () => import('@/views/ls_active/black'),
      name: 'active_black',
      meta: { title: '黑名单IP', noCache: true }
    },

    {
      path: 'white',
      component: () => import('@/views/ls_active/white'),
      name: 'active_white',
      meta: { title: '白名单IP', noCache: true }
    },

    {
      path: 'hsts',
      component: () => import('@/views/ls_hsts/list'),
      name: 'hsts_list',
      meta: { title: '防劫持设置', noCache: true }
    },
    {
      path: 'area_black',
      component: () => import('@/views/ls_active/areablack'),
      name: 'area_black',
      meta: { title: '地区黑名单', noCache: true }
    },
    // {
    //   path: 'flow',
    //   component: () => import('@/views/ls_active/flow'),
    //   name: 'active_flow',
    //   meta: { title: '流量负载预警', noCache: true }
    // },
    // {
    //   path: '5xx',
    //   component: () => import('@/views/ls_active/5xx'),
    //   name: 'active_5xx',
    //   meta: { title: '5XX错误码预警', noCache: true }
    // },



  ]
}

export default activeRouter

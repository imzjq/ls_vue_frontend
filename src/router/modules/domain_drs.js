/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const ddRouter = {
  path: '/dd',
  component: Layout,
  redirect: 'noredirect',
  name: 'domain_drs',
  meta: {
    title: '加速解析',
  },
  children: [
    {
      path: 'drsd/index',
      component: () => import('@/views/ls_dd/drs/drsd'),
      name: 'drsd_index',
      meta: { title: '域名解析列表', noCache: true }
    },
    {
      path: 'drs/drs/:did',
      component: () => import('@/views/ls_dd/drs/drs'),
      name: 'drs_drs',
      hidden:true,
      meta: { title: '域名解析详情', noCache: true }
    },
    {
      path: 'domain/index',
      component: () => import('@/views/ls_dd/domain/index'),
      name: 'domain_index',
      meta: { title: '域名加速', noCache: true }
    },
    {
      path: 'domain/form',
      component: () => import('@/views/ls_dd/domain/form'),
      name: 'domain_form',
      hidden:true,
      meta: { title: '加速表单', noCache: true }
    },
    {
      path: 'domain/form_update/:did',
      component: () => import('@/views/ls_dd/domain/form'),
      name: 'domain_form_update',
      hidden:true,
      meta: { title: '修改加速表单', noCache: true }
    },
    {
      path: 'ssl/index',
      component: () => import('@/views/ls_dd/ssl/index'),
      name: 'ssl_index',
      meta: { title: 'ssl证书管理', noCache: true }
    },
    {
      path: 'domain/batch_form',
      component: () => import('@/views/ls_dd/domain/batch_form'),
      name: 'domain_batch_form',
      hidden:true,
      meta: { title: '批量新增表单', noCache: true }
    },
  ]
}

export default ddRouter

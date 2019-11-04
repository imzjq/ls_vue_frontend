/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const drsdRouter = {
  path: '/dd',
  component: Layout,
  redirect: 'noredirect',
  name: 'drsd',
  meta: {
    title: '解析管理',
  },
  children: [
    {
      path: 'drsd/index',
      component: () => import('@/views/ls_dd/drs/drsd'),
      name: 'drsd_index',
      meta: { title: '域名解析', noCache: true }
    },
    {
      path: 'drsd/batch_add',
      component: () => import('@/views/ls_dd/drs/batch_add'),
      name: 'batch_add',
      meta: { title: '批量添加', noCache: true }
    },
    {
      path: 'drsd/batch_update',
      component: () => import('@/views/ls_dd/drs/batch_update'),
      name: 'batch_update',
      meta: { title: '批量修改', noCache: true }
    },
    {
      path: 'drs/drs/:did',
      component: () => import('@/views/ls_dd/drs/drs'),
      name: 'drs_drs',
      hidden:true,
      meta: { title: '域名解析详情', noCache: true }
    },
  ]
}

export default drsdRouter

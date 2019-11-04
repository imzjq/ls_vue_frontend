/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const sslRouter = {
  path: '/ssl',
  component: Layout,
  redirect: 'noredirect',
  name: 'ssl',
  meta: {
    title: '证书管理',
  },
  children: [
    {
      path: 'ssl/index',
      component: () => import('@/views/ls_dd/ssl/index'),
      name: 'ssl_index',
      meta: { title: '证书管理', noCache: true }
    },

    {
      path: 'ssl/batch_add',
      component: () => import('@/views/ls_dd/ssl/batch_add'),
      name: 'ssl_batch_add',
      meta: { title: '批量新增', noCache: true }
    },
  ]
}

export default sslRouter

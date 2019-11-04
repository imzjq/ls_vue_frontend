/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const defenceRouter = {
  path: '/defence',
  component: Layout,
  redirect: '/defence/index',
  name: 'defence',
  meta: {
    title: '多域名单CNAME',
  },
  children: [
    {
      path: '/defence/index',
      component: () => import('@/views/ls_defence/index'),
      name: 'defence_index',
      meta: { title: '域名添加' }
    },
    {
      path: '/defence/batch_add',
      component: () => import('@/views/ls_defence/batch_add'),
      name: 'defence_batch_add',
      meta: { title: '批量添加' }
    },
    {
      path: '/defence/batch',
      component: () => import('@/views/ls_defence/batch_origin'),
      name: 'defence_batch',
      meta: { title: '批量改源' }
    },
    {
      path: 'defence/form',
      component: () => import('@/views/ls_defence/form'),
      name: 'defence_form',
      hidden:true,
      meta: { title: '域名表单', noCache: true }
    },
    {
      path: 'defence/form_update/:did',
      component: () => import('@/views/ls_defence/form'),
      name: 'defence_form_update',
      hidden:true,
      meta: { title: '修改域名表单', noCache: true }
    },
  ]
}

export default defenceRouter

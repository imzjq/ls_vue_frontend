/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const domainRouter = {
  path: '/domain',
  component: Layout,
  redirect: 'noredirect',
  name: 'domain',
  meta: {
    title: '单域名单CNAME',
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/ls_dd/domain/index'),
      name: 'domain_index',
      meta: { title: '域名添加', noCache: true }
    },
    {
      path: 'form',
      component: () => import('@/views/ls_dd/domain/form'),
      name: 'domain_form',
      hidden:true,
      meta: { title: '域名表单', noCache: true }
    },
    {
      path: 'form_update/:did',
      component: () => import('@/views/ls_dd/domain/form'),
      name: 'domain_form_update',
      hidden:true,
      meta: { title: '修改域名表单', noCache: true }
    },
    {
      path: 'batch_form',
      component: () => import('@/views/ls_dd/domain/batch_form'),
      name: 'domain_batch_form',
      meta: { title: '批量添加', noCache: true }
    },
    {
      path: 'batch-up',
      component: () => import('@/views/ls_dd/domain/batch_origin'),
      name: 'domain_batch_up',
      meta: { title: '批量改源', noCache: true }
    },

    // {
    //   path: 'hijack',
    //   component: () => import('@/views/ls_dd/domain/batch_origin'),
    //   name: 'hijack',
    //   meta: { title: '防劫持设置', noCache: true }
    // },
    // {
    //   path: 'header',
    //   component: () => import('@/views/ls_dd/domain/batch_origin'),
    //   name: 'header',
    //   meta: { title: '自定义header', noCache: true }
    // },
  ]
}

export default domainRouter

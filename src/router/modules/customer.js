/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const customerRouter = {
  path: '/customer',
  component: Layout,
  redirect: 'noredirect',
  name: 'customer',
  meta: {
    title: '帐号管理',
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/ls_customer/index'),
      name: 'customer_index',
      meta: { title: '基本设置', noCache: true }
    },
    {
      path: 'uppass',
      component: () => import('@/views/ls_customer/upPass'),
      name: 'customer_uppass',
      meta: { title: '修改密码', noCache: true }
    },

    {
      path: 'package',
      component: () => import('@/views/ls_customer/package'),
      name: 'customer_package',
      meta: { title: '套餐信息', noCache: true }
    },

  ]
}

export default customerRouter

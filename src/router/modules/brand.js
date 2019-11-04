/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const brandRouter = {
  path: '/brand',
  component: Layout,
  redirect: 'index',
  name: 'brand',
  meta: {
    title: '分类/品牌',
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/ls_brand/list'),
      name: 'brand_index',
      meta: { title: '分类/品牌', noCache: true }
    },


  ]
}

export default brandRouter

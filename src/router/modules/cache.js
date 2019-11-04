/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const cacheRouter = {
  path: '/cache',
  component: Layout,
  redirect: 'noredirect',
  name: 'cache',
  meta: {
    title: '清除缓存',
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/ls_cache/index'),
      name: 'cache_index',
      meta: { title: '清除缓存', noCache: true  }
    },


  ]
}

export default cacheRouter

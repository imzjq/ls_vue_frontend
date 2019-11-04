/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const toolRouter = {
  path: '/tool',
  component: Layout,
  redirect: 'noredirect',
  name: 'tool',
  meta: {
    title: '常用工具',
  },
  children: [
    {
      path: 'dns',
      component: () =>  import('@/views/ls_tool/dns'),
      name: 'tool_dns',
      meta: { title: ' DNS污染检测', noCache: true }
    },
    {
      path: 'gfw',
      component: () =>  import('@/views/ls_tool/gfw'),
      name: 'tool_gfw',
      meta: { title: 'GFW检测', noCache: true }
    },
    {
      path: 'trace',
      component: () =>  import('@/views/ls_tool/trace'),
      name: 'tool_trace',
      meta: { title: 'Trace', noCache: true }
    },
    {
      path: 'ping',
      component: () =>  import('@/views/ls_tool/ping'),
      name: 'ping',
      meta: { title: 'PING ', noCache: true }
    },
  ]
}

export default toolRouter

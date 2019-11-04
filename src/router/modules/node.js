/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const nodeRouter = {
  path: '/node',
  component: Layout,
  redirect: '/node/index',
  name: 'node',
  meta: {
    title: '节点管理',
  },
  children: [

    {
      path: '/node/node_tag',
      component: () => import('@/views/ls_node/node_tag'),
      name: 'node_tag',
      meta: { title: '节点标签' }
    },

    {
      path: '/node/index',
      component: () => import('@/views/ls_node/node'),
      name: 'node_index',
      meta: { title: '节点列表' }
    },
    {
      path: '/node/group',
      component: () => import('@/views/ls_node/group'),
      name: 'group',
      meta: { title: '节点分组' }
    },
    {
      path: '/node/kit',
      component: () => import('@/views/ls_node/kit'),
      name: 'kit',
      meta: { title: '节点套件' }
    },
    {
      path: '/node/kit_list/:kit_id',
      component: () => import('@/views/ls_node/kit_list'),
      name: 'kit_list',
      hidden:true,
      meta: { title: '脚本列表', noCache: true }
    },

  ]
}

export default nodeRouter

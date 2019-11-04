//统计类相关的，带宽统计，流量统计，点击量统计
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

export  const reportRouter = {
  path: '/report',
  component: Layout,
  redirect: 'noredirect',
  name: 'report',
  meta: {
    title: '报表管理',
  },
  children: [
    {
      path: 'flow',
      component: () => import('@/views/ls_report/flow'),
      name: 'report_flow',
      meta: { title: '流量统计', noCache: true }
    },
    {
      path: 'bandwidth',
      component: () => import('@/views/ls_report/bandwidth'),
      name: 'report_bandwidth',
      meta: { title: '带宽统计', noCache: true }
    },
    {
      path: 'hit',
      component: () => import('@/views/ls_report/hit'),
      name: 'report_hit',
      meta: { title: '请求数统计', noCache: true }
    },


    {
      path: 'link',
      component: () => import('@/views/ls_report/link'),
      name: 'report_link',
      meta: { title: '日志下载', noCache: true }
    },
    {
      path: 'time',
      component: () => import('@/views/ls_report/time'),
      name: 'report_time',
      meta: { title: '各时段流量统计', noCache: true }
    },
    {
      path: 'lm',
      component: () => import('@/views/ls_report/lm'),
      name: 'report_lm',
      meta: { title: '往月流量宽带统计', noCache: true }
    },
    {
      path: 'visit',
      component: () => import('@/views/ls_report/visit'),
      name: 'active_visit',
      meta: { title: '回源链接数统计', noCache: true }
    },
    {
      path: 'ddos',
      component: () => import('@/views/ls_report/ddos'),
      name: 'ddos_record',
      hidden:true,
      meta: { title: '链接记录', noCache: true }
    },
    // {
    //   path: 'log',
    //   component: () => import('@/views/ls_report/log'),
    //   name: 'report_log',
    //   meta: { title: '日志状态', noCache: true }
    // },
    {
      path: 'api',
      component: () => import('@/views/ls_report/api'),
      name: 'report_api',
      meta: { title: '状态码统计', noCache: true }
    },
    {
      path: 'code',
      component: () => import('@/views/ls_report/traffic'),
      name: 'report_code',
      meta: { title: '状态码明细', noCache: true }
    },
    {
      path: 'dns',
      component: () => import('@/views/ls_report/dns'),
      name: 'report_dns',
      meta: { title: 'DNS来源请求IP区域分布图', noCache: true }
    },

  ]
}



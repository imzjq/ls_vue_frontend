import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */

// import systemRouter from './modules/system'
// import dnsRouter from './modules/dns'
// import userRouter from './modules/user'
// import nodeRouter from './modules/node'
//
// import ipkuRouter from './modules/ipku'
// import routerRouter from './modules/router'
// import ddRouter from './modules/domain_drs'

import defenceRouter from './modules/defence'

import brandRouter from './modules/brand'
import domainRouter from './modules/domain'
import drsdRouter from './modules/drsd'
import sslRouter from './modules/ssl'
import cacheRouter from './modules/cache'
import activeRouter from './modules/active'
import {reportRouter} from './modules/report'
import toolRouter from './modules/tool'
import customerRouter from './modules/customer'


/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },


]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /** When your routing table is too long, you can split it into small modules**/
  brandRouter,
  sslRouter,
  domainRouter,
  defenceRouter,
  drsdRouter,

  cacheRouter,
  activeRouter,
  reportRouter,
  toolRouter,
  customerRouter,

  // ddRouter,
  // nodeRouter,
  // dnsRouter,
  // routerRouter,
  // ipkuRouter,
  // reportRouter,
  // userRouter,
  // systemRouter,
  { path: '*', redirect: '/404', hidden: true }
]

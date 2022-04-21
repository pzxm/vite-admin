import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

/**
 * 根路径
 */
export const ROOT_PATH = '/'

/**
 * 主页页名称
 */
export const HOME_PAGE_NAME = 'home'

/**
 * 登录页名称
 */
export const LOGIN_PAGE_NAME = 'login'

/**
 * 登录页路由
 */
export const LOGIN_PATH = ROOT_PATH + LOGIN_PAGE_NAME

/**
 * 主页
 */
export const HOME: RouteRecordRaw = {
  // 默认子路由
  path: '',
  name: HOME_PAGE_NAME,
  component: () => import('@/pages/home/index.vue'),
  meta: {
    title: '首页',
    icon: 'Menu',
    roles: ['sys:manage']
  }
}

/**
 * 固定路由
 */
export const STATIC_ROUTE: RouteRecordRaw[] = [
  {
    path: ROOT_PATH,
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [HOME]
  },
  {
    path: LOGIN_PATH,
    name: LOGIN_PAGE_NAME,
    component: () => import('@/pages/login/index.vue')
  }
]

/**
 * 404路由名称
 */
export const NOT_FOUND: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/pages/error/404.vue')
}

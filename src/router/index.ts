import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/index.vue'
import systemRouter from '@/router/modules/system'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useStore from '@/store'
import { LOGIN_PAGE_NAME, LOGIN_PATH, HOME_PAGE_NAME } from '@/constants/route'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        // 默认子路由
        path: '',
        name: HOME_PAGE_NAME,
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'Menu',
          roles: ['sys:manage']
        }
      },
      systemRouter
    ]
  },
  {
    path: LOGIN_PATH,
    name: LOGIN_PAGE_NAME,
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // 路由规则
  routes
})

// 全局路由前置守卫
router.beforeEach((to, from) => {
  // 开始进度条
  nprogress.start()
  // 判断是否需要登录才能访问
  if (to.meta.requiresAuth && !useStore().accessToken) {
    return {
      // 返回到登录页
      path: LOGIN_PATH,
      // 保存当前访问路由，登录后直接跳转到该页面
      query: { redirect: to.fullPath }
    }
  }
})

// 全局路由后置钩子
router.afterEach((to, from) => {
  // 结束进度条
  nprogress.done()
})

export default router

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/index.vue'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useStore from '@/store'
import { LOGIN_PAGE_NAME, LOGIN_PATH, HOME_PAGE_NAME } from '@/constants/route'
import { TabPane } from '@/types/tab'
import { toRoutes } from '@/utils/menu'

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
      }
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

// 页面刷新标识
let refreshFlag = false
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  // 开始进度条
  nprogress.start()
  const store = useStore()
  // 未登重定向到登录页
  if (!store.accessToken) {
    if (to.path === LOGIN_PATH) {
      // 访问登录页直接放行
      next()
    } else {
      // 非登录页带地址放行
      next({
        // 返回到登录页
        path: LOGIN_PATH,
        // 保存当前访问路由，登录后直接跳转到该页面
        query: { redirect: to.fullPath },
        replace: true
      })
    }
  } else {
    // 页面刷新且没有匹配到对应路由，动态添加路由
    if (!refreshFlag && to.matched.length === 0) {
      toRoutes(store.menuList).forEach((route) => {
        if (!router.hasRoute(route.name as string)) {
          router.addRoute(route)
        }
      })
      // 添加动态路由后，替换本次路由，重新导航一次
      next({ ...to, replace: true })
      refreshFlag = true
    } else {
      next()
    }
  }
})

// 全局路由后置钩子
router.afterEach((to, from) => {
  const store = useStore()
  // 添加Tab选项卡
  const key = to.path
  const label = to.meta.title || ''
  const name = key
  const tabPane: TabPane = { key, label, name }
  if (!to.query.redirect && key !== LOGIN_PATH) {
    store.addTab(tabPane)
  }
  // 设置当前激活Tab选项
  store.setActiveTab(name)

  // 结束进度条
  nprogress.done()
})

export default router

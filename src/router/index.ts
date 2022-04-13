import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        // 默认子路由
        path: '',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // 路由规则
  routes
})

export default router

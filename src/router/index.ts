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
    path: '/system',
    component: AppLayout,
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'Menu',
      roles: ['sys:manage']
    },
    children: [
      {
        path: '/dept',
        component: () => import('../views/dept/index.vue'),
        name: '部门管理',
        meta: {
          title: '部门管理',
          icon: 'Menu',
          roles: ['sys:dept']
        }
      },
      {
        path: '/user',
        component: () => import('../views/user/index.vue'),
        name: '用户管理',
        meta: {
          title: '用户管理',
          icon: 'Menu',
          roles: ['sys:user']
        }
      },
      {
        path: '/menu',
        component: () => import('../views/menu/index.vue'),
        name: '菜单管理',
        meta: {
          title: '菜单管理',
          icon: 'Menu',
          roles: ['sys:menu']
        }
      },
      {
        path: '/role',
        component: () => import('../views/role/index.vue'),
        name: '角色管理',
        meta: {
          title: '角色管理',
          icon: 'Menu',
          roles: ['sys:role']
        }
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

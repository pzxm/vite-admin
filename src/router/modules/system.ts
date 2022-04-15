import { RouterView, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/system',
  component: RouterView,
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'Menu',
    roles: ['sys:manage']
  },
  children: [
    {
      path: '/dept',
      component: () => import('@/views/dept/index.vue'),
      name: '部门管理',
      meta: {
        title: '部门管理',
        icon: 'Menu',
        roles: ['sys:dept']
      }
    },
    {
      path: '/user',
      component: () => import('@/views/user/index.vue'),
      name: '用户管理',
      meta: {
        title: '用户管理',
        icon: 'Menu',
        roles: ['sys:user']
      }
    },
    {
      path: '/menu',
      component: () => import('@/views/menu/index.vue'),
      name: '菜单管理',
      meta: {
        title: '菜单管理',
        icon: 'Menu',
        roles: ['sys:menu']
      }
    },
    {
      path: '/role',
      component: () => import('@/views/role/index.vue'),
      name: '角色管理',
      meta: {
        title: '角色管理',
        icon: 'Menu',
        roles: ['sys:role']
      }
    }
  ]
}

export default routes

import { MenuInfo } from '@/types/menu'
import { RouteRecordRaw } from 'vue-router'
// import AppLayout from '@/layout/index.vue'

/**
 * 将菜单转为路由
 * @param menuList 菜单列表
 * @returns 路由列表
 */
export function toRoutes(menuList: MenuInfo[]): RouteRecordRaw[] {
  if (!menuList || menuList.length <= 0) {
    return []
  }
  return menuList.map(({ name, path, icon, children }) => ({
    name: name,
    path: path,
    component: () => {
      // 首页
      if (path === '/' || path === '/system') {
        return import('../layout/index.vue')
      } else {
        return import(/* @vite-ignore */ `../views/${path}/index.vue`)
      }
    },
    children: toRoutes(children || []),
    meta: {
      icon: icon,
      title: name
    }
  }))
}

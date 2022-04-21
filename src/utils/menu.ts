import { MenuInfo } from '@/types/menu'
import { RouteRecordRaw } from 'vue-router'

/**
 * 将菜单转为路由
 * @param menuList 菜单列表
 * @returns 路由列表
 */
export function toRoutes(
  menuList: MenuInfo[],
  basePath: string = ''
): RouteRecordRaw[] {
  if (!menuList || menuList.length <= 0) {
    return []
  }
  return menuList.map(({ name, path, icon, children }) => ({
    name: name,
    path: path,
    component: () => {
      // 首页
      if (path === '/' || (children && children.length > 0)) {
        return import('../layout/index.vue')
      } else {
        // 适配两种格式path user、/system/user
        return import(
          /* @vite-ignore */ path.indexOf('/') > -1
            ? `../views${path}/index.vue`
            : `../views${basePath}/${path}/index.vue`
        )
      }
    },
    children: toRoutes(children || [], path),
    meta: {
      icon: icon,
      title: name
    }
  }))
}

/**
 * 首页菜单
 */
export const HOME: MenuInfo = {
  id: 1,
  parentId: 0,
  path: '/',
  icon: 'HomeFilled',
  name: '首页',
  children: [],
  permission: '',
  menuType: 1,
  sort: 0
}

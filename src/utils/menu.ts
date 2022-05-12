import { MenuInfo } from '@/types/system/menu'
import { RouteRecordRaw } from 'vue-router'
const modules = import.meta.glob('../**/*.vue')

/**
 * 将菜单转为路由
 * @param menuList 菜单列表
 * @returns 路由列表
 */
export function toRoutes(menuList: MenuInfo[], basePath: string = ''): RouteRecordRaw[] {
  if (!menuList || menuList.length <= 0) {
    return []
  }
  return menuList.map(({ name, path, icon, children }) => ({
    name: name,
    path: path,
    redirect: children && children.length > 0 ? children[0].path : undefined,
    component: getComponent(path, children, basePath),
    children: toRoutes(children || [], path),
    meta: {
      icon: icon,
      title: name
    }
  }))
}

/**
 * 获取根据路由地址组件
 * @param path 路由地址
 * @param children 下级菜单
 * @param basePath 上级路由地址
 * @returns 组件
 */
function getComponent(path: string, children: MenuInfo[] | undefined, basePath: string) {
  let view = null
  // 首页
  if (path === '/' || (children && children.length > 0)) {
    view = '../layout/index.vue'
  } else {
    // 适配两种格式path（带'/':表示路由地址 和不带'/':表示下级路由地址） user、/system/user
    view =
      path.indexOf('/') > -1 ? `../views${path}/index.vue` : `../views${basePath}/${path}/index.vue`
  }
  return modules[view]
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

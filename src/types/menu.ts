export interface MenuInfo {
  id: number
  path: string
  children?: MenuInfo[]
  icon: string
  name: string
  parentId: number
  permission: string
  menuType: number
  sort: number
  meta: {
    icon: string
    title: string
  }
}

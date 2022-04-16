export interface MenuInfo {
  path: string
  children?: MenuInfo[]
  meta: {
    icon: string
    title: string
  }
}

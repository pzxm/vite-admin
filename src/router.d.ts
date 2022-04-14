import 'vue-router'

declare module 'vue-router' {
  // eslint-disable-next-line no-unused-vars
  interface RouteMeta {
    title: string
    icon: string
    roles: string[]
  }
}

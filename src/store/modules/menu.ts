import { MenuInfo } from '@/types/system/menu'
import { defineStore } from 'pinia'

const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      isCollapse: false,
      menuList: [] as MenuInfo[]
    }
  },
  getters: {},
  actions: {
    setIsCollapse(collapse: boolean) {
      this.isCollapse = collapse
    },
    setMenuList(menuList: MenuInfo[]) {
      this.menuList = menuList
    },
    reset() {
      this.$reset()
    }
  },
  // pinia 持久化插件（持久化到localStorage）
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
})

export default useMenuStore

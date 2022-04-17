import { UserInfo } from '@/api/types/common'
import { ROOT_PATH } from '@/constants/route'
import { MenuInfo } from '@/types/menu'
import { TabPane } from '@/types/tab'
import { defineStore } from 'pinia'

const useStore = defineStore('app', {
  state: () => {
    return {
      isCollapse: false,
      userInfo: {} as UserInfo | null,
      accessToken: '',
      activeTab: '',
      tabList: [{ key: '/', label: '首页', name: '/' }] as TabPane[],
      count: 0,
      menuList: [] as MenuInfo[]
    }
  },
  getters: {
    isAuthenticated(): string {
      return this.accessToken
    }
  },
  actions: {
    setIsCollapse(collapse: boolean) {
      this.isCollapse = collapse
    },
    setUser(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken
    },
    addTab(tabPane: TabPane) {
      if (this.tabList.some((item) => item.key === tabPane.key)) return
      this.tabList.push(tabPane)
    },
    setActiveTab(activeTab: string) {
      this.activeTab = activeTab
    },
    removeTab(targetName: string) {
      if (this.tabOnlyOneOrHome()) return
      const tabs = this.tabList
      let activeName = this.activeTab
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.activeTab = activeName
      this.tabList = tabs.filter((tab) => tab.name !== targetName)
    },
    closAllTab() {
      if (this.tabOnlyOneOrHome()) return
      this.tabList = this.tabList.filter((item) => item.key === ROOT_PATH)
    },
    closeOtherTab() {
      if (this.tabOnlyOneOrHome()) return
      this.tabList = this.tabList.filter(
        (item) => item.key === ROOT_PATH || item.key === this.activeTab
      )
    },
    tabOnlyOneOrHome() {
      return this.activeTab === ROOT_PATH || this.tabList.length === 1
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

export default useStore

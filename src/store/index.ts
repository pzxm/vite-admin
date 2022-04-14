import { defineStore } from 'pinia'

const useStore = defineStore('app', {
  state: () => {
    return {
      count: 0,
      name: 'Eduardo',
      isCollapse: false
    }
  },
  getters: {
    getIsCollapse(): boolean {
      return this.isCollapse
    }
  },
  actions: {
    setIsCollapse(collapse: boolean) {
      this.isCollapse = collapse
    }
  }
})

export default useStore

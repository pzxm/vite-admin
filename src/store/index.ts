import useAppStore from './modules/app'
import useMenuStore from './modules/menu'
import useTabStore from './modules/tabs'

const useStore = () => ({
  menuStore: useMenuStore(),
  appStore: useAppStore(),
  tabStore: useTabStore(),
  reset: () => {
    useMenuStore().reset()
    useAppStore().reset()
    useTabStore().reset()
  }
})

export default useStore

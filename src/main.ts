import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 加载全局样式
import './styles/index.scss'
import ElementPlus from './plugins/element-plus'
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPersist)
createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')

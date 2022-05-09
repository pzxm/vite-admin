import App from './App.vue'
// 加载全局样式
import './styles/index.scss'
import router from './router/'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from './plugins/element-plus'
import piniaPersist from 'pinia-plugin-persist'

createApp(App).use(router).use(createPinia().use(piniaPersist)).use(ElementPlus).mount('#app')

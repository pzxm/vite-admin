import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.scss'
import ElementPlus from './plugins/element-plus'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')

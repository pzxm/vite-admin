import App from './App.vue'
// 加载全局样式
import './styles/index.scss'
import router from './router/'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from './plugins/element-plus'
import piniaPersist from 'pinia-plugin-persist'
import Pagination from './components/Pagination/index.vue'
import DialogForm from './components/DialogForm/index.vue'

const app = createApp(App)
app.use(router)
app.use(createPinia().use(piniaPersist))
app.use(ElementPlus)
app.component('Pagination', Pagination)
app.component('DialogForm', DialogForm)
app.mount('#app')

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { App } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'

export default {
  install(app: App) {
    app.use(ElementPlus, {
      locale: zhCn
    })
    // 方式一
    Object.keys(ElIcons).forEach((key) => {
      app.component(key, ElIcons[key as keyof typeof ElIcons])
    })
  }
}

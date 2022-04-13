import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      // 配置选项 禁用eslint缓存
      cache: false
    }),
    vueJsx({
      // 配置选项
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 导入sass 全局变量
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
})

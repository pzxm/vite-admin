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
  },
  server: {
    proxy: {
      // 字符串简写写法
      '/foo': 'http://localhost:4567',
      // 选项写法
      '/api/': {
        // 代理目标地址
        target: 'http://127.0.0.1:9978/api/v1',
        changeOrigin: true,
        // 重写请求地址 /api/xxx => http://127.0.0.1:9978/api/v1/xxx
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 正则表达式写法 匹配以/fallback开头的路径
      '^/fallback/.*': {
        target: 'http://www.proxy.com',
        changeOrigin: true,
        // 重写请求地址 /fallback/login => http://www.proxy.com/login
        rewrite: (path) => path.replace(/^\/fallback/, '')
      }
    }
  }
})

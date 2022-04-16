<template>
  <el-menu
    active-text-color="#409eff"
    background-color="#304156"
    class="el-menu-vertical-demo"
    :default-active="activeMenu"
    text-color="#fff"
    :unique-opened="true"
    :collapse="isCollapse"
    router
  >
    <menu-item :menus="menus" />
  </el-menu>
</template>

<script lang="ts" setup>
import useStore from '@/store/index'
import { computed, reactive } from 'vue'
import MenuItem from '@/layout/siderbar/MenuItem.vue'
import { MenuInfo } from '@/types/menu'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
// 获取pinia中的isCollapse属性
const isCollapse = computed(() => store.isCollapse)
const activeMenu = computed(() => route.path)

const menus = reactive<Array<MenuInfo>>([
  {
    path: '/',
    meta: {
      title: '首页',
      icon: 'HomeFilled'
    },
    children: []
  },
  {
    path: '/system',
    meta: {
      title: '系统管理',
      icon: 'Setting'
    },
    children: [
      {
        path: '/user',
        children: [],
        meta: {
          title: '用户管理',
          icon: 'User'
        }
      },
      {
        path: '/menu',
        children: [],
        meta: {
          title: '菜单管理',
          icon: 'Menu'
        }
      },
      {
        path: '/role',
        meta: {
          title: '角色管理',
          icon: 'View'
        }
      },
      {
        path: '/dept',
        meta: {
          title: '部门管理',
          icon: 'Operation'
        }
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

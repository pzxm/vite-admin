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
import { computed } from 'vue'
import MenuItem from '@/layout/siderbar/MenuItem.vue'
import { MenuInfo } from '@/types/system/menu'
import { useRoute } from 'vue-router'

const { menuStore } = useStore()
const route = useRoute()
// 获取pinia中的isCollapse属性
const isCollapse = computed(() => menuStore.isCollapse)
const activeMenu = computed(() => route.path)
const menus = computed<MenuInfo[]>(() => menuStore.menuList)
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

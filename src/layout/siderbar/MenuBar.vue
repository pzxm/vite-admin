<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    :default-active="path"
    text-color="#fff"
    :unique-opened="true"
    :collapse="isCollapse"
    router
  >
    <el-menu-item index="/">
      <el-icon><location /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="/system">
      <template #title>
        <el-icon><location /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/user">
        <el-icon><location /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/dept">
        <el-icon><location /></el-icon>
        <span>部门管理</span>
      </el-menu-item>
      <el-menu-item index="/role">
        <el-icon><location /></el-icon>
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="/menu">
        <el-icon><location /></el-icon>
        <span>菜单管理</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="">
      <template #title>
        <el-icon><location /></el-icon>
        <span>系统监控</span>
      </template>
      <el-menu-item index="/service">
        <el-icon><location /></el-icon>
        <span>服务监控</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import useStore from '@/store/index'
import { computed } from 'vue'
const store = useStore()
// const path = ref<string>(store.activeMenu)

// 获取pinia中的isCollapse属性
const isCollapse = computed(() => store.isCollapse)

const path = computed(() => store.activeMenu)
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

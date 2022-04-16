<template>
  <template v-for="menu in menus" :key="menu.path">
    <el-sub-menu
      v-if="menu.children && menu.children.length > 0"
      :index="menu.path"
    >
      <template #title>
        <!-- 动态组件的使用方式 -->
        <component class="icons" :is="menu.meta.icon" />
        <!-- 方式二 -->
        <!-- <Icon class="icons" :icon="menu.mata.icon"></Icon> -->
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item :menus="menu.children"></menu-item>
    </el-sub-menu>

    <el-menu-item v-else :index="menu.path">
      <i
        v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')"
        :class="menu.meta.icon"
      ></i>
      <component class="icons" v-else :is="menu.meta.icon" />
      <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { MenuInfo } from '@/types/menu'

defineProps({
  menus: {
    type: Array as () => Array<MenuInfo>,
    required: true,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.icons {
  width: 24px;
  height: 18px;
}
</style>

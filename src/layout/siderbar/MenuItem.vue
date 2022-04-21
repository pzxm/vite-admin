<template>
  <template v-for="menu in menus" :key="menu.path">
    <el-sub-menu
      v-if="menu.children && menu.children.length > 0"
      :index="menu.path"
    >
      <template #title>
        <!-- 动态组件的使用方式 -->
        <component class="icons" :is="menu.icon" />
        <!-- 方式二 -->
        <!-- <Icon class="icons" :icon="menu.mata.icon"></Icon> -->
        <span>{{ menu.name }}</span>
      </template>
      <menu-item
        :menus="menu.children"
        :base-path="menu.path + '/'"
      ></menu-item>
    </el-sub-menu>

    <el-menu-item
      v-else
      :index="menu.path.indexOf('/') > -1 ? menu.path : basePath + menu.path"
    >
      <i
        v-if="menu.icon && menu.icon.includes('el-icon')"
        :class="menu.icon"
      ></i>
      <component class="icons" v-else :is="menu.icon" />
      <template #title>{{ menu.name }}</template>
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
  },
  // 基础路径（多级菜单时拼接菜单路由需要）
  basePath: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.icons {
  width: 24px;
  height: 18px;
}
</style>

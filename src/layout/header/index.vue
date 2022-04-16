<template>
  <div class="nav-bar">
    <div class="nav-left">
      <collapse />
      <bread-crumb />
    </div>
    <tool-bar class="nav-right" />
  </div>
</template>

<script lang="ts" setup>
import Collapse from '@/layout/header/Collapse.vue'
import BreadCrumb from '@/layout/header/BreadCrumb.vue'
import ToolBar from '@/layout/header/ToolBar.vue'
</script>

<style lang="scss" scoped>
.nav-bar {
  padding: 10px 0px 10px 20px;
  display: flex;
  justify-content: space-between;
}
.nav-left {
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div class="nav-header">
    <collapse />
    <bread-crumb />
  </div>
</template>

<script lang="ts" setup>
import Collapse from '@/layout/header/Collapse.vue'
import BreadCrumb from '@/layout/header/BreadCrumb.vue'
</script>

<style lang="scss" scoped>
.nav-header {
  padding: 20px 0px 20px 20px;
  display: flex;
  align-items: center;
}
</style>

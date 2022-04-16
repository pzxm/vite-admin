<template>
  <div class="tab-container">
    <tabs class="left" />
    <drop-down class="right" />
  </div>
</template>

<script lang="ts" setup>
import Tabs from '@/layout/tabs/Tabs.vue'
import DropDown from '@/layout/tabs/DropDown.vue'
</script>

<style lang="scss" scoped>
.tab-container {
  display: flex;
  justify-content: space-between;
  border-color: #ffffff;
  .left {
    width: 100%;
  }
  .right {
    box-sizing: border-box;
    padding-right: 5px;
    background-color: #ffffff;
  }
}
</style>

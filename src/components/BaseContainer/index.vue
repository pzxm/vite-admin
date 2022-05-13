<template>
  <div class="basic-container">
    <el-card shadow="never">
      <slot />
    </el-card>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.basic-container {
  padding: 0px 10px 8px 10px;
  border-radius: 10px;
  box-sizing: border-box;
  .el-card {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
  &--block {
    height: 100%;
    .el-card {
      height: 100%;
    }
  }
}
</style>

<template>
  <el-dialog
    :model-value="true"
    width="50%"
    ref="dialog"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IElDialog } from '@/types/other/element-plus'

const loading = ref<boolean>(false)
const dialog = ref<IElDialog | null>(null)

const emit = defineEmits<{
  (e: 'submit'): Promise<void>
}>()

/**
 * 取消
 */
const handleCancel = () => {
  console.log(dialog.value)

  // 关闭dialog对话框显示
  if (dialog.value) {
    dialog.value.visible = false
  }
}

/**
 * 确认
 */
const handleConfirm = () => {
  loading.value = true
  emit('submit')
  loading.value = false
}
</script>

<style lang="scss" scoped></style>

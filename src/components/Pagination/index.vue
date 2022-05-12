<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { scrollTo } from '@/utils/scroll-to'
const props = defineProps({
  total: {
    required: true,
    type: Number as PropType<number>,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 20, 30, 50]
    }
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:page', page: number): void
  (e: 'update:limit', limit: number): void
  (e: 'pagination'): void
}>()

const currentPage = computed(() => {
  return props.page
})

const pageSize = computed(() => {
  return props.limit
})

function handleSizeChange(page: number) {
  emit('update:page', 1)
  emit('update:limit', page)
  emit('pagination')
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
function handleCurrentChange(limit: number) {
  emit('update:page', limit)
  emit('pagination')
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  padding-top: 10px;
}
.pagination-container.hidden {
  display: none;
}
</style>

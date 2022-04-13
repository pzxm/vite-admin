<template>
  <h1>首页</h1>
  <p>{{ store.state.count }}</p>
</template>

<script lang="ts" setup>
import { getUserInfo } from '@/api/user'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
  getUserInfo().then((data) => {
    console.log(data)
    console.log(data.name)
  })
})
</script>

<style lang="scss" scoped>
h1 {
  color: $color;
}
</style>

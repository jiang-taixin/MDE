<template>
  <div class="bg-red-400">{{ test }}</div>
  <a-button type="primary">Primary Button</a-button>
  <RouterView />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const test = ref<string>('hello')
</script>
<style scoped></style>

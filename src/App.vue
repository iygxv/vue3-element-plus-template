<script setup lang="ts">
const a = '2'
console.log(a)

console.log('当前环境变量: ', import.meta.env)
</script>

<template>
  <router-view />
</template>

<style scoped></style>

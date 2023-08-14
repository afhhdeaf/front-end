<template>
  <el-config-provider>
    <el-scrollbar ref="scroll" height="100vh">
      <router-view />
    </el-scrollbar>
  </el-config-provider>
</template>

<script setup>
  import { ref } from 'vue'
  const scroll = ref(null)
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: $base-font-size-default;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

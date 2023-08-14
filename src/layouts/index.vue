<template>
  <div class="admin-container">
      <Horizontal> </Horizontal>
      <el-backtop></el-backtop>
  </div>
</template>

<script setup>
import Horizontal from './components/Horizontal.vue';
</script>

<style lang="scss" scoped>
  .admin-container {
    position: relative;
    background-color: $base-content-bg-color;
    .container {
      position: absolute;
      right: 0;
      transition: all $base-transition-time-4;
    }
    .header {
      padding: 0;
      transition: all $base-transition-time-4;
      &.fixed {
        position: fixed;
        top: 0;
        right: 0;
        z-index: $base-z-index-999;
      }
    }
    .main {
      position: relative;
      top: $base-main-notag-top;
      overflow-y: auto;
      &.fixed {
        top: $base-main-fixed-top;
      }
      &[class='el-main main fixed notag'] {
        top: $base-main-vertical-fixed-notag-top;
      }
      &[class='el-main main notag'] {
        top: $base-main-notag-top;
      }
      background-color: $base-content-bg-color;
    }
  }
</style>

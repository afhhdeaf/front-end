<template>
  <div class="logo-wrapper">
    <svg-icon name="logo" size="35px" />
    <span class="logo-text" :style="{ color: textColor }">Acloud</span>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
  }
</script>

<script setup>
  import { computed } from 'vue'
  import { themeConf } from '@/conf/theme.js'

  const { colorOptions } = themeConf
  const { theme } = themeConf

  const textColor = computed(() => {
    const whiteColors = [
      '#fff',
      '#ffffff',
      '#FFF',
      '#FFF',
      'rgb(255, 255, 255)',
    ]
    const color = colorOptions[theme].menuBgColor
    return whiteColors.indexOf(color) !== -1 ? '#333' : '#fff'
  })
</script>

<style lang="scss" scoped>
  .logo-wrapper {
    display: flex;
    align-items: center; //容器内部项目的默认对齐方式
    justify-content: flex-start; //属性水平对齐弹性容器的项目
    width: $base-logo-width;
    cursor: pointer;
    .logo-text {
      display: inline-block;
      max-width: calc(246px - 60px);
      padding-left: $base-padding-10;
      overflow: hidden;
      font-size: $base-font-size-max;
      line-height: $base-logo-height;
      color: #333;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
  }
</style>

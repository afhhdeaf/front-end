<template>
  <el-container class="horizontal-container">
    <el-header class="head" :style="{ 'background-color': menuBgColor }">
      <div class="head-nav">
        <Logo />
        <el-menu
          :active-text-color="activeTextColor"
          :background-color="menuBgColor"
          class="menu"
          :default-active="defaultActive"
          mode="horizontal"
          router
          :text-color="textColor"
        >
          <template v-for="item in routes">
            <template v-if="!item.hidden">
              <MenuItem :key="item.path" :item="item" />
            </template>
          </template>
        </el-menu>
        <RightPanel />
      </div>
    </el-header>

    <el-main class="main">
      <AppMain />
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'Horizontal',
    components: { RightPanel },
  }
</script>

<script setup>
  import { themeConf } from '@/conf/theme' //加括号是因为导出的是变量，没有使用export defalut
  import { computed, ref } from 'vue'
  import Logo from './Logo.vue'
  import { constRoutes } from '../../router'
  import MenuItem from './MenuItem.vue'
  import AppMain from './AppMain.vue'
  import RightPanel from './RightPanel.vue'

  const whiteColors = ['#fff', '#ffffff', '#FFF', '#FFF', 'rgb(255, 255, 255)']

  const routes = ref(constRoutes)
  // console.log(routes)
  const { colorOptions } = themeConf
  const { theme } = themeConf

  const menuBgColor = computed(() => {
    return colorOptions[theme].menuBgColor
  })

  const defaultActive = ref('/index')

  // const handleSelect = (key, keyPath) => {
  //   console.log(key, keyPath)
  // }

  const textColor = computed(() => {
    return whiteColors.indexOf(menuBgColor.value) !== -1 ? '#333' : '#fff'
  })

  const activeTextColor = computed(() => {
    const mcolor = whiteColors.indexOf(menuBgColor.value) !== -1
    return mcolor ? theme : '#fff'
  })
</script>

<style lang="scss" scoped>
  .horizontal-container {
    position: relative;
    align-items: center;
    .head {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 99;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: $base-width;
      transition: background-color $base-transition-time;
      &-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 90%;
      }
      .menu {
        bottom: 0;
        flex: 1;
        border: none;
      }
    }
    .main {
      width: calc(90% + 40px);
      margin: 50px 20px 0 20px;
      margin-top: 50px;
    }
  }
</style>

<!-- 头像 -->
<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown" :style="{ color }">
      <img class="user-avatar" src="@/assets/Raven.jpg" />
      <div class="user-name">
        {{ userName }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="github">Github</el-dropdown-item>
        <el-dropdown-item command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'Avatar',
  }
</script>

<script setup>
  import { ref } from 'vue'
  import router from '@/router'

  defineProps({
    color: {
      type: String,
      default: '#888',
    },
  })

  // const avatar = require('@/assets/Raven.jpg')
  const userName = ref('Raven')

  const handleCommand = (command) => {
    if (command === 'logout') {
      console.log('退出')
      router.push({ path: '/login' }).then(() => {})
    }
    if (command === 'github') {
      window.open('https://github.com/afhhdeaf/')
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: $base-avatar-dropdown-height;
    padding: $base-padding-10;
    .user-avatar {
      width: $base-avatar-width;
      height: $base-avatar-height;
      cursor: pointer;
      border-radius: $base-border-radius-circle;
    }
    .user-name {
      position: relative;
      margin-right: $base-margin-5;
      margin-left: $base-margin-5;
      cursor: pointer;
    }
  }
</style>

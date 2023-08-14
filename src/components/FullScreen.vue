<template>
  <span
    class="icon-hover full-screen-wrapper"
    :title="isFullScreen ? title.notFullScreen : title.isFullScreen"
  >
    <component
      theme="filled"
      size="16"
      :fill="color"
      :strokeWidth="4"
      :is="(isFullScreen ? 'icon-off' : 'icon-full') + '-screen'"
      @click="handleClick"
    />
  </span>
</template>

<script setup>
import screenfull from 'screenfull';
import { ElMessage } from 'element-plus';
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';


defineProps({
  color: {
    type: String,
    default: '#fff',
  },
});

const store = useStore();

const title = {
  isFullScreen: '全屏',
  notFullScreen: '退出全屏'
}

const isFullScreen = computed( ()=>{
  return store.getters['setting/isFullScreen'];
} );

const handleClick = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('进入全屏失败');
    return false;
  }
  store.dispatch('setting/changeFullScreen', !isFullScreen.value);
  screenfull.toggle();
};
</script>

<style lang="scss" scoped>
  .full-screen-wrapper {
    padding: 20px 10px;
    cursor: pointer;
  }
</style>

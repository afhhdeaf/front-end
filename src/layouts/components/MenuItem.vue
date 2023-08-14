<template>
  <el-menu-item
    v-if="!item.meta || !item.children"
    :key="item.path"
    :index="item.children ? item.children[0].path : item.path"
  >
    <component
      :is="item.children ? item.children[0].meta.icon : item.meta.icon"
      v-if="item.children ? item.children[0].meta.icon : item.meta.icon"
      class="menu-icon"
      size="14"
      stroke-width="3"
      theme="outline"
    />
    <template #title>
      <span class="title">
        {{ item.children ? item.children[0].meta.title : item.meta.title }}
      </span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :index="item.path">
    <template #title>
      <component
        :is="item.meta.icon"
        v-if="item.meta.icon"
        class="menu-icon"
        size="14"
        stroke-width="3"
        theme="outline"
      />
      <span class="title">{{ item.meta.title }}</span>
    </template>
    <template v-for="(option, index) in item.children">
      <menu-item v-if="option.children" :key="option.path" :item="option" />
      <el-menu-item v-else :key="index" :index="option.path">
        <component
          :is="option.meta.icon"
          v-if="option.meta.icon"
          class="menu-icon"
          size="14"
          stroke-width="3"
          theme="outline"
        />
        <span class="title">
          {{ option.meta.title }}
        </span>
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>

<script>
  export default {
    name: 'MenuItem',
  }
</script>

<script setup>
  defineProps({
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
  })
</script>
<style lang="scss" scoped>
  .menu-icon,
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: $base-icon-width-big !important;
    height: $base-icon-height-super-max !important;
    margin-right: $base-margin-5;
    visibility: initial !important;
  }
  .title {
    padding-left: 6px;
  }
  .el-menu-item:hover {
    // color: #409eff !important;
    background-color: #409eff !important;
    outline: 0 !important;
  }
  .el-menu-item.is-active {
    // color: #409eff !important;
    background-color: #409eff !important;
    outline: 0 !important;
  }
</style>

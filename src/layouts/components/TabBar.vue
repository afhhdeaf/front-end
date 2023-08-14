<template>
  <div id="tab-bar-container" class="tab-bar-container">
    <el-tabs
      v-model="tabActive"
      class="tabs-content"
      type="card"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :closable="!isAffix(item)"
        :name="item.path"
      >
        <template #label>
          <div class="item">
            <component
              :is="item.meta.icon"
              v-if="item.meta.icon"
              class="menu-itcon"
              stroke-width="3"
              theme="outline"
            >
              <span>
                {{ item.meta.title }}
              </span>
            </component>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
  }
</script>

<script setup></script>

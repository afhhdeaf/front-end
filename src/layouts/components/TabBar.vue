<template>
  <div id="tab-bar-container" class="tab-bar-container">
    <el-tabs v-model="tabActive" 
      type="card"
      class="tabs-content"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"  
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :name="item.path"
        :closable="!isAffix(item)"
      >
        <template #label>
          <div class="item">
            <component
              class="menu-itcon"
              v-if="item.meta.icon"
              theme="outline"
              strokeWidth="3"
              :is="item.meta.icon"
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

<script setup>

</script>
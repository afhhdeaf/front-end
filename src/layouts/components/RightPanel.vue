<template>
  <div class="right-panel">
    <full-screen />
    <!-- <el-popover placement="bottom" :width="320" trigger="hover">
      <template #reference>
        <icon-remind
          class="icon-hover refresh"
          theme="outline"
          size="16"
          :fill="color"
          :strokeWidth="3"
        />
      </template>
      <div class="message-box">
        <el-tabs v-model="activeName" stretch>
          <el-tab-pane :label="`${t('tabs.notice')} (5)`" name="first">
            <Cell :list="noticeList" />
          </el-tab-pane>
          <el-tab-pane :label="`${t('tabs.message')} (0)`" name="second">暂无消息</el-tab-pane>
          <el-tab-pane :label="`${t('tabs.email')} (0)`" name="third">暂无邮件</el-tab-pane>
        </el-tabs>
      </div>
    </el-popover> -->

    <icon-refresh
      class="icon-hover refresh"
      :fill="color"
      size="16"
      :stroke-width="4"
      theme="filled"
      title="刷新"
    />
    <Avatar :color="color" />
  </div>
</template>

<script setup>
  import Avatar from './Avatar.vue'

  defineProps({
    color: {
      type: String,
      default: '#fff',
    },
  })
</script>

<script>
  export default {
    name: 'RightPanel',
  }
</script>

<style lang="scss" scoped>
  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-bar-height;
    .refresh {
      padding-right: 15px;
      padding-left: 10px;
    }
  }
</style>

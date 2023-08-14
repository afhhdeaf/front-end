<template>
  <div class="index-container">
    <div
      class="head-card"
      :style="'background-image:url(../static/card-bg.jpg)'"
    >
      <div class="avatar">
        <img class="user-avatar" src="@/assets/Raven.jpg" />
      </div>
      <div class="head-card-content">
        <h2 class="title">Welcom, Raven Stock!</h2>
        <p class="desktop">欢迎使用Acloud.</p>
      </div>
    </div>

    <div class="content">
      <el-row :gutter="20">
        <el-col :lg="16" :md="12" :sm="24" :xl="16" :xs="24">
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">近7天节点数据</h3>
            </template>
            <el-row class="charts" :gutter="5">
              <!-- (1, 1) -->
              <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
                <Echarts
                  header-icon="icon-chart-line"
                  :index="0"
                  :options="options[0]"
                  :style="{
                    height: '200px',
                  }"
                  :title="title[0]"
                />
              </el-col>
              <!-- (1, 2) -->
              <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
                <Echarts
                  header-icon="icon-chart-line"
                  :index="1"
                  :options="options[1]"
                  :style="{
                    height: '200px',
                  }"
                  :title="title[1]"
                />
              </el-col>
            </el-row>

            <el-row class="charts" :gutter="5">
              <!-- (2, 1) -->
              <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
                <Echarts
                  header-icon="icon-chart-line"
                  :index="2"
                  :options="options[2]"
                  :style="{
                    height: '200px',
                  }"
                  :title="title[2]"
                />
              </el-col>
              <!-- (2, 2) -->
              <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
                <Echarts
                  header-icon="icon-chart-line"
                  :index="3"
                  :options="options[3]"
                  :style="{
                    height: '200px',
                  }"
                  :title="title[3]"
                />
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <el-col :lg="8" :md="8" :sm="24" :xl="8" :xs="24">
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">设备概况</h3>
            </template>
            <div class="count-box">
              <div v-for="(item, index) in device" :key="index" class="item">
                <span class="label">{{ item.key }}</span>
                <count-to
                  class="count"
                  :class="item.status"
                  :duration="2000"
                  :end-val="item.val"
                  :start-val="0"
                />
              </div>
            </div>
          </el-card>

          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">任务完成进度</h3>
            </template>
            <div v-for="(item, index) in taskProgress" :key="index">
              <div class="process-title">{{ item.name }}</div>
              <el-progress
                :color="item.color"
                :percentage="item.percentage"
                :stroke-width="8"
              />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
  }
</script>

<script setup>
  import { getResource } from '@/api/module/index'
  import { onBeforeMount, reactive } from 'vue'
  import Echarts from '@/components/Echarts/index.vue'
  import { CountTo } from 'vue3-count-to'

  var option = {
    series: [
      {
        data: [],
        type: 'line',
        smooth: true,
      },
    ],
    yAxis: {
      type: 'value',
    },
    xAxis: {
      type: 'category',
      data: [],
    },
    toolbox: {
      show: true,
    },
  }
  const options = reactive([]) //画图的数据
  const taskProgress = reactive([])
  const device = reactive([])
  const title = reactive([])

  onBeforeMount(() => {
    getResource().then((res) => {
      let data = res.data
      for (let i = 0; i < 4; i++) {
        option.series[0].data = data.sensors[i].data
        option.xAxis.data = data.axis
        options.push(JSON.parse(JSON.stringify(option)))
        title.push(data.sensors[i].name)
      }
      Object.assign(device, data.device)
      Object.assign(taskProgress, data.taskProgress)
    })
  })
</script>

<style lang="scss" scoped>
  .index-container {
    width: $base-width;
    .head-card {
      display: flex;
      align-items: center;
      padding: $base-main-padding;
      background-color: $base-color-white;
      // background-image: "@/assets/card-bg.jpg";
      &-content {
        padding-left: 15px;
        color: $base-color-white;
        .desktop {
          color: $base-color-white;
        }
      }
      .user-avatar {
        width: $base-avatar-width * 1.2;
        height: $base-avatar-height * 1.2;
        cursor: pointer;
        border-radius: $base-border-radius-circle;
      }
    }
    .content {
      margin: 15px 0;
      .charts {
        position: relative;
        padding-top: 5px;
      }
      .title {
        margin: 0;
      }
      .process-title {
        padding: 10px 0;
        font-weight: 500;
      }
      .card {
        margin-bottom: 15px;
        &-body {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          .item {
            box-sizing: border-box;
            padding: 10px 20px;
            margin-top: -1px;
            margin-left: -1px;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid black;
            border: 1px solid #eee;
            transition: box-shadow 0.5;
            &:hover {
              box-shadow: $base-box-shadow;
            }
            .title {
              padding-left: 5px;
              font-size: 18px;
              font-weight: bold;
            }
          }
        }
      }
      .count-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          display: flex;
          flex-direction: column;
          text-align: center;
          .label {
            padding: 10px 0;
            font-size: $base-font-size-big;
          }
          .count {
            font-size: $base-font-size-max;
            font-weight: bolder;
            color: $base-color-primary;
            &.error {
              color: var(--el-color-danger);
            }
            &.success {
              color: var(--el-color-success);
            }
          }
        }
      }
    }
  }
</style>

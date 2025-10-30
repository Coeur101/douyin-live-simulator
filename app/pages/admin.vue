<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <div class="max-w-4xl mx-auto">
      <!-- 头部 -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">直播间管理后台</h1>
        <div class="flex space-x-4">
          <button
            @click="saveConfig"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            保存配置
          </button>
          <button
            @click="$router.push('/')"
            class="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            返回直播间
          </button>
        </div>
      </div>

      <!-- 配置表单 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 基础设置 -->
        <div class="bg-gray-800 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            <Icon name="lucide:settings" class="w-5 h-5 mr-2" />
            基础设置
          </h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">主播名称</label>
              <input
                v-model="config.streamerName"
                type="text"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入主播名称"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">在线人数</label>
              <input
                v-model.number="config.onlineCount"
                type="number"
                min="1"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入在线人数"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">
                弹幕强度 (间隔秒数: {{ config.danmakuIntensity }}s)
              </label>
              <input
                v-model.number="config.danmakuIntensity"
                type="range"
                min="1"
                max="10"
                step="0.5"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>频繁 (1s)</span>
                <span>适中 (5s)</span>
                <span>稀少 (10s)</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">
                点赞强度 (每秒{{ config.likeIntensity }}个)
              </label>
              <input
                v-model.number="config.likeIntensity"
                type="range"
                min="1"
                max="20"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>少量 (1个/s)</span>
                <span>适中 (10个/s)</span>
                <span>爆炸 (20个/s)</span>
              </div>
            </div>

            <div class="flex items-center">
              <input
                v-model="config.giftEnabled"
                type="checkbox"
                id="giftEnabled"
                class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label for="giftEnabled" class="ml-2 text-sm font-medium">
                启用礼物特效
              </label>
            </div>
          </div>
        </div>

        <!-- 实时统计 -->
        <div class="bg-gray-800 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            <Icon name="lucide:bar-chart" class="w-5 h-5 mr-2" />
            实时统计
          </h2>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-400">{{ config.onlineCount }}</div>
              <div class="text-sm text-gray-400">在线人数</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-red-400">{{ config.likeIntensity }}</div>
              <div class="text-sm text-gray-400">点赞强度</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ config.danmakuIntensity }}s</div>
              <div class="text-sm text-gray-400">弹幕间隔</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-400">{{ config.giftEnabled ? '已启用' : '已禁用' }}</div>
              <div class="text-sm text-gray-400">礼物状态</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useLiveroomStore } from '~/stores/liveroom'
import type { LiveConfig } from '~/types'

// 简化的配置对象
const config = reactive({
  streamerName: '美丽主播',
  onlineCount: 1234,
  danmakuIntensity: 3,
  likeIntensity: 5,
  giftEnabled: true
})

const saveConfig = () => {
  // 显示保存成功提示
  alert('配置已保存！')
}

// 设置页面元数据
useHead({
  title: '管理后台 - 抖音直播间模拟器'
})
</script>
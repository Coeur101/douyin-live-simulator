<template>
  <div class="fixed top-4 right-4 z-20">
    <!-- 在线人数 -->
    <div class="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
      <Icon name="lucide:users" class="w-4 h-4 text-white/80" />
      <span class="text-white text-sm font-medium">{{ formatNumber(onlineCount) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 在线人数（模拟动态变化）
const onlineCount = ref(12847)

// 格式化数字显示
const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// 模拟在线人数变化
let countTimer: NodeJS.Timeout | null = null

onMounted(() => {
  // 每5秒随机变化在线人数
  countTimer = setInterval(() => {
    const change = Math.floor(Math.random() * 200) - 100 // -100 到 +100
    onlineCount.value = Math.max(1000, onlineCount.value + change)
  }, 5000)
})

onUnmounted(() => {
  if (countTimer) clearInterval(countTimer)
})
</script>

<style scoped>
/* 简洁样式 */
</style>
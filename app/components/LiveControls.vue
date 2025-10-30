<template>
  <div class="fixed bottom-4 right-4 z-10">
    <!-- 互动按钮 -->
    <div class="flex flex-col space-y-3">
        <!-- 点赞按钮 -->
        <button
          @click="triggerLike"
          class="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
        >
          <Icon name="lucide:heart" class="w-6 h-6 text-white" />
        </button>

        <!-- 礼物按钮 -->
        <button
          @click="showGiftPanel = !showGiftPanel"
          class="w-12 h-12 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
        >
          <Icon name="lucide:gift" class="w-6 h-6 text-white" />
        </button>

        <!-- 分享按钮 -->
        <button
          class="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
        >
          <Icon name="lucide:share" class="w-6 h-6 text-white" />
        </button>

        <!-- 管理按钮 -->
        <button
          @click="$router.push('/admin')"
          class="w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
        >
          <Icon name="lucide:settings" class="w-6 h-6 text-white" />
        </button>
      </div>

    <!-- 礼物面板 -->
    <Transition name="slide-up">
      <div
        v-if="showGiftPanel"
        class="absolute bottom-20 right-4 glass-effect rounded-lg p-4 w-64"
      >
        <h3 class="text-white font-medium mb-3">选择礼物</h3>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="gift in gifts"
            :key="gift.name"
            @click="sendGift(gift)"
            class="flex flex-col items-center p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div class="text-2xl mb-1">{{ gift.icon }}</div>
            <div class="text-xs text-white">{{ gift.name }}</div>
            <div class="text-xs text-yellow-400">{{ gift.value }}</div>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLiveroomStore } from '~/stores/liveroom'
import type { GiftItem } from '~/types'

const danmakuInput = ref('')
const showGiftPanel = ref(false)

const gifts = [
  { name: '玫瑰', icon: '🌹', value: 1 },
  { name: '爱心', icon: '💖', value: 5 },
  { name: '火箭', icon: '🚀', value: 100 },
  { name: '皇冠', icon: '👑', value: 500 },
  { name: '钻石', icon: '💎', value: 1000 },
  { name: '城堡', icon: '🏰', value: 5000 }
]

const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const sendDanmaku = () => {
  if (danmakuInput.value.trim()) {
    // 这里可以添加发送弹幕的逻辑
    console.log('发送弹幕:', danmakuInput.value.trim())
    danmakuInput.value = ''
  }
}

const triggerLike = () => {
  // 手动触发一个点赞特效
  console.log('点赞!')
}

const sendGift = (gift: GiftItem) => {
  console.log('发送礼物:', gift)
  showGiftPanel.value = false
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
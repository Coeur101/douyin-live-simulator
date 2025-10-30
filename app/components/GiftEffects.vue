<template>
  <div class="fixed inset-0 pointer-events-none flex items-center justify-center">
    <!-- 礼物特效容器 - 屏幕中间 -->
    <div class="relative">
      <TransitionGroup name="gift" tag="div" class="space-y-4">
        <div
          v-for="gift in store.giftEffects"
          :key="gift.id"
          class="gift-animation glass-effect rounded-xl p-4 min-w-[300px] max-w-sm mx-auto"
        >
          <div class="flex items-center space-x-4">
            <!-- 礼物图标 -->
            <div class="text-5xl animate-bounce">{{ gift.giftIcon }}</div>
            
            <!-- 礼物信息 -->
            <div class="flex-1">
              <div class="text-lg font-bold text-white mb-1">
                {{ gift.sender }} 送出了
              </div>
              <div class="text-xl font-bold text-yellow-300 mb-2">
                {{ gift.giftName }}
              </div>
              <div class="text-sm text-yellow-400 flex items-center">
                <Icon name="lucide:coins" class="w-4 h-4 mr-1" />
                价值 {{ formatNumber(gift.value) }} 金币
              </div>
            </div>
          </div>
          
          <!-- 特效装饰 -->
          <div class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
          <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLiveroomStore } from '~/stores/liveroom'

const store = useLiveroomStore()

// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>

<style scoped>
.glass-effect {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.gift-enter-active {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.gift-leave-active {
  transition: all 0.4s ease-in;
}

.gift-enter-from {
  opacity: 0;
  transform: scale(0.3) translateY(100px);
}

.gift-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-50px);
}

.gift-move {
  transition: transform 0.4s ease;
}

/* 礼物动画效果 */
.gift-animation {
  animation: giftPulse 0.6s ease-out;
}

@keyframes giftPulse {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 闪烁效果 */
.gift-animation::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shimmer 2s infinite;
  border-radius: inherit;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
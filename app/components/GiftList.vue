<template>
  <div class="fixed bottom-72 left-4 w-80 h-30 z-10">
    <!-- 礼物列表容器 -->
    <div class="relative h-full overflow-hidden">
      <!-- 礼物消息列表 -->
      <div class="h-full overflow-hidden">
        <TransitionGroup name="gift-slide" tag="div" class="space-y-1">
          <div
            v-for="gift in visibleGifts"
            :key="gift.id"
            class="gift-item flex items-center space-x-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm rounded-full px-3 py-2 mx-1 max-w-fit border border-white/20"
          >
            <!-- 用户头像 -->
            <img 
              :src="gift.userAvatar" 
              :alt="gift.username"
              class="w-7 h-7 rounded-full border border-white/40"
            >
            
            <!-- 礼物信息 -->
            <div class="flex items-center space-x-2">
              <span class="text-white font-medium text-sm">{{ gift.username }}</span>
              <span class="text-white/90 text-xs">送出</span>
              <span class="text-lg">{{ gift.giftIcon }}</span>
              <span class="text-yellow-300 font-bold text-sm">{{ gift.giftName }}</span>
              <span v-if="gift.count > 1" class="text-white font-bold text-sm">x{{ gift.count }}</span>
            </div>
            
            <!-- 礼物价值 -->
            <div class="flex items-center space-x-1">
              <Icon name="lucide:heart" class="w-4 h-4 text-red-400" />
              <span class="text-yellow-300 font-bold text-sm">{{ gift.value }}</span>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLiveroomStore } from '~/stores/liveroom'

const store = useLiveroomStore()

// 礼物数据
const gifts = ref<any[]>([])
const maxVisibleGifts = 3

// 礼物池
const giftPool = [
  { name: '玫瑰花', icon: '🌹', value: 1 },
  { name: '棒棒糖', icon: '🍭', value: 5 },
  { name: '咖啡', icon: '☕', value: 10 },
  { name: '蛋糕', icon: '🎂', value: 20 },
  { name: '钻石', icon: '💎', value: 50 },
  { name: '跑车', icon: '🏎️', value: 100 },
  { name: '城堡', icon: '🏰', value: 500 },
  { name: '火箭', icon: '🚀', value: 1000 }
]

// 用户池
const userPool = [
  { name: '小可爱', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face' },
  { name: '大帅哥', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' },
  { name: '甜心', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face' },
  { name: '阳光', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
  { name: '月亮', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop&crop=face' },
  { name: '星星', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face' },
  { name: '彩虹', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face' },
  { name: '花朵', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=50&h=50&fit=crop&crop=face' }
]

// 显示的礼物列表（直接使用gifts数组，控制其长度）
const visibleGifts = computed(() => {
  return gifts.value
})

// 生成随机礼物
const generateGift = () => {
  const user = userPool[Math.floor(Math.random() * userPool.length)]
  const gift = giftPool[Math.floor(Math.random() * giftPool.length)]
  const count = Math.floor(Math.random() * 5) + 1 // 1-5个
  
  const newGift = {
    id: Date.now().toString() + Math.random(),
    username: user?.name,
    userAvatar: user?.avatar,
    giftName: gift?.name,
    giftIcon: gift?.icon,
    value: (gift?.value as number) * count,
    count: count,
    timestamp: Date.now()
  }
  
  gifts.value.push(newGift)
  
  // 保持列表长度不超过最大显示数量，确保正确的滚动效果
  if (gifts.value.length > maxVisibleGifts) {
    gifts.value.shift() // 移除最旧的礼物
  }
}

// 定时器
let giftTimer: NodeJS.Timeout | null = null

onMounted(() => {
  // 每2-5秒随机生成礼物
  const scheduleNextGift = () => {
    const delay = Math.random() * 3000 + 2000 // 2-5秒
    giftTimer = setTimeout(() => {
      generateGift()
      scheduleNextGift()
    }, delay)
  }
  
  scheduleNextGift()
})

onUnmounted(() => {
  if (giftTimer) {
    clearTimeout(giftTimer)
  }
})
</script>

<style scoped>
/* 礼物滑入动画 */
.gift-slide-enter-active {
  transition: all 0.6s ease-out;
}

.gift-slide-leave-active {
  transition: all 0.4s ease-in;
}

.gift-slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.8);
}

.gift-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.8);
}

.gift-slide-move {
  transition: transform 0.4s ease;
}

.gift-slide-move {
  transition: transform 0.5s ease;
}

/* 礼物项动画 */
.gift-item {
  animation: giftGlow 3s ease-in-out infinite alternate;
  transition: all 0.3s ease;
}

@keyframes giftGlow {
  0% {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.4), 0 0 15px rgba(147, 51, 234, 0.3);
  }
  100% {
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.6), 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(236, 72, 153, 0.3);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 悬停效果 */
.gift-item:hover {
  transform: scale(1.05) translateX(-5px);
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9));
}

/* 头像旋转效果 */
.gift-item img:first-child {
  transition: transform 0.3s ease;
}

.gift-item:hover img:first-child {
  transform: rotate(360deg) scale(1.1);
}

/* 礼物图标闪烁效果 */
.gift-item img:not(:first-child) {
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.2);
    filter: brightness(1.5);
  }
}
</style>
<template>
  <div class="fixed bottom-16 left-80 w-20 h-48 pointer-events-none z-20">
    <!-- 点赞特效容器 - 定位在点赞按钮上方 -->
    <div class="relative w-16 h-32">
      <TransitionGroup name="like" tag="div" class="absolute inset-0">
        <div
          v-for="like in store.likeEffects"
          :key="like.id"
          :style="{
            left: `${like.x * 0.5}px`,
            bottom: `${like.y * 0.3}px`
          }"
          class="absolute like-item"
        >
          <div class="like-icon">
            <Icon 
              :name="getLikeIcon(like.type)" 
              class="w-6 h-6"
              :class="getLikeColor(like.type)"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLiveroomStore } from '~/stores/liveroom'
import type { LikeEffectType } from '~/types'

const store = useLiveroomStore()

// 获取点赞图标
const getLikeIcon = (type: LikeEffectType) => {
  const icons = {
    heart: 'lucide:heart',
    note: 'lucide:music',
    star: 'lucide:star',
    flower: 'lucide:flower'
  }
  return icons[type] || 'lucide:heart'
}

// 获取点赞颜色
const getLikeColor = (type: LikeEffectType) => {
  const colors = {
    heart: 'text-red-400',
    note: 'text-blue-400',
    star: 'text-yellow-400',
    flower: 'text-pink-400'
  }
  return colors[type] || 'text-red-400'
}
</script>

<style scoped>
/* 点赞特效动画 */
.like-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.like-leave-active {
  transition: all 0.6s ease-in;
}

.like-enter-from {
  opacity: 0;
  transform: translateY(0) scale(0.5);
}

.like-enter-to {
  opacity: 1;
  transform: translateY(-80px) scale(1);
}

.like-leave-from {
  opacity: 1;
  transform: translateY(-80px) scale(1);
}

.like-leave-to {
  opacity: 0;
  transform: translateY(-120px) scale(0.3);
}

/* 点赞图标动画 */
.like-item {
  animation: likeFloat 3s ease-out forwards;
}

.like-icon {
  animation: likeScale 0.6s ease-out;
  filter: drop-shadow(0 0 8px currentColor);
}

@keyframes likeFloat {
  0% {
    opacity: 1;
    transform: translateY(0) scale(0.8) rotate(0deg);
  }
  20% {
    opacity: 1;
    transform: translateY(-20px) scale(1.2) rotate(-5deg);
  }
  40% {
    opacity: 1;
    transform: translateY(-40px) scale(1) rotate(5deg);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-60px) scale(0.9) rotate(-3deg);
  }
  80% {
    opacity: 0.4;
    transform: translateY(-80px) scale(0.7) rotate(2deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(0.3) rotate(0deg);
  }
}

@keyframes likeScale {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

/* 添加发光效果 */
.like-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: currentColor;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  animation: glow 1s ease-out infinite alternate;
  z-index: -1;
}

@keyframes glow {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

/* 移动动画 */
.like-move {
  transition: all 0.3s ease;
}
</style>
<template>
  <div class="fixed top-4 left-4 z-20">
    <!-- 主播信息卡片 -->
    <div class="flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
      <!-- 主播头像 -->
      <div class="relative">
        <img 
          :src="streamerInfo.avatar" 
          :alt="streamerInfo.nickname"
          class="w-12 h-12 rounded-full border-2 border-white/20"
        >
        <!-- 直播状态指示器 -->
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
          <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <!-- 主播信息 -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2">
          <h3 class="text-white font-medium text-sm truncate">{{ streamerInfo.nickname }}</h3>
          <!-- 认证标识 -->
          <Icon 
            v-if="streamerInfo.verified" 
            name="lucide:badge-check" 
            class="w-4 h-4 text-blue-400 flex-shrink-0"
          />
        </div>
        <p class="text-white/70 text-xs truncate max-w-32">{{ streamerInfo.description }}</p>
      </div>
      
      <!-- 关注按钮 -->
      <button 
        @click="toggleFollow"
        :class="[
          'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
          isFollowing 
            ? 'bg-white/20 text-white border border-white/30' 
            : 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
        ]"
      >
        {{ isFollowing ? '已关注' : '+ 关注' }}
      </button>
    </div>
    
    <!-- 主播标签 -->
    <div class="flex flex-wrap gap-1 mt-2 ml-2">
      <span 
        v-for="tag in streamerInfo.tags" 
        :key="tag"
        class="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLiveroomStore } from '~/stores/liveroom'

const store = useLiveroomStore()
const isFollowing = ref(false)

// 主播信息
const streamerInfo = computed(() => ({
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  nickname: 'YOYO',
  description: '每天晚上8点直播唱歌',
  verified: true,
  tags: ['唱歌', '聊天', '才艺']
}))

// 切换关注状态
const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
  
  // 添加关注动画效果
  if (isFollowing.value) {
    // 可以在这里添加关注成功的提示
    console.log('关注成功')
  }
}
</script>

<style scoped>
/* 关注按钮悬停效果 */
button:hover {
  transform: scale(1.05);
}

/* 头像悬停效果 */
img:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* 直播状态动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
<template>
  <div class="fixed bottom-16 left-4 w-80 h-52 pointer-events-none z-10">
    <!-- 评论列表容器 -->
    <div class="relative h-full overflow-hidden">
      <!-- 评论列表 -->
      <div class="h-full overflow-hidden">
        <TransitionGroup name="comment-slide" tag="div" class="space-y-1">
          <div
            v-for="comment in visibleComments"
            :key="comment.id"
            class="comment-item flex items-start space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-2 mx-1 max-w-fit"
          >
            <!-- 用户头像 -->
            <img 
              :src="comment.userAvatar" 
              :alt="comment.username"
              class="w-7 h-7 rounded-full border border-white/30 flex-shrink-0"
            >
            
            <!-- 评论内容 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-1">
                <!-- 等级标识 -->
                <span class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">{{ comment.level || 'Lv.1' }}</span>
                <span class="text-white font-medium text-sm truncate">{{ comment.username }}</span>
                <span class="text-white/60 text-xs">:</span>
              </div>
              <p class="text-white text-sm leading-tight mt-0.5">{{ comment.content }}</p>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useLiveroomStore, type CommentItem } from '~/stores/liveroom'

const store = useLiveroomStore()
const commentContainer = ref<HTMLElement>()

// 显示的评论（最多显示8条）
const visibleComments = computed(() => {
  return store.comments.slice(-8)
})

// 格式化时间
const formatTime = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) { // 1分钟内
    return '刚刚'
  } else if (diff < 3600000) { // 1小时内
    return `${Math.floor(diff / 60000)}分钟前`
  } else {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

// 监听评论变化，自动滚动到底部
watch(
  () => store.comments.length,
  async () => {
    await nextTick()
    if (commentContainer.value) {
      commentContainer.value.scrollTop = commentContainer.value.scrollHeight
    }
  }
)

// 定期生成随机评论（仅在直播时）
let commentTimer: NodeJS.Timeout | null = null

watch(
  () => store.isLive,
  (isLive) => {
    if (isLive) {
      // 每3-8秒生成一条随机评论
      const generateComment = () => {
        store.generateRandomComment()
        const nextDelay = 3000 + Math.random() * 5000 // 3-8秒随机间隔
        commentTimer = setTimeout(generateComment, nextDelay)
      }
      generateComment()
    } else {
      if (commentTimer) {
        clearTimeout(commentTimer)
        commentTimer = null
      }
    }
  },
  { immediate: true }
)

// 组件卸载时清理定时器
onUnmounted(() => {
  if (commentTimer) {
    clearTimeout(commentTimer)
  }
})
</script>

<style scoped>
/* 评论滑入动画 */
.comment-slide-enter-active {
  transition: all 0.4s ease;
}

.comment-slide-leave-active {
  transition: all 0.3s ease;
}

.comment-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.comment-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.comment-slide-move {
  transition: transform 0.4s ease;
}

/* 评论项样式 */
.comment-item {
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease-out;
}

.comment-item:hover {
  background: rgba(0, 0, 0, 0.6);
  transform: translateX(-3px) scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 头像悬停效果 */
.comment-item img {
  transition: transform 0.2s ease;
}

.comment-item:hover img {
  transform: scale(1.1);
}

/* 等级标识动画 */
.comment-item span[class*="bg-gradient"] {
  animation: pulse 2s infinite;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
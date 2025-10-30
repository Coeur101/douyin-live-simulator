<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
    
    <!-- 主播信息 - 左上角 -->
    <StreamerInfo />
    
    <!-- 在线人数和热度 - 右上角 -->
    <OnlineCount />
    
    <!-- 礼物列表 - 右侧中上部 -->
    <GiftList />
    
    <!-- 评论列表 - 右下角 -->
    <CommentList />
    
    <!-- 点赞特效 - 右下角点赞按钮上方 -->
    <LikeEffects />
    
    <!-- 礼物特效 - 屏幕中央 -->
    <GiftEffects />
    
    <!-- 控制面板 - 底部 -->
    <LiveControls />
    
    <!-- 评论输入框 - 底部 -->
    <CommentInput />
    
    <!-- 中央视频区域占位 -->
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <!-- 简单的直播状态指示 -->
        <div class="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
          <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span class="text-white/80 text-sm">直播中</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLiveroomStore } from '~/stores/liveroom'

// 使用直播间状态管理
const store = useLiveroomStore()

// 页面元数据
useHead({
  title: '抖音直播模拟器',
  meta: [
    { name: 'description', content: '体验真实的抖音直播互动环境' }
  ]
})

// 确保直播状态为开启
onMounted(() => {
  store.startLive()
})
</script>
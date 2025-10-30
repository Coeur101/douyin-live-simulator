<template>
  <div class="fixed bottom-4 left-4 z-20">
    <div class="flex items-center gap-3 bg-black/30 backdrop-blur-sm rounded-full px-4 py-3 w-72">
      <!-- 输入框 -->
      <div class="flex-1 relative">
        <input
          v-model="inputText"
          type="text"
          placeholder="说点什么..."
          class="w-full bg-white/10 text-white placeholder-white/60 rounded-full px-4 py-2 text-sm border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
          @keyup.enter="sendComment"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
      </div>
      
      <!-- 表情按钮 -->
      <button
        class="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        @click="toggleEmoji"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <!-- 发送按钮 -->
      <button
        :disabled="!inputText.trim()"
        class="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white disabled:text-white/30 transition-colors"
        @click="sendComment"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </div>
    
    <!-- 表情面板 -->
    <div
      v-if="showEmoji"
      class="absolute bottom-full left-0 mb-2 bg-black/80 backdrop-blur-sm rounded-lg p-3 grid grid-cols-8 gap-2 max-w-xs"
    >
      <button
        v-for="emoji in emojiList"
        :key="emoji"
        class="w-8 h-8 flex items-center justify-center text-lg hover:bg-white/10 rounded transition-colors"
        @click="addEmoji(emoji)"
      >
        {{ emoji }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLiveroomStore } from '~/stores/liveroom'

const liveroomStore = useLiveroomStore()

const inputText = ref('')
const isFocused = ref(false)
const showEmoji = ref(false)

const emojiList = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
  '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
  '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
  '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
  '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
  '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨'
]

const sendComment = () => {
  if (!inputText.value.trim()) return
  
  // 添加评论到store
  liveroomStore.addComment({
    id: Date.now().toString(),
    username: '我',
    content: inputText.value.trim(),
    timestamp: Date.now(),
    userAvatar: '/avatars/user.jpg'
  })
  
  inputText.value = ''
  showEmoji.value = false
}

const toggleEmoji = () => {
  showEmoji.value = !showEmoji.value
}

const addEmoji = (emoji: string) => {
  inputText.value += emoji
  showEmoji.value = false
}
</script>
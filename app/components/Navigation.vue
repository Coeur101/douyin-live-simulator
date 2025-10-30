<template>
  <nav class="fixed top-4 left-4 z-50">
    <div class="bg-black/50 backdrop-blur-sm rounded-lg p-2 flex space-x-2">
      <NuxtLink 
        to="/" 
        class="px-3 py-1 text-white text-sm rounded hover:bg-white/20 transition-colors"
        :class="{ 'bg-white/20': $route.path === '/' }"
      >
        Live
      </NuxtLink>
      <NuxtLink 
        to="/admin" 
        class="px-3 py-1 text-white text-sm rounded hover:bg-white/20 transition-colors"
        :class="{ 'bg-white/20': $route.path === '/admin' }"
      >
        Admin
      </NuxtLink>

    </div>
  </nav>
</template>

<script setup lang="ts">
// Navigation component for testing routes
</script>
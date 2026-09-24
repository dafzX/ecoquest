<template>
  <div class="min-h-screen bg-[#F8FAF8] transition-colors duration-300">

    <!-- Desktop -->
    <div class="hidden md:block">
      <Sidebar />
    </div>

    <div class="min-h-screen md:pl-60">

      <!-- Desktop -->
      <Topbar />

      <main
        class="min-h-[calc(100vh-76px)] px-4 py-6 md:px-8 md:py-8"
        :class="route.meta.hideBottomNav ? 'pb-6 md:pb-8' : 'pb-24 md:pb-8'"
      >
        <slot />
      </main>

    </div>

    <!-- Mobile -->
    <MobileBottomNav
      v-if="!route.meta.hideBottomNav"
    />

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import Sidebar from '@/components/navigation/Sidebar.vue'
import Topbar from '@/components/navigation/Topbar.vue'
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue'

const route = useRoute()
</script>
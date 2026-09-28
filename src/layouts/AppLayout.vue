<template>
  <div class="ecoquest-canvas min-h-screen transition-colors duration-300">
    <EcoBackground />

    <div class="relative z-10 min-h-screen">
      <!-- Desktop -->
      <div class="hidden md:block">
        <Sidebar />
      </div>

      <div class="min-h-screen md:pl-60">

        <!-- Desktop -->
        <Topbar />

        <main
          class="ecoquest-page-content min-h-[calc(100vh-76px)] px-4 py-6 md:px-8 md:py-8"
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
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import Sidebar from '@/components/navigation/Sidebar.vue'
import Topbar from '@/components/navigation/Topbar.vue'
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue'
import EcoBackground from '@/components/ui/EcoBackground.vue'

const route = useRoute()
</script>
<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile View -->
      <PrivacyMobile
        :settings="settings"
        @back="goBack"
        @toggle="handleToggle"
      />

      <!-- Desktop View -->
      <PrivacyDesktop
        :settings="settings"
        @back="goBack"
        @update="handleUpdate"
      />

    </div>
  </AppLayout>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'
import PrivacyMobile from '@/components/privacy/PrivacyMobile.vue'
import PrivacyDesktop from '@/components/privacy/PrivacyDesktop.vue'

const router = useRouter()

const settings = reactive({
  publicProfile: true,
  showActivity: true,
  showImpact: true,
  showLeaderboard: true
})

function goBack() {
  router.back()
}

function handleToggle(key) {
  settings[key] = !settings[key]
}

function handleUpdate(key, value) {
  settings[key] = value
}
</script>
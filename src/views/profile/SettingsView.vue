<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <!-- Mobile Component -->
      <SettingsMobile
        :settings="settings"
        @back="goBack"
        @toggle="toggleSetting"
        @update:language="updateLanguage"
        @logout="handleLogout"
      />

      <!-- Desktop Component -->
      <SettingsDesktop
        :settings="settings"
        @toggle="toggleSetting"
        @logout="handleLogout"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { logout as clearSession } from '@/services/auth'

import AppLayout from '@/layouts/AppLayout.vue'
import SettingsMobile from '@/components/settings/SettingsMobile.vue'
import SettingsDesktop from '@/components/settings/SettingsDesktop.vue'

const router = useRouter()

// 1. Data State (Dibagikan ke komponen mobile & desktop)
const settings = reactive({
  pushNotification: true,
  missionReminder: true,
  streakReminder: true,
  darkMode: false,
  language: 'Bahasa Indonesia'
})

// 2. Methods & Actions
const goBack = () => {
  router.back()
}

const toggleSetting = (key) => {
  settings[key] = !settings[key]
}

const updateLanguage = (language) => {
  settings.language = language
}

const handleLogout = () => {
  const confirmed = window.confirm('Yakin ingin keluar dari akun?')

  if (!confirmed) return

  clearSession()
  router.replace('/login')
}
</script>
<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7] relative">
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

      <!-- Toast Notification -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 translate-y-2"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 translate-y-2"
      >
        <div
          v-if="toast.show"
          class="fixed bottom-24 left-1/2 -translate-x-1/2 md:bottom-10 z-50 flex w-[90%] max-w-sm items-center gap-3 rounded-xl bg-[#17211B] px-4 py-3 text-sm font-medium text-white shadow-2xl md:w-auto"
        >
          <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
            <Check class="h-4 w-4 text-white" />
          </div>
          {{ toast.message }}
        </div>
      </Transition>
    </div>
  </AppLayout>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout as clearSession } from '@/services/auth'
import { Check } from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import SettingsMobile from '@/components/settings/SettingsMobile.vue'
import SettingsDesktop from '@/components/settings/SettingsDesktop.vue'
import {
  getSettings,
  updateSettings
} from '@/services/settings'

const router = useRouter()

// 1. Data State (Dibagikan ke komponen mobile & desktop)
const defaultSettings = {
  pushNotification: true,
  missionReminder: true,
  streakReminder: true,
  darkMode: false,
  language: 'Bahasa Indonesia'
}

const settings = reactive({ ...defaultSettings })
const settingsLoaded = ref(false)
let saveTimeout

// Toast State
const toast = reactive({
  show: false,
  message: '',
  timeout: null
})

onMounted(async () => {
  const result = await getSettings()

  if (result.success) {
    Object.assign(settings, result.settings)
  }

  settingsLoaded.value = true
})

watch(settings, (newSettings) => {
  if (!settingsLoaded.value) return

  clearTimeout(saveTimeout)

  saveTimeout = setTimeout(() => {
    updateSettings({ ...newSettings })
  }, 300)
}, { deep: true })

const showToast = (message) => {
  toast.message = message
  toast.show = true
  
  if (toast.timeout) clearTimeout(toast.timeout)
  
  toast.timeout = setTimeout(() => {
    toast.show = false
  }, 3000)
}

// 2. Methods & Actions
const goBack = () => {
  router.back()
}

const toggleSetting = (key) => {
  settings[key] = !settings[key]
  
  const status = settings[key] ? 'diaktifkan' : 'dimatikan'
  
  const labels = {
    pushNotification: 'Notifikasi Push',
    missionReminder: 'Reminder Mission',
    streakReminder: 'Streak Reminder',
    darkMode: 'Dark Mode'
  }
  
  showToast(`${labels[key] || 'Pengaturan'} berhasil ${status}.`)
}

const updateLanguage = (language) => {
  settings.language = language
  showToast(`Bahasa berhasil diubah ke ${language}.`)
}

const handleLogout = () => {
  const confirmed = window.confirm('Yakin ingin keluar dari akun?')

  if (!confirmed) return

  clearSession()
  router.replace('/login')
}
</script>

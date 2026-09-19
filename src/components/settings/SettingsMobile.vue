<template>
  <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">
    <!-- Header -->
    <header class="relative flex items-center justify-center py-4">
      <button
        type="button"
        @click="$emit('back')"
        class="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm transition active:scale-95"
      >
        <ArrowLeft class="h-5 w-5" />
      </button>

      <span class="text-[13px] font-semibold text-[#17211B]">
        Settings
      </span>
    </header>

    <!-- Notifications -->
    <section class="mt-5">
      <p class="mb-2 px-1 text-[9px] font-bold uppercase tracking-wide text-[#9AA59E]">
        Notifikasi
      </p>

      <div class="overflow-hidden rounded-xl border border-[#DCEBE0] bg-white">
        <!-- Push Notification -->
        <div class="flex items-center gap-3 border-b border-[#EEF3EF] px-4 py-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#3B82F6]">
            <Bell class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">Notifikasi Push</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">Terima update aktivitas EcoQuest</p>
          </div>
          <button
            type="button"
            @click="$emit('toggle', 'pushNotification')"
            class="relative h-5 w-9 rounded-full transition"
            :class="settings.pushNotification ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
          >
            <span
              class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
              :class="settings.pushNotification ? 'left-[18px]' : 'left-0.5'"
            ></span>
          </button>
        </div>

        <!-- Mission Reminder -->
        <div class="flex items-center gap-3 border-b border-[#EEF3EF] px-4 py-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF1E8] text-[#F97316]">
            <Clock3 class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">Reminder Mission</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">Ingatkan aku menyelesaikan mission</p>
          </div>
          <button
            type="button"
            @click="$emit('toggle', 'missionReminder')"
            class="relative h-5 w-9 rounded-full transition"
            :class="settings.missionReminder ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
          >
            <span
              class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
              :class="settings.missionReminder ? 'left-[18px]' : 'left-0.5'"
            ></span>
          </button>
        </div>

        <!-- Streak Reminder -->
        <div class="flex items-center gap-3 px-4 py-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF7D6] text-[#B88900]">
            <Flame class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">Streak Reminder</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">Jangan sampai streak kamu terputus</p>
          </div>
          <button
            type="button"
            @click="$emit('toggle', 'streakReminder')"
            class="relative h-5 w-9 rounded-full transition"
            :class="settings.streakReminder ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
          >
            <span
              class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
              :class="settings.streakReminder ? 'left-[18px]' : 'left-0.5'"
            ></span>
          </button>
        </div>
      </div>
    </section>

    <!-- Preferences -->
    <section class="mt-5">
      <p class="mb-2 px-1 text-[9px] font-bold uppercase tracking-wide text-[#9AA59E]">
        Preferensi
      </p>

      <div class="overflow-hidden rounded-xl border border-[#DCEBE0] bg-white">
        <!-- Dark Mode -->
        <div class="flex items-center gap-3 border-b border-[#EEF3EF] px-4 py-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F5F2] text-[#405047]">
            <Moon class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">Dark Mode</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">Gunakan tampilan gelap</p>
          </div>
          <button
            type="button"
            @click="$emit('toggle', 'darkMode')"
            class="relative h-5 w-9 rounded-full transition"
            :class="settings.darkMode ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
          >
            <span
              class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
              :class="settings.darkMode ? 'left-[18px]' : 'left-0.5'"
            ></span>
          </button>
        </div>

        <!-- Language -->
        <button
          type="button"
          @click="showLanguage = !showLanguage"
          class="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F8FBF9]"
        >
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF8EE] text-[#15803D]">
            <Globe2 class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">Bahasa</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">{{ settings.language }}</p>
          </div>
          <ChevronRight
            class="h-4 w-4 text-[#A3ADA7] transition"
            :class="showLanguage ? 'rotate-90' : ''"
          />
        </button>

        <!-- Language Options -->
        <div v-if="showLanguage" class="border-t border-[#EEF3EF] bg-[#FAFCFA] px-4 py-3">
          <button
            v-for="language in languages"
            :key="language"
            type="button"
            @click="selectLanguage(language)"
            class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-[#EAF8EE]"
          >
            <span class="text-[9px] font-medium text-[#405047]">{{ language }}</span>
            <Check v-if="settings.language === language" class="h-3.5 w-3.5 text-[#22C55E]" />
          </button>
        </div>
      </div>
    </section>

    <!-- Privacy & Security -->
    <section class="mt-5">
      <p class="mb-2 px-1 text-[9px] font-bold uppercase tracking-wide text-[#9AA59E]">
        Privasi & Keamanan
      </p>

      <div class="overflow-hidden rounded-xl border border-[#DCEBE0] bg-white">
        <RouterLink to="/profile/settings/privacy" class="flex w-full items-center gap-3 border-b border-[#EEF3EF] px-4 py-3 text-left transition hover:bg-[#F8FBF9]">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F5F2] text-[#405047]">
            <ShieldCheck class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">Privasi</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">Kelola pengaturan privasi</p>
          </div>
          <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
        </RouterLink>

        <RouterLink to="/profile/settings/security" class="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F8FBF9]">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F5F2] text-[#405047]">
            <LockKeyhole class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">Keamanan</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">Password dan keamanan akun</p>
          </div>
          <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
        </RouterLink>
      </div>
    </section>

    <!-- Logout -->
    <button
      type="button"
      @click="$emit('logout')"
      class="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#F1D7D7] bg-white text-[10px] font-bold text-[#DC2626] transition hover:bg-[#FEF2F2] active:scale-[0.98]"
    >
      <LogOut class="h-4 w-4" />
      Keluar dari Akun
    </button>

    <p class="mt-4 text-center text-[8px] text-[#A3ADA7]">
      EcoQuest v1.0.0
    </p>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import {
  ArrowLeft, Bell, Check, ChevronRight, Clock3,
  Flame, Globe2, LockKeyhole, LogOut, Moon, ShieldCheck
} from 'lucide-vue-next'

const props = defineProps({
  settings: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'toggle', 'update:language', 'logout'])

const showLanguage = ref(false)
const languages = ['Bahasa Indonesia', 'English']

const selectLanguage = (language) => {
  emit('update:language', language)
  showLanguage.value = false
}
</script>
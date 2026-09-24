<template>
  <main class="mx-auto max-w-107.5 px-4 pb-24 md:hidden">
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
        {{ $t('settings.title') }}
      </span>
    </header>

    <!-- Notifications -->
    <section class="mt-5">
      <p class="mb-2 px-1 text-[9px] font-bold uppercase tracking-wide text-[#9AA59E]">
        Notifikasi
      </p>

      <div class="overflow-hidden rounded-xl border border-[#DCEBE0] bg-white">
        <!-- Push Notification -->
        <div 
          class="flex items-center gap-3 border-b border-[#EEF3EF] px-4 py-3 cursor-pointer active:bg-[#F8FBF9] transition"
          @click="$emit('toggle', 'pushNotification')"
        >
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#3B82F6]">
            <Bell class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">{{ $t('settings.pushNotification') }}</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">{{ $t('settings.pushDesc') }}</p>
          </div>
          <button
            type="button"
            @click="$emit('toggle', 'pushNotification')"
            class="relative h-5 w-9 rounded-full transition"
            :class="settings.pushNotification ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
          >
            <span
              class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
              :class="settings.pushNotification ? 'left-4.5' : 'left-0.5'"
            ></span>
          </button>
        </div>

        <!-- Mission Reminder -->
        <div 
          class="flex items-center gap-3 border-b border-[#EEF3EF] px-4 py-3 cursor-pointer active:bg-[#F8FBF9] transition"
          @click="$emit('toggle', 'missionReminder')"
        >
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF1E8] text-[#F97316]">
            <Clock3 class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">{{ $t('settings.missionReminder') }}</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">{{ $t('settings.missionDesc') }}</p>
          </div>
          <button
            type="button"
            @click="$emit('toggle', 'missionReminder')"
            class="relative h-5 w-9 rounded-full transition"
            :class="settings.missionReminder ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
          >
            <span
              class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
              :class="settings.missionReminder ? 'left-4.5' : 'left-0.5'"
            ></span>
          </button>
        </div>

        <!-- Streak Reminder -->
        <div 
          class="flex items-center gap-3 border-b border-[#EEF3EF] px-4 py-3 cursor-pointer active:bg-[#F8FBF9] transition"
          @click="$emit('toggle', 'streakReminder')"
        >
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF7D6] text-[#B88900]">
            <Flame class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">{{ $t('settings.streakReminder') }}</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">{{ $t('settings.streakDesc') }}</p>
          </div>
          <button
            type="button"
            @click="$emit('toggle', 'streakReminder')"
            class="relative h-5 w-9 rounded-full transition"
            :class="settings.streakReminder ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
          >
            <span
              class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
              :class="settings.streakReminder ? 'left-4.5' : 'left-0.5'"
            ></span>
          </button>
        </div>

        <!-- Promo Notification -->
        <div 
          class="flex items-center gap-3 border-b border-[#EEF3EF] px-4 py-3 cursor-pointer active:bg-[#F8FBF9] transition"
          @click="$emit('toggle', 'promoNotification')"
        >
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FDF2F8] text-[#DB2777]">
            <Flame class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">{{ $t('settings.promoNotification') }}</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">{{ $t('settings.promoDesc') }}</p>
          </div>
          <button
            type="button"
            @click="$emit('toggle', 'promoNotification')"
            class="relative h-5 w-9 rounded-full transition"
            :class="settings.promoNotification ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
          >
            <span
              class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
              :class="settings.promoNotification ? 'left-4.5' : 'left-0.5'"
            ></span>
          </button>
        </div>

        <!-- Community Notification -->
        <div 
          class="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-[#F8FBF9] transition"
          @click="$emit('toggle', 'communityNotification')"
        >
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#4B5563]">
            <Bell class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">{{ $t('settings.communityNotification') }}</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">{{ $t('settings.communityDesc') }}</p>
          </div>
          <button
            type="button"
            @click="$emit('toggle', 'communityNotification')"
            class="relative h-5 w-9 rounded-full transition"
            :class="settings.communityNotification ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
          >
            <span
              class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
              :class="settings.communityNotification ? 'left-4.5' : 'left-0.5'"
            ></span>
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
            <p class="text-[10px] font-semibold text-[#17211B]">{{ $t('settings.privacy') }}</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">{{ $t('settings.privacyDesc') }}</p>
          </div>
          <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
        </RouterLink>

        <RouterLink to="/profile/settings/security" class="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F8FBF9]">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F5F2] text-[#405047]">
            <LockKeyhole class="h-4 w-4" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[10px] font-semibold text-[#17211B]">{{ $t('settings.security') }}</p>
            <p class="mt-0.5 text-[8px] text-[#718078]">{{ $t('settings.securityDesc') }}</p>
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
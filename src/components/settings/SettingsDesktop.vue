<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-[1000px] px-6 pb-10 pt-6">
      
      <!-- Header -->
      <header class="mb-6 flex items-center gap-3">
        <RouterLink
          to="/profile"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCEBE0] bg-white text-[#405047] transition hover:bg-[#EAF8EE] hover:text-[#15803D]"
        >
          <ArrowLeft class="h-5 w-5" />
        </RouterLink>
        <div>
          <h1 class="text-[24px] font-bold text-[#17211B]">Pengaturan</h1>
          <p class="mt-1 text-sm text-[#718078]">
            Kelola preferensi dan pengaturan akun EcoQuest.
          </p>
        </div>
      </header>

      <div class="grid grid-cols-[1fr_320px] gap-5">
        <!-- Main Settings -->
        <section class="space-y-5">
          <!-- Account -->
          <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
            <h2 class="text-sm font-bold text-[#17211B]">Akun</h2>
            <p class="mt-1 text-xs text-[#718078]">Kelola informasi akun dan profil kamu.</p>
            <div class="mt-4 space-y-2">
              <RouterLink to="/profile/edit" class="flex items-center gap-3 rounded-xl border border-[#EEF3EF] p-3 transition hover:bg-[#F8FBF9]">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF8EE] text-[#15803D]">
                  <UserRound class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-xs font-semibold text-[#17211B]">Edit Profil</p>
                  <p class="mt-0.5 text-[10px] text-[#718078]">Ubah nama, username, email, dan bio</p>
                </div>
                <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
              </RouterLink>

              <RouterLink to="/profile/achievements" class="flex items-center gap-3 rounded-xl border border-[#EEF3EF] p-3 transition hover:bg-[#F8FBF9]">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF7D6] text-[#B88900]">
                  <Trophy class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-xs font-semibold text-[#17211B]">Achievement</p>
                  <p class="mt-0.5 text-[10px] text-[#718078]">Lihat pencapaian yang sudah kamu raih</p>
                </div>
                <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
              </RouterLink>
            </div>
          </div>

          <!-- Notifications -->
          <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
            <h2 class="text-sm font-bold text-[#17211B]">Notifikasi</h2>
            <p class="mt-1 text-xs text-[#718078]">Atur jenis notifikasi yang ingin kamu terima.</p>
            <div class="mt-4 space-y-2">
              <div
                v-for="item in notificationOptions"
                :key="item.key"
                class="flex items-center gap-4 rounded-xl border border-[#EEF3EF] p-3"
              >
                <div class="flex h-10 w-10 items-center justify-center rounded-lg" :class="item.bg">
                  <component :is="item.icon" class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-xs font-semibold text-[#17211B]">{{ item.title }}</p>
                  <p class="mt-0.5 text-[10px] text-[#718078]">{{ item.description }}</p>
                </div>
                <button
                  type="button"
                  @click="$emit('toggle', item.key)"
                  class="relative h-6 w-11 rounded-full transition"
                  :class="settings[item.key] ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
                >
                  <span
                    class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition"
                    :class="settings[item.key] ? 'left-[23px]' : 'left-0.5'"
                  ></span>
                </button>
              </div>
            </div>
          </div>

          <!-- Preferences -->
          <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
            <h2 class="text-sm font-bold text-[#17211B]">Preferensi</h2>
            <p class="mt-1 text-xs text-[#718078]">Sesuaikan pengalaman penggunaan EcoQuest.</p>
            <div class="mt-4 space-y-2">
              <div class="flex items-center gap-4 rounded-xl border border-[#EEF3EF] p-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F1F5F2] text-[#405047]">
                  <Moon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-xs font-semibold text-[#17211B]">Dark Mode</p>
                  <p class="mt-0.5 text-[10px] text-[#718078]">Gunakan tampilan gelap</p>
                </div>
                <button
                  type="button"
                  @click="$emit('toggle', 'darkMode')"
                  class="relative h-6 w-11 rounded-full transition"
                  :class="settings.darkMode ? 'bg-[#22C55E]' : 'bg-[#DCEBE0]'"
                >
                  <span
                    class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition"
                    :class="settings.darkMode ? 'left-[23px]' : 'left-0.5'"
                  ></span>
                </button>
              </div>

              <div class="flex items-center gap-4 rounded-xl border border-[#EEF3EF] p-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF8EE] text-[#15803D]">
                  <Globe2 class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-xs font-semibold text-[#17211B]">Bahasa</p>
                  <p class="mt-0.5 text-[10px] text-[#718078]">Bahasa Indonesia</p>
                </div>
                <span class="rounded-full bg-[#EAF8EE] px-3 py-1 text-[9px] font-semibold text-[#15803D]">
                  {{ settings.language }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Right Sidebar -->
        <aside class="space-y-5">
          <!-- Privacy -->
          <section class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
            <h3 class="text-xs font-bold text-[#17211B]">Privasi & Keamanan</h3>
            <div class="mt-3 space-y-1">
              
              <!-- Diubah menjadi RouterLink -->
              <RouterLink 
                to="/profile/settings/privacy" 
                class="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-[#F8FBF9]"
              >
                <ShieldCheck class="h-4 w-4 text-[#718078]" />
                <span class="flex-1 text-[10px] font-medium text-[#405047]">Pengaturan Privasi</span>
                <ChevronRight class="h-3.5 w-3.5 text-[#A3ADA7]" />
              </RouterLink>

              <!-- Diubah menjadi RouterLink -->
              <RouterLink 
                to="/profile/settings/security" 
                class="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-[#F8FBF9]"
              >
                <LockKeyhole class="h-4 w-4 text-[#718078]" />
                <span class="flex-1 text-[10px] font-medium text-[#405047]">Keamanan Akun</span>
                <ChevronRight class="h-3.5 w-3.5 text-[#A3ADA7]" />
              </RouterLink>

            </div>
          </section>

          <!-- Logout -->
          <button
            type="button"
            @click="$emit('logout')"
            class="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#F1D7D7] bg-white text-xs font-bold text-[#DC2626] transition hover:bg-[#FEF2F2]"
          >
            <LogOut class="h-4 w-4" />
            Keluar dari Akun
          </button>
          <p class="text-center text-[9px] text-[#A3ADA7]">EcoQuest v1.0.0</p>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
import {
  ArrowLeft, Bell, ChevronRight, Clock3, Flame, Globe2,
  LockKeyhole, LogOut, Moon, ShieldCheck, Trophy, UserRound
} from 'lucide-vue-next'

const props = defineProps({
  settings: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle', 'logout'])

const notificationOptions = [
  {
    key: 'pushNotification',
    title: 'Notifikasi Push',
    description: 'Terima update aktivitas EcoQuest',
    icon: Bell,
    bg: 'bg-[#EAF2FF] text-[#3B82F6]'
  },
  {
    key: 'missionReminder',
    title: 'Reminder Mission',
    description: 'Pengingat untuk menyelesaikan mission',
    icon: Clock3,
    bg: 'bg-[#FFF1E8] text-[#F97316]'
  },
  {
    key: 'streakReminder',
    title: 'Streak Reminder',
    description: 'Pengingat agar streak tidak terputus',
    icon: Flame,
    bg: 'bg-[#FFF7D6] text-[#B88900]'
  }
]
</script>
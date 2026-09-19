<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">

        <!-- Header -->
        <header class="relative flex items-center justify-center py-4">
          <button
            type="button"
            @click="goBack"
            class="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full text-[#405047] transition hover:bg-white active:scale-95"
          >
            <ArrowLeft class="h-[18px] w-[18px]" />
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

          <div
            class="overflow-hidden rounded-xl border border-[#DCEBE0] bg-white"
          >

            <!-- Push Notification -->
            <div
              class="flex items-center gap-3 border-b border-[#EEF3EF] px-4 py-3"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#3B82F6]"
              >
                <Bell class="h-4 w-4" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[10px] font-semibold text-[#17211B]">
                  Notifikasi Push
                </p>

                <p class="mt-0.5 text-[8px] text-[#718078]">
                  Terima update aktivitas EcoQuest
                </p>
              </div>

              <button
                type="button"
                @click="settings.pushNotification = !settings.pushNotification"
                class="relative h-5 w-9 rounded-full transition"
                :class="
                  settings.pushNotification
                    ? 'bg-[#22C55E]'
                    : 'bg-[#DCEBE0]'
                "
              >
                <span
                  class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="
                    settings.pushNotification
                      ? 'left-[18px]'
                      : 'left-0.5'
                  "
                ></span>
              </button>
            </div>

            <!-- Mission Reminder -->
            <div
              class="flex items-center gap-3 border-b border-[#EEF3EF] px-4 py-3"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF1E8] text-[#F97316]"
              >
                <Clock3 class="h-4 w-4" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[10px] font-semibold text-[#17211B]">
                  Reminder Mission
                </p>

                <p class="mt-0.5 text-[8px] text-[#718078]">
                  Ingatkan aku menyelesaikan mission
                </p>
              </div>

              <button
                type="button"
                @click="settings.missionReminder = !settings.missionReminder"
                class="relative h-5 w-9 rounded-full transition"
                :class="
                  settings.missionReminder
                    ? 'bg-[#22C55E]'
                    : 'bg-[#DCEBE0]'
                "
              >
                <span
                  class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="
                    settings.missionReminder
                      ? 'left-[18px]'
                      : 'left-0.5'
                  "
                ></span>
              </button>
            </div>

            <!-- Streak Reminder -->
            <div
              class="flex items-center gap-3 px-4 py-3"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF7D6] text-[#B88900]"
              >
                <Flame class="h-4 w-4" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[10px] font-semibold text-[#17211B]">
                  Streak Reminder
                </p>

                <p class="mt-0.5 text-[8px] text-[#718078]">
                  Jangan sampai streak kamu terputus
                </p>
              </div>

              <button
                type="button"
                @click="settings.streakReminder = !settings.streakReminder"
                class="relative h-5 w-9 rounded-full transition"
                :class="
                  settings.streakReminder
                    ? 'bg-[#22C55E]'
                    : 'bg-[#DCEBE0]'
                "
              >
                <span
                  class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="
                    settings.streakReminder
                      ? 'left-[18px]'
                      : 'left-0.5'
                  "
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

          <div
            class="overflow-hidden rounded-xl border border-[#DCEBE0] bg-white"
          >

            <!-- Dark Mode -->
            <div
              class="flex items-center gap-3 border-b border-[#EEF3EF] px-4 py-3"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F5F2] text-[#405047]"
              >
                <Moon class="h-4 w-4" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[10px] font-semibold text-[#17211B]">
                  Dark Mode
                </p>

                <p class="mt-0.5 text-[8px] text-[#718078]">
                  Gunakan tampilan gelap
                </p>
              </div>

              <button
                type="button"
                @click="settings.darkMode = !settings.darkMode"
                class="relative h-5 w-9 rounded-full transition"
                :class="
                  settings.darkMode
                    ? 'bg-[#22C55E]'
                    : 'bg-[#DCEBE0]'
                "
              >
                <span
                  class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="
                    settings.darkMode
                      ? 'left-[18px]'
                      : 'left-0.5'
                  "
                ></span>
              </button>
            </div>

            <!-- Language -->
            <button
              type="button"
              @click="showLanguage = !showLanguage"
              class="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F8FBF9]"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF8EE] text-[#15803D]"
              >
                <Globe2 class="h-4 w-4" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[10px] font-semibold text-[#17211B]">
                  Bahasa
                </p>

                <p class="mt-0.5 text-[8px] text-[#718078]">
                  {{ settings.language }}
                </p>
              </div>

              <ChevronRight
                class="h-4 w-4 text-[#A3ADA7] transition"
                :class="showLanguage ? 'rotate-90' : ''"
              />
            </button>

            <!-- Language Options -->
            <div
              v-if="showLanguage"
              class="border-t border-[#EEF3EF] bg-[#FAFCFA] px-4 py-3"
            >
              <button
                v-for="language in languages"
                :key="language"
                type="button"
                @click="selectLanguage(language)"
                class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-[#EAF8EE]"
              >
                <span class="text-[9px] font-medium text-[#405047]">
                  {{ language }}
                </span>

                <Check
                  v-if="settings.language === language"
                  class="h-3.5 w-3.5 text-[#22C55E]"
                />
              </button>
            </div>

          </div>
        </section>

        <!-- Privacy & Security -->
        <section class="mt-5">
          <p class="mb-2 px-1 text-[9px] font-bold uppercase tracking-wide text-[#9AA59E]">
            Privasi & Keamanan
          </p>

          <div
            class="overflow-hidden rounded-xl border border-[#DCEBE0] bg-white"
          >
            <!-- Privacy -->
            <RouterLink
              to="/profile/settings/privacy"
              class="flex w-full items-center gap-3 border-b border-[#EEF3EF] px-4 py-3 text-left transition hover:bg-[#F8FBF9]"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F5F2] text-[#405047]"
              >
                <ShieldCheck class="h-4 w-4" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[10px] font-semibold text-[#17211B]">
                  Privasi
                </p>

                <p class="mt-0.5 text-[8px] text-[#718078]">
                  Kelola pengaturan privasi
                </p>
              </div>

              <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
            </RouterLink>

            <!-- Security -->
            <RouterLink
              to="/profile/settings/security"
              class="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F8FBF9]"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F5F2] text-[#405047]"
              >
                <LockKeyhole class="h-4 w-4" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-[10px] font-semibold text-[#17211B]">
                  Keamanan
                </p>

                <p class="mt-0.5 text-[8px] text-[#718078]">
                  Password dan keamanan akun
                </p>
              </div>

              <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
            </RouterLink>
          </div>
        </section>

        <!-- Logout -->
        <button
          type="button"
          @click="handleLogout"
          class="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#F1D7D7] bg-white text-[10px] font-bold text-[#DC2626] transition hover:bg-[#FEF2F2] active:scale-[0.98]"
        >
          <LogOut class="h-4 w-4" />
          Keluar dari Akun
        </button>

        <p class="mt-4 text-center text-[8px] text-[#A3ADA7]">
          EcoQuest v1.0.0
        </p>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">

        <div class="mx-auto max-w-[1000px] px-6 pb-10">

          <!-- Header -->
          <header class="mb-6 flex items-center gap-3">

            <RouterLink
              to="/profile"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCEBE0] bg-white text-[#405047] transition hover:bg-[#EAF8EE] hover:text-[#15803D]"
            >
              <ArrowLeft class="h-5 w-5" />
            </RouterLink>

            <div>
              <h1 class="text-[24px] font-bold text-[#17211B]">
                Settings
              </h1>

              <p class="mt-1 text-sm text-[#718078]">
                Kelola preferensi dan pengaturan akun EcoQuest.
              </p>
            </div>

          </header>

          <div class="grid grid-cols-[1fr_320px] gap-5">

            <!-- Main Settings -->
            <section class="space-y-5">

              <!-- Account -->
              <div
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
              >
                <h2 class="text-sm font-bold text-[#17211B]">
                  Akun
                </h2>

                <p class="mt-1 text-xs text-[#718078]">
                  Kelola informasi akun dan profil kamu.
                </p>

                <div class="mt-4 space-y-2">

                  <RouterLink
                    to="/profile/edit"
                    class="flex items-center gap-3 rounded-xl border border-[#EEF3EF] p-3 transition hover:bg-[#F8FBF9]"
                  >
                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF8EE] text-[#15803D]"
                    >
                      <UserRound class="h-5 w-5" />
                    </div>

                    <div class="flex-1">
                      <p class="text-xs font-semibold text-[#17211B]">
                        Edit Profil
                      </p>

                      <p class="mt-0.5 text-[10px] text-[#718078]">
                        Ubah nama, username, email, dan bio
                      </p>
                    </div>

                    <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
                  </RouterLink>

                  <RouterLink
                    to="/profile/achievements"
                    class="flex items-center gap-3 rounded-xl border border-[#EEF3EF] p-3 transition hover:bg-[#F8FBF9]"
                  >
                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF7D6] text-[#B88900]"
                    >
                      <Trophy class="h-5 w-5" />
                    </div>

                    <div class="flex-1">
                      <p class="text-xs font-semibold text-[#17211B]">
                        Achievement
                      </p>

                      <p class="mt-0.5 text-[10px] text-[#718078]">
                        Lihat pencapaian yang sudah kamu raih
                      </p>
                    </div>

                    <ChevronRight class="h-4 w-4 text-[#A3ADA7]" />
                  </RouterLink>

                </div>
              </div>

              <!-- Notifications -->
              <div
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
              >
                <h2 class="text-sm font-bold text-[#17211B]">
                  Notifikasi
                </h2>

                <p class="mt-1 text-xs text-[#718078]">
                  Atur jenis notifikasi yang ingin kamu terima.
                </p>

                <div class="mt-4 space-y-2">

                  <div
                    v-for="item in notificationSettings"
                    :key="item.key"
                    class="flex items-center gap-4 rounded-xl border border-[#EEF3EF] p-3"
                  >

                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-lg"
                      :class="item.bg"
                    >
                      <component
                        :is="item.icon"
                        class="h-5 w-5"
                      />
                    </div>

                    <div class="flex-1">
                      <p class="text-xs font-semibold text-[#17211B]">
                        {{ item.title }}
                      </p>

                      <p class="mt-0.5 text-[10px] text-[#718078]">
                        {{ item.description }}
                      </p>
                    </div>

                    <button
                      type="button"
                      @click="toggleSetting(item.key)"
                      class="relative h-6 w-11 rounded-full transition"
                      :class="
                        settings[item.key]
                          ? 'bg-[#22C55E]'
                          : 'bg-[#DCEBE0]'
                      "
                    >
                      <span
                        class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition"
                        :class="
                          settings[item.key]
                            ? 'left-[23px]'
                            : 'left-0.5'
                        "
                      ></span>
                    </button>

                  </div>

                </div>
              </div>

              <!-- Preferences -->
              <div
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
              >
                <h2 class="text-sm font-bold text-[#17211B]">
                  Preferensi
                </h2>

                <p class="mt-1 text-xs text-[#718078]">
                  Sesuaikan pengalaman penggunaan EcoQuest.
                </p>

                <div class="mt-4 space-y-2">

                  <!-- Dark Mode -->
                  <div
                    class="flex items-center gap-4 rounded-xl border border-[#EEF3EF] p-3"
                  >
                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F1F5F2] text-[#405047]"
                    >
                      <Moon class="h-5 w-5" />
                    </div>

                    <div class="flex-1">
                      <p class="text-xs font-semibold text-[#17211B]">
                        Dark Mode
                      </p>

                      <p class="mt-0.5 text-[10px] text-[#718078]">
                        Gunakan tampilan gelap
                      </p>
                    </div>

                    <button
                      type="button"
                      @click="settings.darkMode = !settings.darkMode"
                      class="relative h-6 w-11 rounded-full transition"
                      :class="
                        settings.darkMode
                          ? 'bg-[#22C55E]'
                          : 'bg-[#DCEBE0]'
                      "
                    >
                      <span
                        class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition"
                        :class="
                          settings.darkMode
                            ? 'left-[23px]'
                            : 'left-0.5'
                        "
                      ></span>
                    </button>
                  </div>

                  <!-- Language -->
                  <div
                    class="flex items-center gap-4 rounded-xl border border-[#EEF3EF] p-3"
                  >
                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF8EE] text-[#15803D]"
                    >
                      <Globe2 class="h-5 w-5" />
                    </div>

                    <div class="flex-1">
                      <p class="text-xs font-semibold text-[#17211B]">
                        Bahasa
                      </p>

                      <p class="mt-0.5 text-[10px] text-[#718078]">
                        Bahasa Indonesia
                      </p>
                    </div>

                    <span
                      class="rounded-full bg-[#EAF8EE] px-3 py-1 text-[9px] font-semibold text-[#15803D]"
                    >
                      {{ settings.language }}
                    </span>
                  </div>

                </div>
              </div>

            </section>

            <!-- Right -->
            <aside class="space-y-5">

              <!-- Account Card -->
              <section
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
              >

                <div class="flex items-center gap-3">

                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7] text-sm font-bold text-[#15803D]"
                  >
                    DA
                  </div>

                  <div>
                    <p class="text-sm font-bold text-[#17211B]">
                      Dafa Ardi
                    </p>

                    <p class="mt-0.5 text-[10px] text-[#718078]">
                      @dafaardi
                    </p>
                  </div>

                </div>

                <div class="mt-4 rounded-xl bg-[#F4FBF7] p-3">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-[#718078]">
                      Level
                    </span>

                    <span class="text-xs font-bold text-[#15803D]">
                      Level 8
                    </span>
                  </div>

                  <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-[#DCEBE0]">
                    <div class="h-full w-[68%] rounded-full bg-[#22C55E]"></div>
                  </div>

                  <p class="mt-1 text-right text-[8px] text-[#9AA59E]">
                    1.240 XP
                  </p>
                </div>

              </section>

              <!-- Privacy -->
              <section
                class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
              >
                <h3 class="text-xs font-bold text-[#17211B]">
                  Privasi & Keamanan
                </h3>

                <div class="mt-3 space-y-1">

                  <button
                    type="button"
                    class="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-[#F8FBF9]"
                  >
                    <ShieldCheck class="h-4 w-4 text-[#718078]" />

                    <span class="flex-1 text-[10px] font-medium text-[#405047]">
                      Pengaturan Privasi
                    </span>

                    <ChevronRight class="h-3.5 w-3.5 text-[#A3ADA7]" />
                  </button>

                  <button
                    type="button"
                    class="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-[#F8FBF9]"
                  >
                    <LockKeyhole class="h-4 w-4 text-[#718078]" />

                    <span class="flex-1 text-[10px] font-medium text-[#405047]">
                      Keamanan Akun
                    </span>

                    <ChevronRight class="h-3.5 w-3.5 text-[#A3ADA7]" />
                  </button>

                </div>
              </section>

              <!-- Logout -->
              <button
                type="button"
                @click="handleLogout"
                class="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#F1D7D7] bg-white text-xs font-bold text-[#DC2626] transition hover:bg-[#FEF2F2]"
              >
                <LogOut class="h-4 w-4" />
                Keluar dari Akun
              </button>

              <p class="text-center text-[9px] text-[#A3ADA7]">
                EcoQuest v1.0.0
              </p>

            </aside>

          </div>

        </div>

      </main>

    </div>
  </AppLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout as clearSession } from '@/services/auth'

import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  Globe2,
  LockKeyhole,
  LogOut,
  Moon,
  MoreHorizontal,
  ShieldCheck,
  Trophy,
  UserRound
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import { logout as logoutUser } from '@/services/auth'

const router = useRouter()

const goBack = () => {
  router.back()
}

const showLanguage = ref(false)

const languages = [
  'Bahasa Indonesia',
  'English'
]

const settings = reactive({
  pushNotification: true,
  missionReminder: true,
  streakReminder: true,
  darkMode: false,
  language: 'Bahasa Indonesia'
})

const notificationSettings = [
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

const toggleSetting = (key) => {
  settings[key] = !settings[key]
}

const selectLanguage = (language) => {
  settings.language = language
  showLanguage.value = false
}

const handleLogout = () => {
  const confirmed = window.confirm('Yakin ingin keluar dari akun?')

  if (!confirmed) return

  clearSession()
  router.replace('/login')
}
</script>
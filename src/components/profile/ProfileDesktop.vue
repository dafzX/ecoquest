<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-[1080px] px-6 pb-10 pt-8">

      <!-- Header -->
      <DesktopPageHeader
        tag="Akun Saya"
        title="Profile"
        description="Kelola profil dan perjalanan EcoQuest kamu."
      />

      <!-- Profile Overview -->
      <section
        class="mb-6 rounded-2xl border border-[#E8EDE9] bg-white px-7 py-6"
      >
        <div class="flex items-center gap-6">

          <!-- Avatar -->
          <div
            class="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-2xl font-bold text-[#15803D]"
          >
            {{ avatar }}
          </div>

          <!-- Profile Info -->
          <div class="min-w-0 flex-1">

            <!-- Name + Action -->
            <div class="flex items-start justify-between gap-6">

              <div class="min-w-0">
                <div class="flex items-center gap-3">
                  <h2
                    class="truncate text-[20px] font-bold leading-tight text-[#17211B]"
                  >
                    {{ currentUser.name }}
                  </h2>

                  <span
                    class="shrink-0 rounded-full bg-[#E8F8ED] px-3 py-1 text-[9px] font-semibold text-[#15803D]"
                  >
                    Level 5
                  </span>
                </div>

                <p class="mt-1.5 truncate text-xs text-[#718078]">
                  {{ currentUser.email }}
                </p>
              </div>

              <RouterLink
                to="/profile/edit"
                class="flex h-9 shrink-0 items-center gap-2 rounded-xl border border-[#DCEBE0] bg-white px-4 text-xs font-semibold text-[#15803D] transition hover:border-[#BBF7D0] hover:bg-[#F7FBF8]"
              >
                <Pencil class="h-3.5 w-3.5" />
                Edit Profile
              </RouterLink>

            </div>

            <!-- XP Progress -->
            <div class="mt-5 max-w-[650px]">

              <div class="mb-2 flex items-center justify-between">
                <span class="text-[10px] font-medium text-[#98A39C]">
                  Progress ke Level 6
                </span>

                <span class="text-[10px] font-semibold text-[#15803D]">
                  1,240 / 1,600 XP
                </span>
              </div>

              <div class="h-2 overflow-hidden rounded-full bg-[#E5EFE8]">
                <div
                  class="h-full rounded-full bg-[#22C55E]"
                  style="width: 77.5%"
                ></div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="mb-6 grid grid-cols-3 gap-5">

        <!-- Streak -->
        <div
          class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
        >
          <div class="flex items-center justify-between">

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF7D6]"
            >
              <Flame class="h-5 w-5 text-[#F59E0B]" />
            </div>

            <div
              class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F8ED]"
            >
              <TrendingUp class="h-3.5 w-3.5 text-[#22C55E]" />
            </div>

          </div>

          <div class="mt-5">
            <p class="text-xs font-medium text-[#718078]">
              Streak Saat Ini
            </p>

            <p class="mt-1 text-[26px] font-bold leading-tight text-[#17211B]">
              7 hari
            </p>

            <p class="mt-1.5 text-[10px] leading-4 text-[#98A39C]">
              Terus pertahankan kebiasaan baikmu
            </p>
          </div>
        </div>

        <!-- Eco Actions -->
        <div
          class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
        >
          <div class="flex items-center justify-between">

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F8ED]"
            >
              <Leaf class="h-5 w-5 text-[#22C55E]" />
            </div>

            <span
              class="rounded-full bg-[#F0FAF3] px-2.5 py-1 text-[9px] font-semibold text-[#22C55E]"
            >
              +4 bulan ini
            </span>

          </div>

          <div class="mt-5">
            <p class="text-xs font-medium text-[#718078]">
              Total Eco Actions
            </p>

            <p class="mt-1 text-[26px] font-bold leading-tight text-[#17211B]">
              12
            </p>

            <p class="mt-1.5 text-[10px] leading-4 text-[#98A39C]">
              Aksi ramah lingkungan
            </p>
          </div>
        </div>

        <!-- Low Carbon -->
        <div
          class="rounded-2xl border border-[#E8EDE9] bg-white p-5"
        >
          <div class="flex items-center justify-between">

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF]"
            >
              <Bike class="h-5 w-5 text-[#3B82F6]" />
            </div>

            <span
              class="rounded-full bg-[#EAF4FF] px-2.5 py-1 text-[9px] font-semibold text-[#3B82F6]"
            >
              Low Carbon
            </span>

          </div>

          <div class="mt-5">
            <p class="text-xs font-medium text-[#718078]">
              Perjalanan Rendah Karbon
            </p>

            <p class="mt-1 text-[26px] font-bold leading-tight text-[#17211B]">
              24 km
            </p>

            <p class="mt-1.5 text-[10px] leading-4 text-[#98A39C]">
              Bersepeda & transportasi umum
            </p>
          </div>
        </div>

      </section>

      <!-- Menu -->
      <section class="grid grid-cols-2 gap-5">

        <!-- Achievements -->
        <RouterLink
          to="/achievements"
          class="group flex min-h-[104px] items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white px-5 py-4 transition hover:border-[#BBF7D0] hover:bg-[#FCFEFC]"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF7D6]"
          >
            <Award class="h-5 w-5 text-[#D99A00]" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-[#17211B]">
              My Achievements
            </h3>

            <p class="mt-1 text-xs leading-5 text-[#718078]">
              Lihat pencapaian dan badge yang sudah kamu dapatkan.
            </p>
          </div>

          <ChevronRight
            class="h-4 w-4 shrink-0 text-[#AAB4AE] transition group-hover:translate-x-0.5 group-hover:text-[#22C55E]"
          />
        </RouterLink>

        <!-- My Impact -->
        <RouterLink
          to="/impact"
          class="group flex min-h-[104px] items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white px-5 py-4 transition hover:border-[#BBF7D0] hover:bg-[#FCFEFC]"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F8ED]"
          >
            <Leaf class="h-5 w-5 text-[#22C55E]" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-[#17211B]">
              My Impact
            </h3>

            <p class="mt-1 text-xs leading-5 text-[#718078]">
              Lihat dampak positif yang sudah kamu berikan.
            </p>
          </div>

          <ChevronRight
            class="h-4 w-4 shrink-0 text-[#AAB4AE] transition group-hover:translate-x-0.5 group-hover:text-[#22C55E]"
          />
        </RouterLink>

        <!-- Settings -->
        <RouterLink
          to="/profile/settings"
          class="group flex min-h-[104px] items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white px-5 py-4 transition hover:border-[#BBF7D0] hover:bg-[#FCFEFC]"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF]"
          >
            <Settings class="h-5 w-5 text-[#3B82F6]" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-[#17211B]">
              Settings
            </h3>

            <p class="mt-1 text-xs leading-5 text-[#718078]">
              Kelola notifikasi, bahasa, dan preferensi aplikasi.
            </p>
          </div>

          <ChevronRight
            class="h-4 w-4 shrink-0 text-[#AAB4AE] transition group-hover:translate-x-0.5 group-hover:text-[#22C55E]"
          />
        </RouterLink>

        <!-- Help & Support -->
        <RouterLink
          to="/profile/help-support"
          class="group flex min-h-[104px] items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white px-5 py-4 transition hover:border-[#BBF7D0] hover:bg-[#FCFEFC]"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2F5F3]"
          >
            <HelpCircle class="h-5 w-5 text-[#718078]" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-[#17211B]">
              Help & Support
            </h3>

            <p class="mt-1 text-xs leading-5 text-[#718078]">
              Temukan bantuan dan informasi mengenai EcoQuest.
            </p>
          </div>

          <ChevronRight
            class="h-4 w-4 shrink-0 text-[#AAB4AE] transition group-hover:translate-x-0.5 group-hover:text-[#22C55E]"
          />
        </RouterLink>

      </section>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'

import DesktopPageHeader from '@/components/ui/DesktopPageHeader.vue'

import {
  Flame,
  Leaf,
  Bike,
  Pencil,
  Award,
  Settings,
  HelpCircle,
  ChevronRight,
  TrendingUp
} from 'lucide-vue-next'

import { getCurrentUser } from '@/services/auth'

const currentUser = computed(() => {
  return getCurrentUser() || {
    id: null,
    name: 'Pengguna',
    email: ''
  }
})

const avatar = computed(() => {
  const name = currentUser.value.name

  if (!name) {
    return 'EQ'
  }

  const words = name.trim().split(/\s+/)

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }

  return words[0].slice(0, 2).toUpperCase()
})
</script>
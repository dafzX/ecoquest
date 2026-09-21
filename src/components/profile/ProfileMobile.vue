<template>
  <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">
    <MobileHeader />

    <!-- Header -->
    <div class="mb-4 mt-4">
      <h2 class="text-[17px] font-bold text-[#17211B]">
        Profile
      </h2>

      <p class="mt-1 text-[9px] text-[#718078]">
        Kelola profil dan perjalanan EcoQuest kamu.
      </p>
    </div>

    <!-- Profile -->
    <section
      class="mb-4 rounded-[14px] border border-[#DCEBE0] bg-white p-4"
    >
      <div class="flex items-center gap-3">

        <!-- Avatar -->
        <div
          class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-lg font-bold text-[#15803D]"
        >
          {{ avatar }}
        </div>

        <!-- Profile Info -->
        <div class="min-w-0 flex-1">

          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <h2
                class="truncate text-[14px] font-bold text-[#17211B]"
              >
                {{ currentUser.name }}
              </h2>

              <p
                class="mt-0.5 truncate text-[8px] text-[#718078]"
              >
                {{ currentUser.email }}
              </p>
            </div>

            <!-- Level -->
            <span
              class="shrink-0 rounded-full bg-[#E8F8ED] px-2 py-1 text-[7px] font-semibold text-[#15803D]"
            >
              Level {{ currentLevel }}
            </span>
          </div>

          <!-- XP -->
          <div class="mt-3">
            <div class="mb-1 flex items-center justify-between">
              <span class="text-[7px] text-[#98A39C]">
                Progress ke Level {{ nextLevel }}
              </span>

              <span class="text-[7px] font-semibold text-[#15803D]">
                {{ currentXp }} / {{ nextLevelXp }} XP
              </span>
            </div>

            <div
              class="h-[5px] overflow-hidden rounded-full bg-[#E5EFE8]"
            >
              <div
                class="h-full rounded-full bg-[#22C55E] transition-all duration-500"
                :style="{ width: `${xpProgress}%` }"
              ></div>
            </div>
          </div>

        </div>
      </div>

      <!-- Edit Profile -->
      <RouterLink
        to="/profile/edit"
        class="mt-4 flex h-9 items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-[9px] font-bold text-white transition active:scale-[0.98]"
      >
        <Pencil class="h-3.5 w-3.5" />
        Edit Profile
      </RouterLink>
    </section>

    <!-- Stats -->
    <section class="mb-4 grid grid-cols-3 gap-2">

      <!-- Streak -->
      <div
        class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center"
      >
        <div
          class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF7D6]"
        >
          <Flame class="h-3.5 w-3.5 text-[#F59E0B]" />
        </div>

        <p class="mt-2 text-[13px] font-bold text-[#17211B]">
          {{ currentStreak }}
        </p>

        <p class="text-[7px] text-[#718078]">
          Streak
        </p>
      </div>

      <!-- Eco Actions -->
      <div
        class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center"
      >
        <div
          class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F8ED]"
        >
          <Leaf class="h-3.5 w-3.5 text-[#22C55E]" />
        </div>

        <p class="mt-2 text-[13px] font-bold text-[#17211B]">
          {{ totalEcoActions }}
        </p>

        <p class="text-[7px] text-[#718078]">
          Eco Actions
        </p>
      </div>

      <!-- Low Carbon -->
      <div
        class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center"
      >
        <div
          class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4FF]"
        >
          <Bike class="h-3.5 w-3.5 text-[#3B82F6]" />
        </div>

        <p class="mt-2 text-[13px] font-bold text-[#17211B]">
          {{ lowCarbonDistance }}
        </p>

        <p class="text-[7px] text-[#718078]">
          Low Carbon
        </p>
      </div>

    </section>

    <!-- Profile Menu -->
    <section
      class="overflow-hidden rounded-[14px] border border-[#DCEBE0] bg-white"
    >

      <!-- Edit Profile -->
      <RouterLink
        to="/profile/edit"
        class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 transition active:bg-[#F8FBF9]"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F8ED]"
        >
          <Pencil class="h-3.5 w-3.5 text-[#22C55E]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            Edit Profile
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Ubah nama dan informasi akun kamu
          </p>
        </div>

        <ChevronRight
          class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]"
        />
      </RouterLink>

      <!-- Achievements -->
      <RouterLink
        to="/achievements"
        class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 transition active:bg-[#F8FBF9]"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF7D6]"
        >
          <Award class="h-3.5 w-3.5 text-[#D99A00]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            My Achievements
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Lihat pencapaian yang sudah kamu dapatkan
          </p>
        </div>

        <ChevronRight
          class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]"
        />
      </RouterLink>

      <!-- My Impact -->
      <RouterLink
        to="/impact"
        class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 transition active:bg-[#F8FBF9]"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F8ED]"
        >
          <Leaf class="h-3.5 w-3.5 text-[#22C55E]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            My Impact
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Lihat dampak positif yang sudah kamu berikan
          </p>
        </div>

        <ChevronRight
          class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]"
        />
      </RouterLink>

      <!-- Leaderboard -->
      <RouterLink
        to="/leaderboard"
        class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 transition active:bg-[#F8FBF9]"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF7D6]"
        >
          <Trophy class="h-3.5 w-3.5 text-[#D99A00]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            Leaderboard
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Lihat peringkat kamu di EcoQuest
          </p>
        </div>

        <ChevronRight
          class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]"
        />
      </RouterLink>

      <!-- Settings -->
      <RouterLink
        to="/profile/settings"
        class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 transition active:bg-[#F8FBF9]"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF4FF]"
        >
          <Settings class="h-3.5 w-3.5 text-[#3B82F6]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            Settings
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Kelola preferensi aplikasi
          </p>
        </div>

        <ChevronRight
          class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]"
        />
      </RouterLink>

      <!-- Help & Support -->
      <RouterLink
        to="/profile/help-support"
        class="flex items-center gap-3 px-4 py-3.5 transition active:bg-[#F8FBF9]"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F2F5F3]"
        >
          <HelpCircle class="h-3.5 w-3.5 text-[#718078]" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-[9px] font-semibold text-[#17211B]">
            Help & Support
          </p>

          <p class="mt-0.5 text-[7px] text-[#98A39C]">
            Bantuan dan informasi EcoQuest
          </p>
        </div>

        <ChevronRight
          class="h-3.5 w-3.5 shrink-0 text-[#AAB4AE]"
        />
      </RouterLink>

    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'

import {
  Flame,
  Leaf,
  Bike,
  Pencil,
  Award,
  Trophy,
  Settings,
  HelpCircle,
  ChevronRight
} from 'lucide-vue-next'

import MobileHeader from '@/components/navigation/MobileHeader.vue'

import { getCurrentUser } from '@/services/auth'

const currentUser = computed(() => {
  return getCurrentUser() || {
    id: null,
    name: 'Pengguna',
    email: '',
    xp: 0,
    level: 1,
    streak: 0,
    ecoActions: 0,
    lowCarbonDistance: 0
  }
})

const currentLevel = computed(() => {
  const level = Number(currentUser.value.level)

  return Number.isFinite(level) && level > 0
    ? level
    : 1
})

const currentXp = computed(() => {
  const xp = Number(currentUser.value.xp)

  return Number.isFinite(xp) && xp >= 0
    ? xp
    : 0
})

const levelRequirements = {
  1: 500,
  2: 800,
  3: 1100,
  4: 1400,
  5: 1600,
  6: 2000,
  7: 2500,
  8: 3000,
  9: 3500,
  10: 4000
}

const nextLevel = computed(() => {
  return currentLevel.value + 1
})

const nextLevelXp = computed(() => {
  return levelRequirements[currentLevel.value] || (currentLevel.value * 500)
})

const previousLevelXp = computed(() => {
  if (currentLevel.value <= 1) {
    return 0
  }

  return levelRequirements[currentLevel.value - 1] || ((currentLevel.value - 1) * 500)
})

const xpProgress = computed(() => {
  const requiredXp = nextLevelXp.value
  const baseXp = previousLevelXp.value
  const progressXp = currentXp.value - baseXp
  const levelXp = requiredXp - baseXp

  if (levelXp <= 0) {
    return 0
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round((progressXp / levelXp) * 100)
    )
  )
})

const currentStreak = computed(() => {
  const streak = Number(currentUser.value.streak)

  return Number.isFinite(streak) && streak >= 0
    ? streak
    : 0
})

const totalEcoActions = computed(() => {
  const actions = Number(
    currentUser.value.ecoActions ??
    currentUser.value.totalEcoActions ??
    currentUser.value.eco_actions
  )

  return Number.isFinite(actions) && actions >= 0
    ? actions
    : 0
})

const lowCarbonDistance = computed(() => {
  const distance = Number(
    currentUser.value.lowCarbonDistance ??
    currentUser.value.low_carbon_distance ??
    currentUser.value.greenDistance
  )

  return Number.isFinite(distance) && distance >= 0
    ? `${distance} km`
    : '0 km'
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
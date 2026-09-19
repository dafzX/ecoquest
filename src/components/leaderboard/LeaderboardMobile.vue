<template>
  <main class="md:hidden mx-auto max-w-[430px] px-4 pb-20">
    <!-- Header -->
    <div class="py-6">
      <h1 class="text-2xl font-bold tracking-tight text-[#17211B]">
        Leaderboard
      </h1>
      <p class="mt-1 text-xs text-[#66736A]">
        See how you rank among other eco explorers
      </p>
    </div>

    <!-- Leaderboard Hero -->
    <section class="mb-6 overflow-hidden rounded-2xl border border-[#DCEBDD] bg-white">
      <div class="flex items-center justify-between border-b border-[#E8EDE9] px-4 py-4">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8E1]">
            <Trophy class="h-5 w-5 text-[#CA8A04]" />
          </div>
          <div>
            <h2 class="text-sm font-bold text-[#17211B]">
              Weekly Leaderboard
            </h2>
            <p class="text-[10px] text-[#98A39C]">
              Top eco explorers this week
            </p>
          </div>
        </div>
      </div>

      <!-- Top 3 -->
      <div class="grid grid-cols-3 items-end gap-2 px-4 pb-6 pt-8">
        <!-- Second -->
        <div class="flex flex-col items-center">
          <div class="relative">
            <div class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D7DDE0] bg-[#F3F5F6] text-sm font-bold text-[#66736A]">
              {{ topThree[1]?.avatar }}
            </div>
            <div class="absolute -bottom-2 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-[#D7DDE0] text-[10px] font-bold text-[#4B5563]">
              2
            </div>
          </div>
          <p class="mt-3 truncate text-xs font-bold text-[#17211B]">
            {{ topThree[1]?.name }}
          </p>
          <p class="mt-0.5 text-[10px] text-[#98A39C]">
            {{ topThree[1]?.xp.toLocaleString() }} XP
          </p>
        </div>

        <!-- First -->
        <div class="flex flex-col items-center">
          <div class="relative">
            <div class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F4C94F] bg-[#FFF8E1] text-lg font-bold text-[#A16207]">
              {{ topThree[0]?.avatar }}
            </div>
            <div class="absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-[#F4C94F] text-[10px] font-bold text-[#7C5A00]">
              1
            </div>
            <div class="absolute -right-2 -top-3">
              <Crown class="h-5 w-5 text-[#EAB308]" />
            </div>
          </div>
          <p class="mt-3 truncate text-sm font-bold text-[#17211B]">
            {{ topThree[0]?.name }}
          </p>
          <p class="mt-0.5 text-[10px] font-semibold text-[#15803D]">
            {{ topThree[0]?.xp.toLocaleString() }} XP
          </p>
        </div>

        <!-- Third -->
        <div class="flex flex-col items-center">
          <div class="relative">
            <div class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#E8C0A5] bg-[#FFF4EC] text-sm font-bold text-[#9A5A2E]">
              {{ topThree[2]?.avatar }}
            </div>
            <div class="absolute -bottom-2 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-[#E8C0A5] text-[10px] font-bold text-[#7C4422]">
              3
            </div>
          </div>
          <p class="mt-3 truncate text-xs font-bold text-[#17211B]">
            {{ topThree[2]?.name }}
          </p>
          <p class="mt-0.5 text-[10px] text-[#98A39C]">
            {{ topThree[2]?.xp.toLocaleString() }} XP
          </p>
        </div>
      </div>
    </section>

    <!-- Your Ranking -->
    <section class="mb-6">
      <div class="mb-3">
        <h2 class="text-sm font-bold text-[#17211B]">
          Your Ranking
        </h2>
      </div>

      <div
        v-if="currentUser"
        class="flex items-center gap-3 rounded-2xl border border-[#BFE8C9] bg-[#F1FBF3] px-4 py-3"
      >
        <div class="flex w-6 justify-center">
          <span class="text-xs font-bold text-[#15803D]">
            #{{ currentUser.rank }}
          </span>
        </div>

        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-xs font-bold text-white">
          {{ currentUser.avatar }}
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="truncate text-xs font-semibold text-[#15803D]">
              {{ currentUser.name }}
            </p>
            <span class="shrink-0 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[8px] font-semibold text-[#15803D]">
              You
            </span>
          </div>
          <p class="mt-0.5 text-[10px] text-[#66736A]">
            Level {{ currentUser.level }}
          </p>
        </div>

        <div class="text-right">
          <p class="text-xs font-bold text-[#17211B]">
            {{ currentUser.xp.toLocaleString() }} XP
          </p>
        </div>
      </div>
    </section>

    <!-- All Rankings -->
    <section>
      <div class="mb-3">
        <h2 class="text-sm font-bold text-[#17211B]">
          All Rankings
        </h2>
      </div>

      <div class="space-y-2">
        <LeaderboardRow
          v-for="user in leaderboard"
          :key="user.rank"
          :user="user"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'

import {
  ArrowUp,
  Crown,
  Trophy
} from 'lucide-vue-next'

import LeaderboardRow from '@/components/cards/LeaderboardRow.vue'

const props = defineProps({
  leaderboard: {
    type: Array,
    required: true
  },
  topThree: {
    type: Array,
    required: true
  },
  currentUser: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <AppLayout>
    <div class="mx-auto max-w-[1400px]">

      <!-- Header -->
      <div class="mb-7">
        <h1 class="text-[28px] font-bold tracking-tight text-[#17211B]">
          Leaderboard
        </h1>

        <p class="mt-1 text-sm text-[#66736A]">
          See how you rank among other eco explorers
        </p>
      </div>

      <!-- Leaderboard Hero -->
      <section class="mb-8 overflow-hidden rounded-2xl border border-[#DCEBDD] bg-white">

        <div class="flex items-center justify-between border-b border-[#E8EDE9] px-6 py-5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8E1]">
              <Trophy class="h-5 w-5 text-[#CA8A04]" />
            </div>

            <div>
              <h2 class="text-base font-bold text-[#17211B]">
                Weekly Leaderboard
              </h2>

              <p class="text-xs text-[#98A39C]">
                Top eco explorers this week
              </p>
            </div>
          </div>

          <button
            type="button"
            class="flex items-center gap-2 rounded-xl border border-[#E8EDE9] bg-white px-3.5 py-2 text-xs font-medium text-[#66736A]"
          >
            This Week
            <ChevronDown class="h-4 w-4" />
          </button>
        </div>

        <!-- Top 3 -->
        <div class="grid grid-cols-3 items-end gap-8 px-20 pb-8 pt-10">

          <!-- Second -->
          <div class="flex flex-col items-center">
            <div class="relative">
              <div class="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#D7DDE0] bg-[#F3F5F6] text-xl font-bold text-[#66736A]">
                {{ topThree[1]?.avatar }}
              </div>

              <div class="absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#D7DDE0] text-xs font-bold text-[#4B5563]">
                2
              </div>
            </div>

            <p class="mt-4 text-sm font-bold text-[#17211B]">
              {{ topThree[1]?.name }}
            </p>

            <p class="mt-1 text-xs text-[#98A39C]">
              {{ topThree[1]?.xp.toLocaleString() }} XP
            </p>
          </div>

          <!-- First -->
          <div class="flex flex-col items-center">
            <div class="relative">
              <div class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#F4C94F] bg-[#FFF8E1] text-2xl font-bold text-[#A16207]">
                {{ topThree[0]?.avatar }}
              </div>

              <div class="absolute -bottom-2 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[#F4C94F] text-xs font-bold text-[#7C5A00]">
                1
              </div>

              <div class="absolute -right-2 -top-3">
                <Crown class="h-6 w-6 text-[#EAB308]" />
              </div>
            </div>

            <p class="mt-4 text-base font-bold text-[#17211B]">
              {{ topThree[0]?.name }}
            </p>

            <p class="mt-1 text-xs font-semibold text-[#15803D]">
              {{ topThree[0]?.xp.toLocaleString() }} XP
            </p>
          </div>

          <!-- Third -->
          <div class="flex flex-col items-center">
            <div class="relative">
              <div class="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#E8C0A5] bg-[#FFF4EC] text-xl font-bold text-[#9A5A2E]">
                {{ topThree[2]?.avatar }}
              </div>

              <div class="absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#E8C0A5] text-xs font-bold text-[#7C4422]">
                3
              </div>
            </div>

            <p class="mt-4 text-sm font-bold text-[#17211B]">
              {{ topThree[2]?.name }}
            </p>

            <p class="mt-1 text-xs text-[#98A39C]">
              {{ topThree[2]?.xp.toLocaleString() }} XP
            </p>
          </div>

        </div>
      </section>

      <!-- Your Ranking -->
      <section class="mb-8">
        <div class="mb-4">
          <h2 class="text-lg font-bold text-[#17211B]">
            Your Ranking
          </h2>

          <p class="mt-1 text-xs text-[#98A39C]">
            Your current position on the leaderboard
          </p>
        </div>

        <div
          v-if="currentUser"
          class="flex items-center gap-4 rounded-2xl border border-[#BFE8C9] bg-[#F1FBF3] px-5 py-4"
        >
          <div class="flex w-8 justify-center">
            <span class="text-sm font-bold text-[#15803D]">
              #{{ currentUser.rank }}
            </span>
          </div>

          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#22C55E] text-sm font-bold text-white">
            {{ currentUser.avatar }}
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="text-sm font-semibold text-[#15803D]">
                {{ currentUser.name }}
              </p>

              <span class="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-semibold text-[#15803D]">
                You
              </span>
            </div>

            <p class="mt-0.5 text-xs text-[#66736A]">
              Level {{ currentUser.level }}
            </p>
          </div>

          <div class="text-right">
            <p class="text-sm font-bold text-[#17211B]">
              {{ currentUser.xp.toLocaleString() }} XP
            </p>

            <p class="text-[10px] text-[#98A39C]">
              This week
            </p>
          </div>

          <div class="flex w-14 justify-end">
            <div class="flex items-center gap-1 text-xs font-semibold text-[#16A34A]">
              <ArrowUp class="h-3.5 w-3.5" />
              {{ currentUser.change }}
            </div>
          </div>
        </div>
      </section>

      <!-- All Rankings -->
      <section>
        <div class="mb-4 flex items-end justify-between">
          <div>
            <h2 class="text-lg font-bold text-[#17211B]">
              All Rankings
            </h2>

            <p class="mt-1 text-xs text-[#98A39C]">
              Keep earning XP to climb the leaderboard
            </p>
          </div>

          <span class="text-xs text-[#98A39C]">
            {{ leaderboard.length }} explorers
          </span>
        </div>

        <div class="space-y-3">
          <LeaderboardRow
            v-for="user in leaderboard"
            :key="user.rank"
            :user="user"
          />
        </div>
      </section>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'

import {
  ArrowUp,
  ChevronDown,
  Crown,
  Trophy
} from 'lucide-vue-next'

import AppLayout from '../layouts/AppLayout.vue'
import LeaderboardRow from '../components/cards/LeaderboardRow.vue'
import { leaderboard } from '../data/mockData.js'

const topThree = computed(() => {
  return leaderboard.slice(0, 3)
})

const currentUser = computed(() => {
  return leaderboard.find((user) => user.isCurrentUser)
})
</script>
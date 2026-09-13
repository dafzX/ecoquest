<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F8FAF8]">
      
      <!-- Mobile -->
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

      <!-- Desktop -->
      <main class="hidden md:block">
        <div class="mx-auto max-w-[1080px] px-6 py-8">

          <!-- Header -->
          <div class="mb-8 text-center">
            <h1 class="text-[32px] font-bold tracking-tight text-[#17211B]">
              Leaderboard
            </h1>
            <p class="mt-2 text-base text-[#66736A]">
              Peringkat para EcoQuest Explorer!
            </p>
          </div>

          <!-- Main Container -->
          <div class="mx-auto max-w-[800px] overflow-hidden rounded-3xl border border-[#E8EDE9] bg-white shadow-sm">
            
            <!-- Podium Section -->
            <div class="bg-[#F8FAF8] px-8 py-12">
              <div class="flex items-end justify-center gap-8 lg:gap-16">

                <!-- Rank 2 -->
                <div class="flex flex-col items-center">
                  <div class="relative mb-6">
                    <div class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#E2E8F0] bg-white text-3xl font-bold text-[#64748B] shadow-sm">
                      {{ topThree[1]?.avatar }}
                    </div>
                    <div class="absolute -bottom-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[#E2E8F0] text-sm font-bold text-[#475569] shadow-sm">
                      2
                    </div>
                  </div>
                  <h3 class="text-lg font-bold text-[#17211B]">{{ topThree[1]?.name }}</h3>
                  <p class="mt-1 text-sm text-[#66736A]">{{ topThree[1]?.xp.toLocaleString() }} XP • {{ topThree[1]?.xp ? Math.floor(topThree[1].xp / 35) : 401 }} pts</p>
                  <p class="mt-0.5 text-xs text-[#98A39C]">@{{ topThree[1]?.name.toLowerCase().replace(' ', '_') }}</p>
                </div>

                <!-- Rank 1 -->
                <div class="flex flex-col items-center">
                  <div class="relative mb-6">
                    <div class="flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#FBBF24] bg-white text-4xl font-bold text-[#D97706] shadow-sm">
                      {{ topThree[0]?.avatar }}
                    </div>
                    <div class="absolute -bottom-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#FBBF24] text-base font-bold text-white shadow-sm">
                      1
                    </div>
                    <div class="absolute -right-4 -top-6">
                      <Crown class="h-10 w-10 text-[#F59E0B]" />
                    </div>
                  </div>
                  <h3 class="text-xl font-bold text-[#17211B]">{{ topThree[0]?.name }}</h3>
                  <p class="mt-1 text-base font-bold text-[#15803D]">{{ topThree[0]?.xp.toLocaleString() }} XP • {{ topThree[0]?.xp ? Math.floor(topThree[0].xp / 35) : 450 }} pts</p>
                  <p class="mt-0.5 text-sm text-[#98A39C]">@{{ topThree[0]?.name.toLowerCase().replace(' ', '_') }}</p>
                </div>

                <!-- Rank 3 -->
                <div class="flex flex-col items-center">
                  <div class="relative mb-6">
                    <div class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#FDBA74] bg-white text-3xl font-bold text-[#C2410C] shadow-sm">
                      {{ topThree[2]?.avatar }}
                    </div>
                    <div class="absolute -bottom-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[#FDBA74] text-sm font-bold text-white shadow-sm">
                      3
                    </div>
                  </div>
                  <h3 class="text-lg font-bold text-[#17211B]">{{ topThree[2]?.name }}</h3>
                  <p class="mt-1 text-sm text-[#66736A]">{{ topThree[2]?.xp.toLocaleString() }} XP • {{ topThree[2]?.xp ? Math.floor(topThree[2].xp / 35) : 380 }} pts</p>
                  <p class="mt-0.5 text-xs text-[#98A39C]">@{{ topThree[2]?.name.toLowerCase().replace(' ', '_') }}</p>
                </div>

              </div>
            </div>

            <!-- List Section -->
            <div class="bg-white p-8">
              <div class="space-y-4">
                <div
                  v-for="(user, index) in leaderboard.slice(3, 10)"
                  :key="user.id"
                  class="flex items-center justify-between rounded-xl border border-[#E8EDE9] p-4 transition hover:bg-[#F8FAF8]"
                  :class="{ 'bg-[#E8F8ED] border-[#BBF7D0]': user.isCurrentUser }"
                >
                  <div class="flex items-center gap-4">
                    <span class="w-6 text-center text-lg font-bold text-[#98A39C]">{{ index + 4 }}</span>
                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F5F2] text-lg font-bold text-[#66736A]" :class="{'bg-[#22C55E] text-white': user.isCurrentUser}">
                      {{ user.avatar }}
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <h4 class="text-base font-bold text-[#17211B]">{{ user.name }}</h4>
                        <span v-if="user.isCurrentUser" class="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-xs font-semibold text-[#15803D]">You</span>
                      </div>
                      <p class="text-sm text-[#66736A]">{{ user.xp.toLocaleString() }} XP</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-base font-bold text-[#15803D]">{{ user.xp ? Math.floor(user.xp / 35) : 350 }} pts</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

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

import AppLayout from '@/layouts/AppLayout.vue'
import LeaderboardRow from '@/components/cards/LeaderboardRow.vue'
import { leaderboard } from '@/data/mockData.js'

const topThree = computed(() => {
  return leaderboard.slice(0, 3)
})

const currentUser = computed(() => {
  return leaderboard.find((user) => user.isCurrentUser)
})
</script>
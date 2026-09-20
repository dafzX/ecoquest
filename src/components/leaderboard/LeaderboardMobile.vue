<template>
  <main class="md:hidden mx-auto max-w-[430px] px-4 pb-20">
    <!-- Header -->
    <div class="py-6">
      <h1 class="text-2xl font-bold tracking-tight text-[#17211B]">
        Peringkat
      </h1>
      <p class="mt-1 text-xs text-[#66736A]">
        Lihat peringkatmu di antara penjelajah lain
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
              Peringkat Mingguan
            </h2>
            <p class="text-[10px] text-[#98A39C]">
              Penjelajah terbaik minggu ini
            </p>
          </div>
        </div>
      </div>

      <!-- Top 3 -->
      <div class="grid grid-cols-3 items-end gap-2 px-4 pb-6 pt-8">
        <!-- Second -->
        <div class="flex flex-col items-center">
          <div class="relative">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 shadow-md ring-2 ring-white text-sm font-bold text-slate-600">
              {{ topThree[1]?.avatar }}
            </div>
            <div class="absolute -bottom-2 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-slate-400 to-slate-500 shadow-sm ring-1 ring-white text-[10px] font-bold text-white">
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
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.4)] ring-2 ring-white text-lg font-bold text-yellow-900">
              {{ topThree[0]?.avatar }}
            </div>
            <div class="absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-sm ring-1 ring-white text-[10px] font-bold text-white">
              1
            </div>
            <div class="absolute -right-2 -top-3">
              <Crown class="h-5 w-5 text-yellow-400 drop-shadow-sm" />
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
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 shadow-md ring-2 ring-white text-sm font-bold text-orange-900">
              {{ topThree[2]?.avatar }}
            </div>
            <div class="absolute -bottom-2 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-orange-600 shadow-sm ring-1 ring-white text-[10px] font-bold text-white">
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
          Peringkat Anda
        </h2>
      </div>

      <div
        v-if="currentUser"
        class="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-green-50/80 px-4 py-3"
      >
        <div class="flex w-6 justify-center">
          <span class="text-xs font-black italic text-emerald-600">
            #{{ currentUser.rank }}
          </span>
        </div>

        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 shadow-sm ring-1 ring-white text-xs font-bold text-white">
          {{ currentUser.avatar }}
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="truncate text-xs font-bold text-emerald-900">
              {{ currentUser.name }}
            </p>
            <span class="shrink-0 rounded-full bg-emerald-200 px-2 py-0.5 text-[8px] font-bold tracking-wide text-emerald-700">
              ANDA
            </span>
          </div>
          <p class="mt-0.5 text-[10px] text-emerald-700">
            Level {{ currentUser.level }}
          </p>
        </div>

        <div class="text-right">
          <p class="text-xs font-bold text-emerald-700">
            {{ currentUser.xp.toLocaleString() }} XP
          </p>
        </div>
      </div>
    </section>

    <!-- All Rankings -->
    <section>
      <div class="mb-3">
        <h2 class="text-sm font-bold text-[#17211B]">
          Semua Peringkat
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

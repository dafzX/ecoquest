<template>
  <main class="hidden md:block">
    <div class="mx-auto max-w-[1200px] px-6 py-8">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-[32px] font-bold tracking-tight text-[#17211B]">
          Leaderboard
        </h1>
        <p class="mt-2 text-base text-[#66736A]">
          Peringkat para EcoQuest Explorer!
        </p>
      </div>

      <div class="grid grid-cols-12 gap-8">
        
        <!-- Left Column: Podium (Top 3) -->
        <div class="col-span-5">
          <div class="rounded-3xl border border-[#E8EDE9] bg-gradient-to-b from-white to-[#F8FAF8] p-8 shadow-[0_8px_30px_rgba(23,33,27,0.04)]">
            <div class="mb-10 text-center">
              <h2 class="text-xl font-bold text-[#17211B]">Top Explorers</h2>
              <p class="text-sm text-[#98A39C]">Minggu ini</p>
            </div>

            <div class="flex items-end justify-center gap-4">
              <!-- Rank 2 -->
              <div class="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2">
                <div class="relative mb-4">
                  <div class="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-2xl font-bold text-slate-600 shadow-lg ring-4 ring-white transition-all duration-300 group-hover:shadow-xl">
                    {{ topThree[1]?.avatar }}
                  </div>
                  <div class="absolute -bottom-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-slate-400 to-slate-500 text-sm font-bold text-white shadow-md ring-2 ring-white">
                    2
                  </div>
                </div>
                <h3 class="text-base font-bold text-[#17211B]">{{ topThree[1]?.name }}</h3>
                <p class="mt-1 text-xs font-semibold text-[#66736A]">{{ topThree[1]?.xp.toLocaleString() }} XP</p>
              </div>

              <!-- Rank 1 -->
              <div class="group flex flex-col items-center pb-8 transition-all duration-300 hover:-translate-y-2">
                <div class="relative mb-4">
                  <div class="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-500 text-4xl font-bold text-yellow-900 shadow-[0_0_30px_rgba(250,204,21,0.4)] ring-4 ring-white transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(250,204,21,0.6)]">
                    {{ topThree[0]?.avatar }}
                  </div>
                  <div class="absolute -bottom-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 text-base font-bold text-white shadow-md ring-2 ring-white">
                    1
                  </div>
                  <div class="absolute -right-3 -top-5">
                    <Crown class="h-10 w-10 text-yellow-400 drop-shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                </div>
                <h3 class="text-xl font-bold text-[#17211B]">{{ topThree[0]?.name }}</h3>
                <p class="mt-1 text-sm font-bold text-[#15803D]">{{ topThree[0]?.xp.toLocaleString() }} XP</p>
              </div>

              <!-- Rank 3 -->
              <div class="group flex flex-col items-center transition-all duration-300 hover:-translate-y-2">
                <div class="relative mb-4">
                  <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 text-xl font-bold text-orange-900 shadow-lg ring-4 ring-white transition-all duration-300 group-hover:shadow-xl">
                    {{ topThree[2]?.avatar }}
                  </div>
                  <div class="absolute -bottom-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-orange-600 text-sm font-bold text-white shadow-md ring-2 ring-white">
                    3
                  </div>
                </div>
                <h3 class="text-sm font-bold text-[#17211B]">{{ topThree[2]?.name }}</h3>
                <p class="mt-1 text-[10px] font-semibold text-[#66736A]">{{ topThree[2]?.xp.toLocaleString() }} XP</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Data Table -->
        <div class="col-span-7">
          <div class="rounded-3xl border border-[#E8EDE9] bg-white shadow-[0_8px_30px_rgba(23,33,27,0.04)] overflow-hidden">
            
            <!-- Table Header -->
            <div class="flex items-center gap-4 border-b border-[#E8EDE9] bg-[#F8FAF8] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[#98A39C]">
              <div class="w-16 text-center">Rank</div>
              <div class="flex-1">Explorer</div>
              <div class="w-24 text-center">Level</div>
              <div class="w-32 text-right">Total XP</div>
            </div>

            <div class="flex flex-col">
              <!-- Current User Pinned Row -->
              <div
                v-if="currentUser"
                class="group flex items-center gap-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-green-50/80 px-6 py-4 transition-all duration-300 hover:bg-emerald-50"
              >
                <div class="w-16 text-center text-xl font-black italic text-emerald-600">
                  #{{ currentUser.rank }}
                </div>
                <div class="flex flex-1 items-center gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white shadow-md shadow-emerald-500/20 ring-2 ring-white transition-transform group-hover:scale-105">
                    {{ currentUser.avatar }}
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h4 class="text-base font-bold text-emerald-900">{{ currentUser.name }}</h4>
                      <span class="rounded-full bg-emerald-200 px-2 py-0.5 text-[10px] font-bold tracking-wide text-emerald-700">YOU</span>
                    </div>
                  </div>
                </div>
                <div class="w-24 text-center text-sm font-semibold text-emerald-700">
                  {{ currentUser.level }}
                </div>
                <div class="w-32 text-right text-base font-bold text-emerald-700">
                  {{ currentUser.xp.toLocaleString() }} XP
                </div>
              </div>

              <!-- Other Rows -->
              <div
                v-for="(user) in leaderboard.slice(3)"
                :key="user.id"
                class="group flex items-center gap-4 border-b border-[#E8EDE9] px-6 py-4 transition-all duration-300 hover:bg-[#F8FAF8]"
                :class="{ 'hidden': user.isCurrentUser }"
              >
                <div class="w-16 text-center text-lg font-bold text-[#98A39C] transition-colors group-hover:text-[#66736A]">
                  {{ user.rank }}
                </div>
                <div class="flex flex-1 items-center gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F5F2] text-lg font-bold text-[#66736A] ring-2 ring-transparent transition-all group-hover:shadow-sm group-hover:ring-white">
                    {{ user.avatar }}
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-[#17211B]">{{ user.name }}</h4>
                  </div>
                </div>
                <div class="w-24 text-center text-sm font-semibold text-[#66736A]">
                  {{ user.level }}
                </div>
                <div class="w-32 text-right text-base font-semibold text-[#455149]">
                  {{ user.xp.toLocaleString() }} XP
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { Crown } from 'lucide-vue-next'

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

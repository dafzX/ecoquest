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
          <div class="rounded-3xl border border-[#E8EDE9] bg-white p-8 shadow-sm">
            <div class="mb-10 text-center">
              <h2 class="text-xl font-bold text-[#17211B]">Top Explorers</h2>
              <p class="text-sm text-[#98A39C]">Minggu ini</p>
            </div>

            <div class="flex items-end justify-center gap-4">
              <!-- Rank 2 -->
              <div class="flex flex-col items-center">
                <div class="relative mb-4">
                  <div class="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#E2E8F0] bg-white text-2xl font-bold text-[#64748B] shadow-sm">
                    {{ topThree[1]?.avatar }}
                  </div>
                  <div class="absolute -bottom-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#E2E8F0] text-sm font-bold text-[#475569] shadow-sm">
                    2
                  </div>
                </div>
                <h3 class="text-base font-bold text-[#17211B]">{{ topThree[1]?.name }}</h3>
                <p class="mt-1 text-xs text-[#66736A]">{{ topThree[1]?.xp.toLocaleString() }} XP</p>
              </div>

              <!-- Rank 1 -->
              <div class="flex flex-col items-center pb-8">
                <div class="relative mb-4">
                  <div class="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#FBBF24] bg-white text-4xl font-bold text-[#D97706] shadow-sm">
                    {{ topThree[0]?.avatar }}
                  </div>
                  <div class="absolute -bottom-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-[#FBBF24] text-base font-bold text-white shadow-sm">
                    1
                  </div>
                  <div class="absolute -right-3 -top-5">
                    <Crown class="h-10 w-10 text-[#F59E0B] drop-shadow-md" />
                  </div>
                </div>
                <h3 class="text-xl font-bold text-[#17211B]">{{ topThree[0]?.name }}</h3>
                <p class="mt-1 text-sm font-bold text-[#15803D]">{{ topThree[0]?.xp.toLocaleString() }} XP</p>
              </div>

              <!-- Rank 3 -->
              <div class="flex flex-col items-center">
                <div class="relative mb-4">
                  <div class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#FDBA74] bg-white text-xl font-bold text-[#C2410C] shadow-sm">
                    {{ topThree[2]?.avatar }}
                  </div>
                  <div class="absolute -bottom-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#FDBA74] text-sm font-bold text-white shadow-sm">
                    3
                  </div>
                </div>
                <h3 class="text-sm font-bold text-[#17211B]">{{ topThree[2]?.name }}</h3>
                <p class="mt-1 text-[10px] text-[#66736A]">{{ topThree[2]?.xp.toLocaleString() }} XP</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Data Table -->
        <div class="col-span-7">
          <div class="rounded-3xl border border-[#E8EDE9] bg-white shadow-sm">
            
            <!-- Table Header -->
            <div class="flex items-center gap-4 border-b border-[#E8EDE9] bg-[#F8FAF8] px-6 py-4 rounded-t-3xl text-sm font-semibold text-[#98A39C]">
              <div class="w-16 text-center">Rank</div>
              <div class="flex-1">Explorer</div>
              <div class="w-24 text-center">Level</div>
              <div class="w-32 text-right">Total XP</div>
            </div>

            <div class="flex flex-col">
              <!-- Current User Pinned Row -->
              <div
                v-if="currentUser"
                class="flex items-center gap-4 border-b-2 border-[#BBF7D0] bg-[#F1FBF3] px-6 py-4 transition"
              >
                <div class="w-16 text-center text-lg font-bold text-[#15803D]">
                  #{{ currentUser.rank }}
                </div>
                <div class="flex flex-1 items-center gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#22C55E] text-lg font-bold text-white shadow-sm">
                    {{ currentUser.avatar }}
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h4 class="text-base font-bold text-[#15803D]">{{ currentUser.name }}</h4>
                      <span class="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-xs font-semibold text-[#15803D]">You</span>
                    </div>
                  </div>
                </div>
                <div class="w-24 text-center text-sm font-semibold text-[#66736A]">
                  {{ currentUser.level }}
                </div>
                <div class="w-32 text-right text-base font-bold text-[#17211B]">
                  {{ currentUser.xp.toLocaleString() }} XP
                </div>
              </div>

              <!-- Other Rows -->
              <div
                v-for="(user) in leaderboard.slice(3)"
                :key="user.id"
                class="flex items-center gap-4 border-b border-[#E8EDE9] px-6 py-4 transition hover:bg-[#F8FAF8]"
                :class="{ 'hidden': user.isCurrentUser }"
              >
                <div class="w-16 text-center text-lg font-bold text-[#98A39C]">
                  {{ user.rank }}
                </div>
                <div class="flex flex-1 items-center gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F5F2] text-lg font-bold text-[#66736A]">
                    {{ user.avatar }}
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-[#17211B]">{{ user.name }}</h4>
                  </div>
                </div>
                <div class="w-24 text-center text-sm font-semibold text-[#66736A]">
                  {{ user.level }}
                </div>
                <div class="w-32 text-right text-base font-medium text-[#17211B]">
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

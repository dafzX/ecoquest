<template>
  <main class="hidden md:block">
    <div class="mx-auto w-full max-w-250 px-6 py-8">
      
      <!-- Header -->
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-bold tracking-tight text-[#17211B] lg:text-4xl">
          Papan Peringkat
        </h1>
        <p class="mt-3 text-sm text-[#718078] lg:text-base">
          Jadilah yang terbaik dan beri dampak terbesar untuk lingkungan!
        </p>
      </div>

      <!-- Top 3 Podium (Horizontal) -->
      <div v-if="topRanked.length" class="mb-12 grid grid-cols-3 gap-6">
        <!-- Rank 2 -->
        <div v-if="topRanked[1]" class="relative mt-8 flex flex-col items-center justify-center rounded-lg border border-[#E8EDE9] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
          <div class="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E7EB] border-4 border-white text-sm font-bold text-[#4B5563] shadow-sm">
            #2
          </div>
          <div class="mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F3F4F6] text-2xl font-bold text-[#4B5563]">
            {{ topRanked[1].avatar }}
          </div>
          <h3 class="mt-4 w-full truncate text-center text-lg font-bold text-[#17211B]">{{ topRanked[1].name }}</h3>
          <p class="mt-1 text-sm font-semibold text-[#6B7280]">{{ formatXp(topRanked[1].xp) }} XP</p>
        </div>

        <!-- Rank 1 -->
        <div v-if="topRanked[0]" class="relative z-10 flex flex-col items-center justify-center rounded-lg border-2 border-[#ffa600] bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <Crown class="absolute -top-8 h-12 w-12 text-[#F59E0B] drop-shadow-sm" />
          <div class="absolute -top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FDE68A] border-4 border-white text-base font-bold text-[#B45309] shadow-sm">
            #1
          </div>
          <div class="mt-6 flex h-28 w-28 items-center justify-center rounded-full bg-[#FEF3C7] text-3xl font-bold text-[#B45309]">
            {{ topRanked[0].avatar }}
          </div>
          <h3 class="mt-5 w-full truncate text-center text-xl font-bold text-[#17211B]">{{ topRanked[0].name }}</h3>
          <p class="mt-1 text-base font-bold text-[#D97706]">{{ formatXp(topRanked[0].xp) }} XP</p>
        </div>

        <!-- Rank 3 -->
        <div v-if="topRanked[2]" class="relative mt-12 flex flex-col items-center justify-center rounded-lg border border-[#F3E8E0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
          <div class="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#FED7AA] border-4 border-white text-sm font-bold text-[#9A3412] shadow-sm">
            #3
          </div>
          <div class="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFEDD5] text-xl font-bold text-[#9A3412]">
            {{ topRanked[2].avatar }}
          </div>
          <h3 class="mt-3 w-full truncate text-center text-base font-bold text-[#17211B]">{{ topRanked[2].name }}</h3>
          <p class="mt-1 text-xs font-semibold text-[#9A3412]">{{ formatXp(topRanked[2].xp) }} XP</p>
        </div>
      </div>

      <div v-else class="mb-10 flex min-h-55 items-center justify-center text-sm text-[#98A39C]">
        Belum ada data papan peringkat.
      </div>

      <!-- Leaderboard List -->
      <div class="rounded-lg border border-[#E8EDE9] bg-white p-3 shadow-sm">
        <div class="grid grid-cols-[80px_1fr_100px_120px] items-center gap-4 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#A3ADA7]">
          <div class="text-center">Peringkat</div>
          <div>Penjelajah</div>
          <div class="text-center">Level</div>
          <div class="text-right">Total XP</div>
        </div>

        <div class="flex flex-col gap-1 px-2 pb-2">
          <div
            v-for="user in sortedLeaderboard"
            :key="user.id"
            class="group grid grid-cols-[80px_1fr_100px_120px] items-center gap-4 rounded-lg px-4 py-3.5 transition-all duration-300 hover:bg-[#F8FAF8]"
            :class="user.isCurrentUser ? 'bg-[#F0FDF4] ring-1 ring-[#BBF7D0] shadow-[0_4px_10px_rgba(34,197,94,0.05)]' : ''"
          >
            <div class="text-center text-base font-bold text-[#718078]" :class="user.isCurrentUser ? 'text-[#15803D]' : ''">
              #{{ user.rank }}
            </div>

            <div class="flex items-center gap-4 min-w-0">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F1F5F2] font-bold text-[#405047]"
                   :class="user.isCurrentUser ? 'bg-[#22C55E] text-white' : ''">
                {{ user.avatar }}
              </div>
              <div class="min-w-0">
                <h4 class="truncate font-bold text-[#17211B] lg:text-base">{{ user.name }}</h4>
                <span v-if="user.isCurrentUser" class="text-[10px] font-bold text-[#15803D]">ANDA</span>
              </div>
            </div>

            <div class="text-center text-sm font-semibold text-[#718078]">
              {{ user.level }}
            </div>

            <div class="text-right font-bold text-[#405047] lg:text-base" :class="user.isCurrentUser ? 'text-[#15803D]' : ''">
              {{ formatXp(user.xp) }} XP
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
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

const sortedLeaderboard = computed(() => {
  return [...props.leaderboard]
    .sort((a, b) => {
      return Number(b.xp || 0) - Number(a.xp || 0)
    })
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }))
})

const topRanked = computed(() => {
  return sortedLeaderboard.value.slice(0, 3)
})

const formatXp = (xp) => {
  return Number(xp || 0).toLocaleString()
}
</script>
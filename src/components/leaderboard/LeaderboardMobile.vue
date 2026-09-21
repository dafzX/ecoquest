<template>
  <main class="mx-auto w-full max-w-[430px] px-3 pb-24 sm:px-4 md:hidden">

    <!-- Header -->
    <header class="relative flex h-14 items-center justify-center">
      <button
        type="button"
        @click="goBack"
        class="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm transition active:scale-95"
      >
        <ArrowLeft class="h-4 w-4" />
      </button>

      <span class="text-[13px] font-semibold text-[#17211B]">
        Leaderboard
      </span>
    </header>

    <!-- Leaderboard Hero -->
    <section
      class="mb-5 overflow-hidden rounded-2xl border border-[#DCEBDD] bg-white"
    >
      <!-- Hero Header -->
      <div
        class="border-b border-[#E8EDE9] px-3.5 py-3.5 sm:px-4 sm:py-4"
      >
        <div class="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF8E1] sm:h-10 sm:w-10"
          >
            <Trophy class="h-4 w-4 text-[#CA8A04] sm:h-5 sm:w-5" />
          </div>

          <div class="min-w-0">
            <h2
              class="truncate text-[12px] font-bold text-[#17211B] sm:text-sm"
            >
              Peringkat Mingguan
            </h2>

            <p
              class="mt-0.5 truncate text-[8px] text-[#98A39C] sm:text-[10px]"
            >
              Penjelajah terbaik minggu ini
            </p>
          </div>
        </div>
      </div>

      <!-- Top 3 -->
      <div class="px-2.5 pb-6 pt-8 sm:px-4 sm:pt-9">
        <div class="grid grid-cols-3 items-end">

          <!-- Rank 2 -->
          <div
            v-if="topThree[1]"
            class="flex min-w-0 flex-col items-center"
          >
            <div class="relative">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-[11px] font-bold text-slate-600 shadow-md ring-2 ring-white xs:h-11 xs:w-11 sm:h-12 sm:w-12 sm:text-sm"
              >
                {{ topThree[1].avatar }}
              </div>

              <div
                class="absolute -bottom-2 left-1/2 flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-slate-400 to-slate-500 text-[8px] font-bold text-white shadow-sm ring-1 ring-white sm:h-5 sm:w-5 sm:text-[10px]"
              >
                2
              </div>
            </div>

            <p
              class="mt-3 w-full max-w-[80px] truncate px-1 text-center text-[9px] font-bold text-[#17211B] sm:max-w-[100px] sm:text-xs"
            >
              {{ topThree[1].name }}
            </p>

            <p
              class="mt-0.5 whitespace-nowrap text-[8px] text-[#98A39C] sm:text-[10px]"
            >
              {{ formatXp(topThree[1].xp) }} XP
            </p>
          </div>

          <!-- Rank 1 -->
          <div
            v-if="topThree[0]"
            class="flex min-w-0 flex-col items-center"
          >
            <div class="relative">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-500 text-base font-bold text-yellow-900 shadow-[0_0_15px_rgba(250,204,21,0.4)] ring-2 ring-white sm:h-16 sm:w-16 sm:text-lg"
              >
                {{ topThree[0].avatar }}
              </div>

              <div
                class="absolute -bottom-2 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 text-[9px] font-bold text-white shadow-sm ring-1 ring-white sm:h-6 sm:w-6 sm:text-[10px]"
              >
                1
              </div>

              <div class="absolute -right-2 -top-3">
                <Crown
                  class="h-5 w-5 text-yellow-400 drop-shadow-sm sm:h-6 sm:w-6"
                />
              </div>
            </div>

            <p
              class="mt-3 w-full max-w-[90px] truncate px-1 text-center text-[10px] font-bold text-[#17211B] sm:max-w-[110px] sm:text-sm"
            >
              {{ topThree[0].name }}
            </p>

            <p
              class="mt-0.5 whitespace-nowrap text-[8px] font-semibold text-[#15803D] sm:text-[10px]"
            >
              {{ formatXp(topThree[0].xp) }} XP
            </p>
          </div>

          <!-- Rank 3 -->
          <div
            v-if="topThree[2]"
            class="flex min-w-0 flex-col items-center"
          >
            <div class="relative">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 text-[11px] font-bold text-orange-900 shadow-md ring-2 ring-white sm:h-12 sm:w-12 sm:text-sm"
              >
                {{ topThree[2].avatar }}
              </div>

              <div
                class="absolute -bottom-2 left-1/2 flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-orange-600 text-[8px] font-bold text-white shadow-sm ring-1 ring-white sm:h-5 sm:w-5 sm:text-[10px]"
              >
                3
              </div>
            </div>

            <p
              class="mt-3 w-full max-w-[80px] truncate px-1 text-center text-[9px] font-bold text-[#17211B] sm:max-w-[100px] sm:text-xs"
            >
              {{ topThree[2].name }}
            </p>

            <p
              class="mt-0.5 whitespace-nowrap text-[8px] text-[#98A39C] sm:text-[10px]"
            >
              {{ formatXp(topThree[2].xp) }} XP
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- Your Ranking -->
    <section class="mb-5">
      <div class="mb-2.5">
        <h2 class="text-[12px] font-bold text-[#17211B] sm:text-sm">
          Peringkat Anda
        </h2>
      </div>

      <div
        v-if="currentUser"
        class="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-green-50/80 px-3 py-3 sm:px-4"
      >
        <div class="flex min-w-0 items-center gap-2.5 sm:gap-3">

          <!-- Rank -->
          <div class="w-6 shrink-0 text-center sm:w-7">
            <span
              class="text-[10px] font-black italic text-emerald-600 sm:text-xs"
            >
              #{{ currentUser.rank }}
            </span>
          </div>

          <!-- Avatar -->
          <div
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-sm ring-1 ring-white sm:h-9 sm:w-9 sm:text-xs"
          >
            {{ currentUser.avatar }}
          </div>

          <!-- User -->
          <div class="min-w-0 flex-1">
            <div class="flex min-w-0 items-center gap-1.5">
              <p
                class="min-w-0 truncate text-[10px] font-bold text-emerald-900 sm:text-xs"
              >
                {{ currentUser.name }}
              </p>

              <span
                class="shrink-0 rounded-full bg-emerald-200 px-1.5 py-0.5 text-[6px] font-bold tracking-wide text-emerald-700 sm:px-2 sm:text-[8px]"
              >
                ANDA
              </span>
            </div>

            <p
              class="mt-0.5 text-[8px] text-emerald-700 sm:text-[10px]"
            >
              Level {{ currentUser.level }}
            </p>
          </div>

          <!-- XP -->
          <div class="shrink-0 text-right">
            <p
              class="whitespace-nowrap text-[9px] font-bold text-emerald-700 sm:text-xs"
            >
              {{ formatXp(currentUser.xp) }}
            </p>

            <p class="text-[6px] text-emerald-600 sm:text-[7px]">
              XP
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- All Rankings -->
    <section>
      <div class="mb-2.5 flex items-center justify-between">
        <h2 class="text-[12px] font-bold text-[#17211B] sm:text-sm">
          Semua Peringkat
        </h2>

        <span class="text-[8px] text-[#98A39C]">
          {{ leaderboard.length }} Explorer
        </span>
      </div>

      <!-- Ranking List -->
      <div class="space-y-2">

        <article
          v-for="user in leaderboard"
          :key="user.id"
          class="w-full rounded-2xl border px-3 py-3 transition-all duration-200 sm:px-4"
          :class="
            user.isCurrentUser
              ? 'border-emerald-200 bg-gradient-to-r from-emerald-50/80 to-green-50/80'
              : 'border-[#E8EDE9] bg-white'
          "
        >
          <div class="flex min-w-0 items-center gap-2.5 sm:gap-3">

            <!-- Rank -->
            <div class="w-6 shrink-0 text-center sm:w-7">
              <span
                class="text-[10px] font-bold sm:text-xs"
                :class="
                  user.isCurrentUser
                    ? 'italic text-emerald-600'
                    : 'text-[#98A39C]'
                "
              >
                #{{ user.rank }}
              </span>
            </div>

            <!-- Avatar -->
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold sm:h-9 sm:w-9 sm:text-xs"
              :class="
                user.isCurrentUser
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-[#EAF5ED] text-[#15803D]'
              "
            >
              {{ user.avatar }}
            </div>

            <!-- Name + Level -->
            <div class="min-w-0 flex-1">
              <div class="flex min-w-0 items-center gap-1.5">
                <p
                  class="min-w-0 truncate text-[10px] font-bold sm:text-xs"
                  :class="
                    user.isCurrentUser
                      ? 'text-emerald-900'
                      : 'text-[#17211B]'
                  "
                >
                  {{ user.name }}
                </p>

                <span
                  v-if="user.isCurrentUser"
                  class="shrink-0 rounded-full bg-emerald-200 px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-wide text-emerald-700 sm:text-[7px]"
                >
                  Anda
                </span>
              </div>

              <p
                class="mt-0.5 text-[8px] sm:text-[9px]"
                :class="
                  user.isCurrentUser
                    ? 'text-emerald-700'
                    : 'text-[#98A39C]'
                "
              >
                Level {{ user.level }}
              </p>
            </div>

            <!-- XP -->
            <div class="shrink-0 text-right">
              <p
                class="whitespace-nowrap text-[9px] font-bold sm:text-[10px]"
                :class="
                  user.isCurrentUser
                    ? 'text-emerald-700'
                    : 'text-[#455149]'
                "
              >
                {{ formatXp(user.xp) }}
              </p>

              <p
                class="text-[6px] sm:text-[7px]"
                :class="
                  user.isCurrentUser
                    ? 'text-emerald-600'
                    : 'text-[#98A39C]'
                "
              >
                XP
              </p>
            </div>

          </div>
        </article>

      </div>
    </section>

  </main>
</template>

<script setup>
import {
  ArrowLeft,
  Crown,
  Trophy
} from 'lucide-vue-next'

defineProps({
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
  },

  goBack: {
    type: Function,
    required: true
  }
})

const formatXp = (xp) => {
  return Number(xp || 0).toLocaleString()
}
</script>
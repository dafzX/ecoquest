<template>
  <main class="hidden md:block">
    <div class="mx-auto w-full max-w-[1400px] px-5 py-6 lg:px-8 lg:py-8 xl:px-10">

      <div class="mb-6 lg:mb-8">
        <h1 class="text-2xl font-bold tracking-tight text-[#17211B] lg:text-[32px]">
          Leaderboard
        </h1>

        <p class="mt-1.5 text-sm text-[#66736A] lg:mt-2 lg:text-base">
          Peringkat para EcoQuest Explorer!
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-12 xl:gap-8">

        <div class="xl:col-span-5">
          <div
            class="h-full rounded-3xl border border-[#E8EDE9] bg-gradient-to-b from-white to-[#F8FAF8] p-5 shadow-[0_8px_30px_rgba(23,33,27,0.04)] sm:p-6 lg:p-8"
          >
            <div class="mb-8 text-center lg:mb-10">
              <h2 class="text-lg font-bold text-[#17211B] lg:text-xl">
                Top Explorers
              </h2>

              <p class="text-xs text-[#98A39C] lg:text-sm">
                Minggu ini
              </p>
            </div>

            <div
              v-if="topRanked.length"
              class="flex min-w-0 items-end justify-center gap-2 sm:gap-4 lg:gap-5"
            >
              <div
                v-if="topRanked[1]"
                class="group flex min-w-0 flex-1 flex-col items-center transition-all duration-300 hover:-translate-y-2"
              >
                <div class="relative mb-4">
                  <div
                    class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-xl font-bold text-slate-600 shadow-lg ring-4 ring-white transition-all duration-300 group-hover:shadow-xl sm:h-20 sm:w-20 sm:text-2xl"
                  >
                    {{ topRanked[1].avatar }}
                  </div>

                  <div
                    class="absolute -bottom-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-slate-400 to-slate-500 text-xs font-bold text-white shadow-md ring-2 ring-white sm:h-7 sm:w-7 sm:text-sm"
                  >
                    2
                  </div>
                </div>

                <h3
                  class="w-full truncate text-center text-xs font-bold text-[#17211B] sm:text-sm lg:text-base"
                >
                  {{ topRanked[1].name }}
                </h3>

                <p
                  class="mt-1 text-[10px] font-semibold text-[#66736A] sm:text-xs"
                >
                  {{ formatXp(topRanked[1].xp) }} XP
                </p>
              </div>

              <div
                v-if="topRanked[0]"
                class="group flex min-w-0 flex-1 flex-col items-center pb-6 transition-all duration-300 hover:-translate-y-2 sm:pb-8"
              >
                <div class="relative mb-4">
                  <div
                    class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-500 text-3xl font-bold text-yellow-900 shadow-[0_0_30px_rgba(250,204,21,0.4)] ring-4 ring-white transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(250,204,21,0.6)] sm:h-28 sm:w-28 sm:text-4xl"
                  >
                    {{ topRanked[0].avatar }}
                  </div>

                  <div
                    class="absolute -bottom-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 text-sm font-bold text-white shadow-md ring-2 ring-white sm:h-9 sm:w-9 sm:text-base"
                  >
                    1
                  </div>

                  <div class="absolute -right-3 -top-5">
                    <Crown
                      class="h-8 w-8 text-yellow-400 drop-shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 sm:h-10 sm:w-10"
                    />
                  </div>
                </div>

                <h3
                  class="w-full truncate text-center text-base font-bold text-[#17211B] sm:text-lg lg:text-xl"
                >
                  {{ topRanked[0].name }}
                </h3>

                <p class="mt-1 text-xs font-bold text-[#15803D] sm:text-sm">
                  {{ formatXp(topRanked[0].xp) }} XP
                </p>
              </div>

              <div
                v-if="topRanked[2]"
                class="group flex min-w-0 flex-1 flex-col items-center transition-all duration-300 hover:-translate-y-2"
              >
                <div class="relative mb-4">
                  <div
                    class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 text-lg font-bold text-orange-900 shadow-lg ring-4 ring-white transition-all duration-300 group-hover:shadow-xl sm:h-16 sm:w-16 sm:text-xl"
                  >
                    {{ topRanked[2].avatar }}
                  </div>

                  <div
                    class="absolute -bottom-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-orange-600 text-xs font-bold text-white shadow-md ring-2 ring-white sm:h-7 sm:w-7 sm:text-sm"
                  >
                    3
                  </div>
                </div>

                <h3
                  class="w-full truncate text-center text-xs font-bold text-[#17211B] sm:text-sm"
                >
                  {{ topRanked[2].name }}
                </h3>

                <p
                  class="mt-1 text-[9px] font-semibold text-[#66736A] sm:text-[10px]"
                >
                  {{ formatXp(topRanked[2].xp) }} XP
                </p>
              </div>

            </div>

            <div
              v-else
              class="flex min-h-[220px] items-center justify-center text-sm text-[#98A39C]"
            >
              Belum ada data leaderboard.
            </div>
          </div>
        </div>

        <div class="min-w-0 xl:col-span-7">
          <div
            class="overflow-hidden rounded-3xl border border-[#E8EDE9] bg-white shadow-[0_8px_30px_rgba(23,33,27,0.04)]"
          >

            <div
              class="hidden grid-cols-[64px_minmax(0,1fr)_90px_130px] items-center gap-4 border-b border-[#E8EDE9] bg-[#F8FAF8] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#98A39C] lg:grid lg:px-6"
            >
              <div class="text-center">
                Rank
              </div>

              <div>
                Explorer
              </div>

              <div class="text-center">
                Level
              </div>

              <div class="text-right">
                Total XP
              </div>
            </div>

            <div
              class="grid grid-cols-[48px_minmax(0,1fr)_70px_100px] items-center gap-3 border-b border-[#E8EDE9] bg-[#F8FAF8] px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#98A39C] lg:hidden"
            >
              <div class="text-center">
                Rank
              </div>

              <div>
                Explorer
              </div>

              <div class="text-center">
                Level
              </div>

              <div class="text-right">
                XP
              </div>
            </div>

            <div class="flex flex-col">

              <div
                v-for="user in sortedLeaderboard"
                :key="user.id"
                class="group grid grid-cols-[48px_minmax(0,1fr)_70px_100px] items-center gap-3 border-b border-[#E8EDE9] px-4 py-3.5 transition-all duration-300 last:border-b-0 hover:bg-[#F8FAF8] lg:grid-cols-[64px_minmax(0,1fr)_90px_130px] lg:gap-4 lg:px-6 lg:py-4"
                :class="
                  user.isCurrentUser
                    ? 'border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-green-50/80 hover:bg-emerald-50'
                    : ''
                "
              >

                <div
                  class="text-center font-bold"
                  :class="
                    user.isCurrentUser
                      ? 'text-base italic text-emerald-600 lg:text-xl'
                      : 'text-sm text-[#98A39C] lg:text-lg'
                  "
                >
                  {{ user.isCurrentUser ? `#${user.rank}` : user.rank }}
                </div>

                <div class="flex min-w-0 items-center gap-3 lg:gap-4">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-2 ring-transparent transition-all group-hover:ring-white lg:h-12 lg:w-12 lg:text-lg"
                    :class="
                      user.isCurrentUser
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-[#F1F5F2] text-[#66736A] group-hover:shadow-sm'
                    "
                  >
                    {{ user.avatar }}
                  </div>

                  <div class="min-w-0">
                    <div class="flex min-w-0 items-center gap-2">
                      <h4
                        class="min-w-0 truncate text-xs font-bold lg:text-base"
                        :class="
                          user.isCurrentUser
                            ? 'text-emerald-900'
                            : 'text-[#17211B]'
                        "
                      >
                        {{ user.name }}
                      </h4>

                      <span
                        v-if="user.isCurrentUser"
                        class="shrink-0 rounded-full bg-emerald-200 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-emerald-700 lg:px-2 lg:text-[10px]"
                      >
                        YOU
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  class="text-center text-xs font-semibold lg:text-sm"
                  :class="
                    user.isCurrentUser
                      ? 'text-emerald-700'
                      : 'text-[#66736A]'
                  "
                >
                  {{ user.level }}
                </div>

                <div
                  class="text-right text-xs font-bold lg:text-base"
                  :class="
                    user.isCurrentUser
                      ? 'text-emerald-700'
                      : 'text-[#455149]'
                  "
                >
                  {{ formatXp(user.xp) }} XP
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
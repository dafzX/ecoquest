<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <main
        class="mx-auto max-w-[1400px] px-4 pb-28 pt-1 sm:px-5 md:px-8 md:pb-10 md:pt-8"
      >

        <!-- Mobile Header -->
        <MobileHeader/>

        <!-- Page Header -->
        <div class="mb-5 md:mb-7">
          <h1
            class="text-[22px] font-bold tracking-tight text-[#17211B] md:text-[28px]"
          >
            Rewards
          </h1>

          <p
            class="mt-1 text-xs leading-5 text-[#66736A] md:text-sm"
          >
            Gunakan XP-mu untuk mendapatkan reward menarik.
          </p>
        </div>

        <!-- XP Balance -->
        <section
          class="relative mb-5 overflow-hidden rounded-2xl bg-[#15803D] md:mb-8"
        >
          <div
            class="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10"
          ></div>

          <div
            class="absolute -bottom-16 right-16 h-32 w-32 rounded-full bg-white/5"
          ></div>

          <div
            class="relative flex flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-7"
          >

            <!-- XP -->
            <div class="flex items-center gap-3.5 md:gap-4">

              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 md:h-14 md:w-14 md:rounded-2xl"
              >
                <Gift
                  class="h-6 w-6 text-white md:h-7 md:w-7"
                />
              </div>

              <div>
                <p class="text-xs text-white/75 md:text-sm">
                  XP yang kamu miliki
                </p>

                <div class="mt-0.5 flex items-end gap-1.5 md:mt-1 md:gap-2">
                  <span
                    class="text-2xl font-bold text-white md:text-3xl"
                  >
                    {{ user.xp.toLocaleString() }}
                  </span>

                  <span
                    class="mb-0.5 text-xs font-medium text-white/70 md:mb-1 md:text-sm"
                  >
                    XP
                  </span>
                </div>
              </div>

            </div>

            <!-- Next Reward -->
            <div
              class="rounded-xl bg-white/10 px-4 py-3 md:px-5"
            >
              <p class="text-[10px] text-white/70 md:text-xs">
                Reward berikutnya
              </p>

              <p
                class="mt-1 text-xs font-semibold text-white md:text-sm"
              >
                {{ nextReward?.title || 'Terus kumpulkan XP' }}
              </p>

              <p
                v-if="nextReward"
                class="mt-0.5 text-[10px] text-white/70 md:text-xs"
              >
                {{ nextReward.cost.toLocaleString() }} XP lagi
              </p>
            </div>

          </div>
        </section>

        <!-- Summary -->
        <section
          class="mb-6 grid grid-cols-3 gap-2.5 md:mb-8 md:gap-5"
        >

          <!-- Available -->
          <div
            class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5 md:p-5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF8EE] md:h-10 md:w-10 md:rounded-xl"
            >
              <Gift
                class="h-4 w-4 text-[#22C55E] md:h-5 md:w-5"
              />
            </div>

            <p
              class="mt-3 text-[10px] leading-4 text-[#66736A] md:mt-4 md:text-xs"
            >
              Reward Tersedia
            </p>

            <p
              class="mt-0.5 text-base font-bold text-[#17211B] md:text-xl"
            >
              {{ availableRewards }}
            </p>
          </div>

          <!-- Redeemed -->
          <div
            class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5 md:p-5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E8FF] md:h-10 md:w-10 md:rounded-xl"
            >
              <Award
                class="h-4 w-4 text-[#9333EA] md:h-5 md:w-5"
              />
            </div>

            <p
              class="mt-3 text-[10px] leading-4 text-[#66736A] md:mt-4 md:text-xs"
            >
              Sudah Ditukar
            </p>

            <p
              class="mt-0.5 text-base font-bold text-[#17211B] md:text-xl"
            >
              {{ redeemedRewards.length }}
            </p>
          </div>

          <!-- XP Spent -->
          <div
            class="rounded-2xl border border-[#E8EDE9] bg-white p-3.5 md:p-5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF9C3] md:h-10 md:w-10 md:rounded-xl"
            >
              <Zap
                class="h-4 w-4 text-[#CA8A04] md:h-5 md:w-5"
              />
            </div>

            <p
              class="mt-3 text-[10px] leading-4 text-[#66736A] md:mt-4 md:text-xs"
            >
              XP Digunakan
            </p>

            <p
              class="mt-0.5 text-base font-bold text-[#17211B] md:text-xl"
            >
              {{ xpSpent.toLocaleString() }}
            </p>
          </div>

        </section>

        <!-- Categories -->
        <section class="mb-6 md:mb-7">
          <div
            class="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          >
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              @click="selectedCategory = category"
              class="shrink-0 rounded-full px-4 py-2 text-[10px] font-semibold transition md:text-xs"
              :class="
                selectedCategory === category
                  ? 'bg-[#15803D] text-white'
                  : 'border border-[#E8EDE9] bg-white text-[#66736A] hover:border-[#CDE8D4]'
              "
            >
              {{ category }}
            </button>
          </div>
        </section>

        <!-- Rewards Store -->
        <section>

          <div
            class="mb-4 flex items-end justify-between md:mb-5"
          >
            <div>
              <h2
                class="text-base font-bold text-[#17211B] md:text-lg"
              >
                Rewards Store
              </h2>

              <p
                class="mt-0.5 text-[10px] text-[#98A39C] md:mt-1 md:text-xs"
              >
                Tukarkan XP dengan reward pilihanmu.
              </p>
            </div>

            <span
              class="text-[10px] text-[#98A39C] md:text-xs"
            >
              {{ filteredRewards.length }} reward
            </span>
          </div>

          <!-- Reward Cards -->
          <div
            class="grid gap-3.5 sm:grid-cols-2 md:gap-5 lg:grid-cols-3"
          >
            <RewardCard
              v-for="reward in filteredRewards"
              :key="reward.id"
              :reward="reward"
            />
          </div>

          <!-- Empty State -->
          <div
            v-if="filteredRewards.length === 0"
            class="rounded-2xl border border-dashed border-[#DCE5DE] bg-white px-6 py-10 text-center md:py-12"
          >
            <Gift
              class="mx-auto h-8 w-8 text-[#98A39C]"
            />

            <p
              class="mt-3 text-sm font-semibold text-[#17211B]"
            >
              Reward tidak ditemukan
            </p>

            <p
              class="mt-1 text-xs text-[#98A39C]"
            >
              Coba pilih kategori reward lainnya.
            </p>
          </div>

        </section>

        <!-- Redeemed Rewards -->
        <section class="mt-8 md:mt-10">

          <div class="mb-4">
            <h2
              class="text-base font-bold text-[#17211B] md:text-lg"
            >
              Reward yang Ditukar
            </h2>

            <p
              class="mt-0.5 text-[10px] text-[#98A39C] md:mt-1 md:text-xs"
            >
              Reward yang sudah berhasil kamu klaim.
            </p>
          </div>

          <div class="space-y-2.5 md:space-y-3">

            <div
              v-for="reward in redeemedRewards"
              :key="reward.id"
              class="flex items-center gap-3 rounded-2xl border border-[#E8EDE9] bg-white p-3.5 md:gap-4 md:p-4"
            >

              <!-- Icon -->
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF] md:h-11 md:w-11"
              >
                <Award
                  class="h-4 w-4 text-[#9333EA] md:h-5 md:w-5"
                />
              </div>

              <!-- Info -->
              <div class="min-w-0 flex-1">
                <p
                  class="truncate text-xs font-semibold text-[#17211B] md:text-sm"
                >
                  {{ reward.title }}
                </p>

                <p
                  class="mt-0.5 text-[10px] text-[#98A39C] md:mt-1 md:text-xs"
                >
                  Ditukar pada {{ reward.date }}
                </p>
              </div>

              <!-- Cost -->
              <div class="shrink-0 text-right">
                <p
                  class="text-xs font-bold text-[#66736A] md:text-sm"
                >
                  {{ reward.cost.toLocaleString() }} XP
                </p>

                <span
                  class="text-[9px] text-[#98A39C] md:text-[10px]"
                >
                  Ditukar
                </span>
              </div>

            </div>

          </div>

        </section>

      </main>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

import {
  Award,
  Bell,
  Gift,
  Leaf,
  Zap
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import RewardCard from '@/components/cards/RewardCard.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue'

import {
  user,
  rewards,
  redeemedRewards
} from '@/data/mockData.js'

const currentUser = {
  avatar: 'DA'
}

const selectedCategory = ref('All')

const categories = [
  'All',
  'Digital',
  'Impact',
  'Merchandise'
]

const filteredRewards = computed(() => {
  if (selectedCategory.value === 'All') {
    return rewards
  }

  return rewards.filter((reward) => {
    return reward.category === selectedCategory.value
  })
})

const availableRewards = computed(() => {
  return rewards.filter((reward) => {
    return reward.available
  }).length
})

const xpSpent = computed(() => {
  return redeemedRewards.reduce((total, reward) => {
    return total + reward.cost
  }, 0)
})

const nextReward = computed(() => {
  return rewards
    .filter((reward) => {
      return reward.available && reward.cost > user.xp
    })
    .sort((a, b) => a.cost - b.cost)[0]
})
</script>
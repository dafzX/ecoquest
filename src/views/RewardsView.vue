<template>
  <AppLayout>
    <div class="mx-auto max-w-[1400px]">

      <!-- Header -->
      <div class="mb-7">
        <h1 class="text-[28px] font-bold tracking-tight text-[#17211B]">
          Rewards
        </h1>

        <p class="mt-1 text-sm text-[#66736A]">
          Spend your XP on rewards and make your progress more meaningful
        </p>
      </div>

      <!-- XP Balance -->
      <section class="mb-8 overflow-hidden rounded-2xl bg-[#15803D]">

        <div class="flex flex-col justify-between gap-6 px-6 py-6 md:flex-row md:items-center md:px-8 md:py-7">

          <div class="flex items-center gap-4">

            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Gift class="h-7 w-7 text-white" />
            </div>

            <div>
              <p class="text-sm text-white/75">
                Your XP Balance
              </p>

              <div class="mt-1 flex items-end gap-2">
                <span class="text-3xl font-bold text-white">
                  {{ user.xp.toLocaleString() }}
                </span>

                <span class="mb-1 text-sm font-medium text-white/70">
                  XP
                </span>
              </div>
            </div>

          </div>

          <div class="rounded-xl bg-white/10 px-5 py-3">
            <p class="text-xs text-white/70">
              Next reward
            </p>

            <p class="mt-1 text-sm font-semibold text-white">
              {{ nextReward?.title || 'Keep earning XP' }}
            </p>

            <p
              v-if="nextReward"
              class="mt-0.5 text-xs text-white/70"
            >
              {{ nextReward.cost.toLocaleString() }} XP needed
            </p>
          </div>

        </div>

      </section>

      <!-- Summary -->
      <section class="mb-8 grid grid-cols-3 gap-3 md:gap-5">

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF8EE]">
            <Gift class="h-5 w-5 text-[#22C55E]" />
          </div>

          <p class="mt-4 text-xs text-[#66736A]">
            Available Rewards
          </p>

          <p class="mt-1 text-xl font-bold text-[#17211B]">
            {{ availableRewards }}
          </p>
        </div>

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3E8FF]">
            <Award class="h-5 w-5 text-[#9333EA]" />
          </div>

          <p class="mt-4 text-xs text-[#66736A]">
            Rewards Redeemed
          </p>

          <p class="mt-1 text-xl font-bold text-[#17211B]">
            {{ redeemedRewards.length }}
          </p>
        </div>

        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-4 md:p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF9C3]">
            <Zap class="h-5 w-5 text-[#CA8A04]" />
          </div>

          <p class="mt-4 text-xs text-[#66736A]">
            XP Spent
          </p>

          <p class="mt-1 text-xl font-bold text-[#17211B]">
            {{ xpSpent.toLocaleString() }}
          </p>
        </div>

      </section>

      <!-- Categories -->
      <section class="mb-7">

        <div class="flex flex-wrap items-center gap-2">

          <button
            v-for="category in categories"
            :key="category"
            type="button"
            @click="selectedCategory = category"
            class="rounded-full px-4 py-2 text-xs font-semibold transition"
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

      <!-- Rewards -->
      <section>

        <div class="mb-4 flex items-end justify-between">

          <div>
            <h2 class="text-lg font-bold text-[#17211B]">
              Rewards Store
            </h2>

            <p class="mt-1 text-xs text-[#98A39C]">
              Redeem your XP for exclusive EcoQuest rewards
            </p>
          </div>

          <span class="text-xs text-[#98A39C]">
            {{ filteredRewards.length }} rewards
          </span>

        </div>

        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          <RewardCard
            v-for="reward in filteredRewards"
            :key="reward.id"
            :reward="reward"
          />

        </div>

        <div
          v-if="filteredRewards.length === 0"
          class="rounded-2xl border border-dashed border-[#DCE5DE] bg-white px-6 py-12 text-center"
        >
          <Gift class="mx-auto h-8 w-8 text-[#98A39C]" />

          <p class="mt-3 text-sm font-semibold text-[#17211B]">
            No rewards found
          </p>

          <p class="mt-1 text-xs text-[#98A39C]">
            Try another reward category.
          </p>
        </div>

      </section>

      <!-- Redeemed -->
      <section class="mt-10">

        <div class="mb-4">
          <h2 class="text-lg font-bold text-[#17211B]">
            Your Redeemed Rewards
          </h2>

          <p class="mt-1 text-xs text-[#98A39C]">
            Rewards you've already claimed
          </p>
        </div>

        <div class="space-y-3">

          <div
            v-for="reward in redeemedRewards"
            :key="reward.id"
            class="flex items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-4"
          >

            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF]">
              <Award class="h-5 w-5 text-[#9333EA]" />
            </div>

            <div class="min-w-0 flex-1">

              <p class="text-sm font-semibold text-[#17211B]">
                {{ reward.title }}
              </p>

              <p class="mt-1 text-xs text-[#98A39C]">
                Redeemed on {{ reward.date }}
              </p>

            </div>

            <div class="text-right">
              <p class="text-sm font-bold text-[#66736A]">
                {{ reward.cost.toLocaleString() }} XP
              </p>

              <span class="text-[10px] text-[#98A39C]">
                Redeemed
              </span>
            </div>

          </div>

        </div>

      </section>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

import {
  Award,
  Gift,
  Zap
} from 'lucide-vue-next'

import AppLayout from '../layouts/AppLayout.vue'
import RewardCard from '../components/cards/RewardCard.vue'

import {
  user,
  rewards,
  redeemedRewards
} from '../data/mockData.js'

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
  return rewards.filter((reward) => reward.available).length
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
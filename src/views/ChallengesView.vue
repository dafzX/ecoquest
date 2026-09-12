<template>
  <AppLayout>
    <div class="mx-auto max-w-[1400px]">

      <!-- Header -->
      <div class="mb-7">
        <h1 class="text-[28px] font-bold tracking-tight text-[#17211B]">
          Challenges
        </h1>

        <p class="mt-1 text-sm text-[#66736A]">
          Take on bigger goals and earn extra rewards
        </p>
      </div>

      <!-- Challenge Summary -->
      <section class="mb-8 grid grid-cols-3 gap-5">

        <!-- Active -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-[#66736A]">
                Active Challenges
              </p>

              <p class="mt-2 text-[28px] font-bold text-[#17211B]">
                {{ activeChallenges.length }}
              </p>
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8EE]">
              <Trophy class="h-5 w-5 text-[#22C55E]" />
            </div>
          </div>

          <p class="mt-4 text-xs text-[#98A39C]">
            Challenges currently in progress
          </p>
        </div>

        <!-- XP -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-[#66736A]">
                Potential XP
              </p>

              <p class="mt-2 text-[28px] font-bold text-[#17211B]">
                {{ potentialXp }}
              </p>
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF9C3]">
              <Zap class="h-5 w-5 text-[#CA8A04]" />
            </div>
          </div>

          <p class="mt-4 text-xs text-[#98A39C]">
            XP available from active challenges
          </p>
        </div>

        <!-- Progress -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-[#66736A]">
                Overall Progress
              </p>

              <p class="mt-2 text-[28px] font-bold text-[#17211B]">
                {{ overallProgress }}%
              </p>
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF5FF]">
              <TrendingUp class="h-5 w-5 text-[#3B82F6]" />
            </div>
          </div>

          <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-[#EAF0EB]">
            <div
              class="h-full rounded-full bg-[#22C55E]"
              :style="{ width: `${overallProgress}%` }"
            ></div>
          </div>
        </div>

      </section>

      <!-- Active Challenges -->
      <section class="mb-9">

        <div class="mb-4 flex items-end justify-between">
          <div>
            <h2 class="text-lg font-bold text-[#17211B]">
              Active Challenges
            </h2>

            <p class="mt-1 text-xs text-[#98A39C]">
              Keep going and complete your current challenges
            </p>
          </div>

          <div class="flex items-center gap-2 rounded-full bg-[#EAF8EE] px-3 py-1.5">
            <Flame class="h-3.5 w-3.5 text-[#EA580C]" />

            <span class="text-xs font-semibold text-[#15803D]">
              Keep your streak alive
            </span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-5">
          <ChallengeCard
            v-for="challenge in activeChallenges"
            :key="challenge.id"
            :challenge="challenge"
          />
        </div>

      </section>

      <!-- Recommended -->
      <section>
        <div class="mb-4">
          <h2 class="text-lg font-bold text-[#17211B]">
            More Challenges
          </h2>

          <p class="mt-1 text-xs text-[#98A39C]">
            Explore more ways to make an impact
          </p>
        </div>

        <div class="grid grid-cols-3 gap-5">
          <ChallengeCard
            v-for="challenge in otherChallenges"
            :key="challenge.id"
            :challenge="challenge"
          />
        </div>
      </section>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'

import {
  Flame,
  TrendingUp,
  Trophy,
  Zap
} from 'lucide-vue-next'

import AppLayout from '../layouts/AppLayout.vue'
import ChallengeCard from '../components/cards/ChallengeCard.vue'
import { challenges } from '../data/mockData.js'

const activeChallenges = computed(() => {
  return challenges.filter((challenge) => challenge.active)
})

const otherChallenges = computed(() => {
  return challenges.filter((challenge) => !challenge.active)
})

const potentialXp = computed(() => {
  return activeChallenges.value.reduce(
    (total, challenge) => total + challenge.xp,
    0
  )
})

const overallProgress = computed(() => {
  if (!activeChallenges.value.length) return 0

  const totalProgress = activeChallenges.value.reduce(
    (total, challenge) => {
      return total + challenge.progress
    },
    0
  )

  const totalTarget = activeChallenges.value.reduce(
    (total, challenge) => {
      return total + challenge.target
    },
    0
  )

  return Math.round(
    (totalProgress / totalTarget) * 100
  )
})
</script>
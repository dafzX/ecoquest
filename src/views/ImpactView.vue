<template>
  <AppLayout>
    <div class="mx-auto max-w-[1400px]">

      <!-- Header -->
      <div class="mb-7">
        <h1 class="text-[28px] font-bold tracking-tight text-[#17211B]">
          Your Impact
        </h1>

        <p class="mt-1 text-sm text-[#66736A]">
          See the positive impact of your everyday eco-actions
        </p>
      </div>

      <!-- Impact Summary -->
      <section class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">

        <!-- CO2 -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8EE]">
              <Wind class="h-5 w-5 text-[#22C55E]" />
            </div>

            <span class="rounded-full bg-[#EAF8EE] px-2.5 py-1 text-[11px] font-semibold text-[#15803D]">
              +12%
            </span>
          </div>

          <div class="mt-5">
            <p class="text-sm text-[#66736A]">
              CO₂ Saved
            </p>

            <div class="mt-1 flex items-end gap-1">
              <p class="text-[26px] font-bold text-[#17211B]">
                {{ impact.co2Saved }}
              </p>

              <span class="mb-1 text-sm text-[#98A39C]">
                kg
              </span>
            </div>

            <p class="mt-1 text-xs text-[#98A39C]">
              Equivalent to planting {{ impact.treesEquivalent }} trees
            </p>
          </div>
        </div>

        <!-- Waste -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8EE]">
              <Recycle class="h-5 w-5 text-[#22C55E]" />
            </div>

            <span class="rounded-full bg-[#EAF8EE] px-2.5 py-1 text-[11px] font-semibold text-[#15803D]">
              +8%
            </span>
          </div>

          <div class="mt-5">
            <p class="text-sm text-[#66736A]">
              Waste Recycled
            </p>

            <div class="mt-1 flex items-end gap-1">
              <p class="text-[26px] font-bold text-[#17211B]">
                {{ impact.wasteRecycled }}
              </p>

              <span class="mb-1 text-sm text-[#98A39C]">
                kg
              </span>
            </div>

            <p class="mt-1 text-xs text-[#98A39C]">
              Materials kept out of landfill
            </p>
          </div>
        </div>

        <!-- Water -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF5FF]">
              <Droplets class="h-5 w-5 text-[#3B82F6]" />
            </div>

            <span class="rounded-full bg-[#EEF5FF] px-2.5 py-1 text-[11px] font-semibold text-[#2563EB]">
              +15%
            </span>
          </div>

          <div class="mt-5">
            <p class="text-sm text-[#66736A]">
              Water Saved
            </p>

            <div class="mt-1 flex items-end gap-1">
              <p class="text-[26px] font-bold text-[#17211B]">
                {{ impact.waterSaved }}
              </p>

              <span class="mb-1 text-sm text-[#98A39C]">
                L
              </span>
            </div>

            <p class="mt-1 text-xs text-[#98A39C]">
              Through sustainable habits
            </p>
          </div>
        </div>

        <!-- Trees -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5">
          <div class="flex items-center justify-between">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8EE]">
              <TreePine class="h-5 w-5 text-[#15803D]" />
            </div>

            <span class="rounded-full bg-[#EAF8EE] px-2.5 py-1 text-[11px] font-semibold text-[#15803D]">
              Growing
            </span>
          </div>

          <div class="mt-5">
            <p class="text-sm text-[#66736A]">
              Tree Equivalent
            </p>

            <div class="mt-1 flex items-end gap-1">
              <p class="text-[26px] font-bold text-[#17211B]">
                {{ impact.treesEquivalent }}
              </p>

              <span class="mb-1 text-sm text-[#98A39C]">
                trees
              </span>
            </div>

            <p class="mt-1 text-xs text-[#98A39C]">
              Based on your total CO₂ savings
            </p>
          </div>
        </div>

      </section>

      <!-- Main Content -->
      <section class="grid gap-6 lg:grid-cols-[1.6fr_1fr]">

        <!-- Impact Progress -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-6">

          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-lg font-bold text-[#17211B]">
                Impact Progress
              </h2>

              <p class="mt-1 text-xs text-[#98A39C]">
                Your environmental impact over the last 6 months
              </p>
            </div>

            <button
              type="button"
              class="flex items-center gap-2 rounded-xl border border-[#E8EDE9] px-3 py-2 text-xs font-medium text-[#66736A]"
            >
              Last 6 Months
              <ChevronDown class="h-4 w-4" />
            </button>
          </div>

          <!-- Chart -->
          <div class="mt-8">

            <div class="flex h-[260px] items-end gap-4">

              <div
                v-for="item in impactHistory"
                :key="item.month"
                class="flex h-full flex-1 flex-col items-center justify-end"
              >
                <div class="flex h-[210px] w-full items-end justify-center">

                  <div
                    class="w-full max-w-[52px] rounded-t-xl bg-[#22C55E] transition hover:bg-[#16A34A]"
                    :style="{
                      height: `${(item.co2 / maxCo2) * 100}%`
                    }"
                  ></div>

                </div>

                <p class="mt-3 text-xs font-medium text-[#98A39C]">
                  {{ item.month }}
                </p>

                <p class="mt-1 text-[10px] text-[#66736A]">
                  {{ item.co2 }} kg
                </p>
              </div>

            </div>

            <div class="mt-6 flex items-center justify-center gap-6 border-t border-[#E8EDE9] pt-5">

              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-[#22C55E]"></span>
                <span class="text-xs text-[#66736A]">
                  CO₂ Saved
                </span>
              </div>

            </div>

          </div>
        </div>

        <!-- Impact Breakdown -->
        <div class="rounded-2xl border border-[#E8EDE9] bg-white p-6">

          <div>
            <h2 class="text-lg font-bold text-[#17211B]">
              Impact Breakdown
            </h2>

            <p class="mt-1 text-xs text-[#98A39C]">
              Where your impact comes from
            </p>
          </div>

          <div class="mt-7 space-y-6">

            <!-- Recycling -->
            <div>
              <div class="mb-2 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF8EE]">
                    <Recycle class="h-4 w-4 text-[#22C55E]" />
                  </div>

                  <span class="text-sm font-medium text-[#17211B]">
                    Recycling
                  </span>
                </div>

                <span class="text-sm font-semibold text-[#17211B]">
                  42%
                </span>
              </div>

              <div class="h-2 overflow-hidden rounded-full bg-[#EDF2EE]">
                <div class="h-full w-[42%] rounded-full bg-[#22C55E]"></div>
              </div>
            </div>

            <!-- Transport -->
            <div>
              <div class="mb-2 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF5FF]">
                    <Bike class="h-4 w-4 text-[#3B82F6]" />
                  </div>

                  <span class="text-sm font-medium text-[#17211B]">
                    Transport
                  </span>
                </div>

                <span class="text-sm font-semibold text-[#17211B]">
                  28%
                </span>
              </div>

              <div class="h-2 overflow-hidden rounded-full bg-[#EDF2EE]">
                <div class="h-full w-[28%] rounded-full bg-[#3B82F6]"></div>
              </div>
            </div>

            <!-- Energy -->
            <div>
              <div class="mb-2 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF9C3]">
                    <Lightbulb class="h-4 w-4 text-[#CA8A04]" />
                  </div>

                  <span class="text-sm font-medium text-[#17211B]">
                    Energy
                  </span>
                </div>

                <span class="text-sm font-semibold text-[#17211B]">
                  18%
                </span>
              </div>

              <div class="h-2 overflow-hidden rounded-full bg-[#EDF2EE]">
                <div class="h-full w-[18%] rounded-full bg-[#EAB308]"></div>
              </div>
            </div>

            <!-- Other -->
            <div>
              <div class="mb-2 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E8FF]">
                    <Leaf class="h-4 w-4 text-[#9333EA]" />
                  </div>

                  <span class="text-sm font-medium text-[#17211B]">
                    Other Actions
                  </span>
                </div>

                <span class="text-sm font-semibold text-[#17211B]">
                  12%
                </span>
              </div>

              <div class="h-2 overflow-hidden rounded-full bg-[#EDF2EE]">
                <div class="h-full w-[12%] rounded-full bg-[#9333EA]"></div>
              </div>
            </div>

          </div>

          <div class="mt-8 rounded-xl bg-[#F8FAF8] p-4">
            <div class="flex items-start gap-3">
              <Sparkles class="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]" />

              <div>
                <p class="text-sm font-semibold text-[#17211B]">
                  Keep going!
                </p>

                <p class="mt-1 text-xs leading-5 text-[#66736A]">
                  Your recycling actions are making the biggest contribution
                  to your environmental impact.
                </p>
              </div>
            </div>
          </div>

        </div>

      </section>

      <!-- Recent Actions -->
      <section class="mt-6">

        <div class="mb-4 flex items-end justify-between">
          <div>
            <h2 class="text-lg font-bold text-[#17211B]">
              Recent Eco Actions
            </h2>

            <p class="mt-1 text-xs text-[#98A39C]">
              Your latest recorded environmental actions
            </p>
          </div>

          <button
            type="button"
            class="text-xs font-semibold text-[#15803D] hover:text-[#166534]"
          >
            View All
          </button>
        </div>

        <div class="grid gap-3 md:grid-cols-2">

          <div
            v-for="action in ecoActions"
            :key="action.id"
            class="flex items-center gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-4"
          >

            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              :class="actionBackground(action.category)"
            >
              <component
                :is="actionIcon(action.category)"
                class="h-5 w-5"
                :class="actionColor(action.category)"
              />
            </div>

            <div class="min-w-0 flex-1">

              <div class="flex items-center gap-2">
                <h3 class="truncate text-sm font-semibold text-[#17211B]">
                  {{ action.title }}
                </h3>

                <span class="hidden shrink-0 rounded-full bg-[#F3F7F4] px-2 py-1 text-[10px] font-medium text-[#66736A] sm:inline-flex">
                  {{ action.category }}
                </span>
              </div>

              <p class="mt-1 text-xs text-[#66736A]">
                {{ action.value }}
              </p>

              <p class="mt-1 text-xs font-medium text-[#15803D]">
                {{ action.impact }}
              </p>
            </div>

            <span class="shrink-0 text-[10px] text-[#98A39C]">
              {{ action.date }}
            </span>

          </div>

        </div>

      </section>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'

import {
  Bike,
  ChevronDown,
  Droplets,
  Leaf,
  Lightbulb,
  Recycle,
  Sparkles,
  TreePine,
  Wind
} from 'lucide-vue-next'

import AppLayout from '../layouts/AppLayout.vue'
import {
  impact,
  impactHistory,
  ecoActions
} from '../data/mockData.js'

const maxCo2 = computed(() => {
  return Math.max(...impactHistory.map((item) => item.co2))
})

function actionIcon(category) {
  if (category === 'Transport') {
    return Bike
  }

  if (category === 'Energy') {
    return Lightbulb
  }

  if (category === 'Waste') {
    return Recycle
  }

  return Leaf
}

function actionBackground(category) {
  if (category === 'Transport') {
    return 'bg-[#EEF5FF]'
  }

  if (category === 'Energy') {
    return 'bg-[#FEF9C3]'
  }

  if (category === 'Waste') {
    return 'bg-[#EAF8EE]'
  }

  return 'bg-[#F3E8FF]'
}

function actionColor(category) {
  if (category === 'Transport') {
    return 'text-[#3B82F6]'
  }

  if (category === 'Energy') {
    return 'text-[#CA8A04]'
  }

  if (category === 'Waste') {
    return 'text-[#22C55E]'
  }

  return 'text-[#9333EA]'
}
</script>
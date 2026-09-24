<template>
  <div class="hidden md:block">
    <div class="min-h-screen bg-[#F4FBF7] px-8 py-8">
      <div class="mx-auto max-w-6xl">

        <div class="mb-8 flex items-center justify-between">

          <button
            type="button"
            @click="goBack"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm"
          >
            <ArrowLeft class="h-5 w-5" />
          </button>

          <div
            class="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"
          >
            <Zap class="h-4 w-4 text-[#F59E0B]" />

            <span class="text-sm font-semibold text-[#334155]">
              +{{ mission.xp || 50 }} XP
            </span>
          </div>

        </div>

        <div
          class="mb-8 overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white"
        >
          <div class="p-8">

            <div class="mb-5 flex items-start justify-between gap-6">

              <div class="flex items-start gap-4">

                <div
                  class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DCFCE7]"
                >
                  <component
                    :is="getCategoryIcon(mission.category)"
                    class="h-7 w-7 text-[#15803D]"
                  />
                </div>

                <div>

                  <span
                    class="mb-2 inline-flex rounded-full bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#15803D]"
                  >
                    {{ mission.category }}
                  </span>

                  <h1 class="text-2xl font-bold text-[#0F172A]">
                    {{ mission.title }}
                  </h1>

                  <p class="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                    {{ mission.description }}
                  </p>

                </div>

              </div>

              <div class="shrink-0 text-right">

                <p class="text-xs font-medium text-[#94A3B8]">
                  Kemajuan
                </p>

                <p class="mt-1 text-2xl font-bold text-[#15803D]">
                  {{ completedSteps }}/{{ totalSteps }}
                </p>

              </div>

            </div>

            <div>

              <div class="mb-2 flex items-center justify-between">

                <span class="text-xs font-medium text-[#64748B]">
                  Kemajuan Misi
                </span>

                <span class="text-xs font-semibold text-[#15803D]">
                  {{ progress }}%
                </span>

              </div>

              <div class="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
                <div
                  class="h-full rounded-full bg-[#22C55E] transition-all duration-500"
                  :style="{ width: `${progress}%` }"
                />
              </div>

            </div>

          </div>
        </div>

        <div class="rounded-3xl border border-[#E2E8F0] bg-white p-8">

          <div class="mb-6">

            <h2 class="text-lg font-bold text-[#0F172A]">
              Langkah Misi
            </h2>

            <p class="mt-1 text-sm text-[#64748B]">
              Selesaikan setiap langkah untuk menyelesaikan misi ini.
            </p>

          </div>

          <div class="space-y-4">

            <div
              v-for="(step, index) in mission.steps"
              :key="index"
              class="flex items-center gap-5 rounded-2xl border p-5 transition"
              :class="
                index < completedSteps
                  ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                  : index === completedSteps && !allStepsCompleted
                    ? 'border-[#86EFAC] bg-white shadow-sm'
                    : 'border-[#E2E8F0] bg-white'
              "
            >

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                :class="
                  index < completedSteps
                    ? 'bg-[#22C55E] text-white'
                    : index === completedSteps && !allStepsCompleted
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : 'bg-[#F1F5F9] text-[#94A3B8]'
                "
              >

                <Check
                  v-if="index < completedSteps"
                  class="h-5 w-5"
                />

                <span v-else>
                  {{ index + 1 }}
                </span>

              </div>

              <div class="min-w-0 flex-1">

                <div class="flex items-center gap-2">

                  <h3
                    class="text-sm font-semibold"
                    :class="
                      index < completedSteps
                        ? 'text-[#15803D]'
                        : 'text-[#0F172A]'
                    "
                  >
                    {{ step.title || step.name || step }}
                  </h3>

                  <span
                    v-if="index < completedSteps"
                    class="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-semibold text-[#15803D]"
                  >
                    Selesai
                  </span>

                </div>

                <p
                  v-if="step.description"
                  class="mt-1 text-xs leading-5 text-[#64748B]"
                >
                  {{ step.description }}
                </p>

              </div>

              <div class="shrink-0">

                <RouterLink
                  v-if="index === completedSteps && !allStepsCompleted"
                  :to="{
                    name: 'MissionAction',
                    params: {
                      id: mission.id,
                      step: index + 1
                    }
                  }"
                  class="flex items-center gap-2 rounded-xl bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#166534]"
                >
                  Lakukan
                  <ArrowRight class="h-4 w-4" />
                </RouterLink>

                <div
                  v-else-if="index < completedSteps"
                  class="flex items-center gap-1.5 text-xs font-medium text-[#16A34A]"
                >
                  <Check class="h-4 w-4" />
                  Selesai
                </div>

                <span
                  v-else
                  class="text-xs font-medium text-[#94A3B8]"
                >
                  Belum tersedia
                </span>

              </div>

            </div>

          </div>

          <div
            v-if="allStepsCompleted"
            class="mt-8 flex items-center justify-between rounded-2xl bg-[#F0FDF4] p-5"
          >

            <div class="flex items-center gap-3">

              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCFCE7]"
              >
                <Trophy class="h-5 w-5 text-[#15803D]" />
              </div>

              <div>

                <p class="text-sm font-semibold text-[#166534]">
                  Misi Selesai!
                </p>

                <p class="mt-0.5 text-xs text-[#65A30D]">
                  Semua langkah misi telah selesai.
                </p>

              </div>

            </div>

            <div class="flex items-center gap-2 font-bold text-[#15803D]">

              <Zap class="h-4 w-4" />

              +{{ mission.xp || 50 }} XP

            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getCurrentUser } from '@/services/auth'

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Trophy,
  Zap
} from 'lucide-vue-next'

const props = defineProps({
  mission: {
    type: Object,
    required: true
  },

  getCategoryIcon: {
    type: Function,
    required: true
  },

  goBack: {
    type: Function,
    required: true
  }
})

const progressKey = computed(() => {
  const userId = getCurrentUser()?.id || 'guest'

  return `ecoquest_mission_progress_${userId}_${props.mission.id}`
})

const savedProgress = computed(() => {
  const saved = localStorage.getItem(progressKey.value)

  if (!saved) {
    return null
  }

  try {
    return JSON.parse(saved)
  } catch {
    return null
  }
})

const completedSteps = computed(() => {
  if (savedProgress.value) {
    return Number(
      savedProgress.value.completedSteps || 0
    )
  }

  return 0
})

const totalSteps = computed(() => {
  return props.mission.steps?.length || 0
})

const progress = computed(() => {
  if (!totalSteps.value) {
    return 0
  }

  return Math.min(
    100,
    Math.round(
      (completedSteps.value / totalSteps.value) * 100
    )
  )
})

const allStepsCompleted = computed(() => {
  return (
    totalSteps.value > 0 &&
    completedSteps.value >= totalSteps.value
  )
})
</script>

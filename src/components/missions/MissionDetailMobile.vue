<template>
  <div class="md:hidden">
    <div class="min-h-screen bg-[#F4FBF7] px-4 pb-28">

      <!-- Header -->
      <header class="relative flex items-center justify-between py-4">

        <button
          type="button"
          @click="goBack"
          class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#475569] shadow-sm"
        >
          <ArrowLeft class="h-5 w-5" />
        </button>

        <div
          class="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm"
        >
          <Zap class="h-3.5 w-3.5 text-[#F59E0B]" />

          <span class="text-xs font-bold text-[#334155]">
            +{{ mission.xp }} XP
          </span>
        </div>

      </header>

      <!-- Mission -->
      <section class="mt-3">

        <div
          class="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
        >

          <div class="flex items-start gap-3">

            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7]"
            >
              <component
                :is="getCategoryIcon(mission.category)"
                class="h-5 w-5 text-[#15803D]"
              />
            </div>

            <div class="min-w-0">

              <span
                class="inline-flex rounded-full bg-[#F0FDF4] px-2.5 py-1 text-[10px] font-semibold text-[#15803D]"
              >
                {{ mission.category }}
              </span>

              <h1 class="mt-2 text-lg font-bold leading-6 text-[#0F172A]">
                {{ mission.title }}
              </h1>

              <p class="mt-2 text-xs leading-5 text-[#64748B]">
                {{ mission.description }}
              </p>

            </div>

          </div>

          <!-- Progress -->
          <div class="mt-5">

            <div class="mb-2 flex items-center justify-between">

              <span class="text-[11px] font-medium text-[#64748B]">
                Kemajuan
              </span>

              <span class="text-[11px] font-bold text-[#15803D]">
                {{ completedSteps }}/{{ totalSteps }}
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

      </section>

      <!-- Steps -->
      <section class="mt-5">

        <div class="mb-4">

          <h2 class="text-base font-bold text-[#0F172A]">
            Langkah Misi
          </h2>

          <p class="mt-1 text-xs text-[#64748B]">
            Selesaikan setiap langkah untuk menyelesaikan misi ini.
          </p>

        </div>

        <div class="space-y-3">

          <div
            v-for="(step, index) in mission.steps"
            :key="index"
            class="rounded-2xl border p-4 transition"
            :class="
              index < completedSteps
                ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                : index === completedSteps && !mission.completed
                  ? 'border-[#86EFAC] bg-white shadow-sm'
                  : 'border-[#E2E8F0] bg-white'
            "
          >

            <div class="flex items-center gap-3">

              <!-- Number -->
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                :class="
                  index < completedSteps
                    ? 'bg-[#22C55E] text-white'
                    : index === completedSteps && !mission.completed
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : 'bg-[#F1F5F9] text-[#94A3B8]'
                "
              >

                <Check
                  v-if="index < completedSteps"
                  class="h-4 w-4"
                />

                <span v-else>
                  {{ index + 1 }}
                </span>

              </div>

              <!-- Content -->
              <div class="min-w-0 flex-1">

                <h3
                  class="text-sm font-semibold leading-5"
                  :class="
                    index < completedSteps
                      ? 'text-[#15803D]'
                      : 'text-[#0F172A]'
                  "
                >
                  {{ step.title || step.name || step }}
                </h3>

                <p
                  v-if="step.description"
                  class="mt-1 text-[11px] leading-4 text-[#64748B]"
                >
                  {{ step.description }}
                </p>

              </div>

            </div>

            <!-- Action -->
            <div
              v-if="index === completedSteps && !mission.completed"
              class="mt-3 border-t border-[#E2E8F0] pt-3"
            >

              <RouterLink
                :to="{
                  name: 'MissionAction',
                  params: {
                    id: mission.id,
                    step: index + 1
                  }
                }"
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803D] py-2.5 text-xs font-semibold text-white transition active:scale-[0.98]"
              >
                Lakukan Langkah {{ index + 1 }}
                <ArrowRight class="h-4 w-4" />
              </RouterLink>

            </div>

            <div
              v-else-if="index < completedSteps"
              class="mt-3 flex items-center gap-1.5 border-t border-[#DCFCE7] pt-3 text-[11px] font-semibold text-[#16A34A]"
            >
              <Check class="h-3.5 w-3.5" />
              Langkah selesai
            </div>

            <div
              v-else
              class="mt-3 border-t border-[#E2E8F0] pt-3 text-[11px] font-medium text-[#94A3B8]"
            >
              Selesaikan langkah sebelumnya terlebih dahulu
            </div>

          </div>

        </div>

      </section>

      <!-- Completed -->
      <section
        v-if="allStepsCompleted"
        class="mt-5 rounded-2xl bg-[#F0FDF4] p-4"
      >

        <div class="flex items-center gap-3">

          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7]"
          >
            <Trophy class="h-5 w-5 text-[#15803D]" />
          </div>

          <div class="min-w-0 flex-1">

            <p class="text-sm font-bold text-[#166534]">
              Misi Selesai!
            </p>

            <p class="mt-1 text-[11px] text-[#65A30D]">
              Semua langkah misi telah selesai.
            </p>

          </div>

          <div class="flex items-center gap-1 text-xs font-bold text-[#15803D]">

            <Zap class="h-3.5 w-3.5" />

            +{{ mission.xp }} XP

          </div>

        </div>

      </section>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
  return `mission_progress_${props.mission.id}`
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

  return Number(
    props.mission.completedSteps || 0
  )
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